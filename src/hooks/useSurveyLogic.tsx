import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Answer, UserInfo, ColleagueEvaluatorInfo, SurveyType } from "@/lib/types";
import { questions } from "@/data/questions";
import { calculateSurveyResults } from "@/lib/calculations";
import { saveSurveyToDatabase, saveColleagueSurveyToDatabase } from "@/lib/survey-service";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";

export const useSurveyLogic = (surveyType: SurveyType) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const [consentGiven, setConsentGiven] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [colleagueInfo, setColleagueInfo] = useState<ColleagueEvaluatorInfo | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [questionsPerPage] = useState(isMobile ? 3 : 5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // בדיקה אם סוג השאלון תקין
  useEffect(() => {
    if (!['manager', 'colleague'].includes(surveyType)) {
      navigate('/');
    }
  }, [surveyType, navigate]);
  
  // מספר קבוצות השאלות
  const totalSteps = Math.ceil(questions.length / questionsPerPage);
  
  // חישוב ההתקדמות
  const hasInfo = surveyType === 'manager' ? userInfo : colleagueInfo;
  const progress = (hasInfo && consentGiven) ? ((currentStep) / totalSteps) * 100 : 0;
  
  // השאלות הנוכחיות להצגה
  const currentQuestions = (hasInfo && consentGiven) 
    ? questions.slice(currentStep * questionsPerPage, (currentStep + 1) * questionsPerPage)
    : [];
  
  // קבלת הערך הנוכחי של תשובה לשאלה
  const getAnswerValue = (questionId: number): number | null => {
    const answer = answers.find(a => a.questionId === questionId);
    return answer ? answer.value : null;
  };
  
  // עדכון תשובה
  const handleAnswerChange = (questionId: number, value: number) => {
    setAnswers(prev => {
      const existingIndex = prev.findIndex(a => a.questionId === questionId);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = { questionId, value };
        return updated;
      }
      return [...prev, { questionId, value }];
    });
  };
  
  // Function to call the SALIMA insights Edge Function
  const generateSalimaInsights = async (recordId: string, answers: Answer[]) => {
    try {
      console.log('Calling SALIMA insights Edge Function for record:', recordId);
      
      // Build the record object with all questions
      const record: any = { id: recordId };
      
      // Add all questions q1-q90 to the record
      for (let i = 1; i <= 90; i++) {
        const answer = answers.find(a => a.questionId === i);
        record[`q${i}`] = answer ? answer.value : null;
      }
      
      const { data, error } = await supabase.functions.invoke('generate_salima_insights', {
        body: { record }
      });
      
      if (error) {
        console.error('Error calling SALIMA insights function:', error);
      } else {
        console.log('SALIMA insights generated successfully:', data);
      }
    } catch (error) {
      console.error('Failed to generate SALIMA insights:', error);
    }
  };
  
  // מעבר לשלב הבא
  const handleNext = async () => {
    const nextStep = currentStep + 1;
    if (nextStep < totalSteps) {
      setCurrentStep(nextStep);
      window.scrollTo(0, 0);
    } else {
      // סיום השאלון וחישוב התוצאות
      if (isSubmitting) return; // מניעת שליחה כפולה
      
      setIsSubmitting(true);
      console.log('סיום השאלון, סוג:', surveyType);
      console.log('תשובות גולמיות:', answers);
      
      if (surveyType === 'manager' && userInfo) {
        // Calculate results and attach group_number
        try {
          const results = calculateSurveyResults(answers, userInfo);
          // Attach group_number as int if exists
          results.group_number = userInfo.groupNumber ? parseInt(userInfo.groupNumber) : undefined;
          
          console.log('תוצאות מחושבות למנהל:', results);
          
          // שמירת התוצאות והתשובות ב־localStorage
          localStorage.setItem('salimaResults', JSON.stringify(results));
          localStorage.setItem('salimaAnswers', JSON.stringify(answers));
          
          // שמירה במסד הנתונים עם התשובות הגולמיות
          const savedRecord = await saveSurveyToDatabase(results, answers, true, false);
          
          // Generate SALIMA insights after successful save
          if (savedRecord && savedRecord.id) {
            await generateSalimaInsights(savedRecord.id, answers);
          }
          
          toast({
            title: "השאלון הושלם בהצלחה!",
            description: "הנתונים נשמרו במסד הנתונים. מעבר לדף התוצאות...",
          });
          
          navigate('/results');
        } catch (error) {
          console.error('שגיאה בעיבוד תוצאות המנהל:', error);
          toast({
            title: "שגיאה",
            description: "אירעה שגיאה בשמירת הנתונים. אנא נסה שוב.",
            variant: "destructive"
          });
          setIsSubmitting(false);
        }
      } else if (surveyType === 'colleague' && colleagueInfo) {
        // חישוב תוצאות לשאלון עמיתים
        const fakeUserInfo: UserInfo = {
          name: colleagueInfo.evaluatorName,
          email: colleagueInfo.evaluatorEmail
        };
        const results = calculateSurveyResults(answers, fakeUserInfo);
        console.log('תוצאות מחושבות לעמית:', results);
        
        const colleagueSubmission = {
          slq: results.slq,
          dimensions: {
            S: results.dimensions.S.score,
            L: results.dimensions.L.score,
            I: results.dimensions.I.score,
            M: results.dimensions.M.score,
            A: results.dimensions.A.score,
            A2: results.dimensions.A2.score,
          },
          evaluatorInfo: colleagueInfo,
          date: new Date().toLocaleDateString('he-IL'),
        };
        
        console.log('נתוני עמית לשמירה:', colleagueSubmission);
        
        // שמירה ב-localStorage ובמסד הנתונים עם התשובות הגולמיות
        localStorage.setItem('colleagueSubmission', JSON.stringify(colleagueSubmission));
        
        await saveColleagueSurveyToDatabase(colleagueSubmission, answers, true, false);
        
        toast({
          title: "השאלון הושלם בהצלחה!",
          description: "הנתונים נשמרו במסד הנתונים. תודה על ההערכה!",
        });
        
        navigate('/colleague-completion');
      }
    }
  };
  
  // מעבר לשלב הקודם
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  // בדיקה אם אפשר להמשיך לשלב הבא
  const canProceed = () => {
    if (!hasInfo || !consentGiven) return false;
    
    return currentQuestions.every(q => getAnswerValue(q.id) !== null);
  };
  
  // הסכמה למחקר
  const handleConsentResponse = (consented: boolean) => {
    if (consented) {
      setConsentGiven(true);
      toast({
        title: "תודה על ההסכמה",
        description: "כעת תוכל להמשיך למילוי השאלון",
      });
    } else {
      toast({
        title: "נדרשת הסכמה",
        description: "לא ניתן להמשיך ללא הסכמה לשימוש בנתונים למחקר",
        variant: "destructive"
      });
    }
  };
  
  // התחלת השאלון אחרי הזנת פרטי המשתמש
  const handleUserInfoSubmit = (info: UserInfo) => {
    setUserInfo(info);
    toast({
      title: "פרטים נרשמו בהצלחה",
      description: "כעת תוכל להתחיל במילוי השאלון",
    });
  };

  // התחלת השאלון אחרי הזנת פרטי העמית
  const handleColleagueInfoSubmit = (info: ColleagueEvaluatorInfo) => {
    setColleagueInfo(info);
    toast({
      title: "פרטים נרשמו בהצלחה",
      description: "כעת תוכל להתחיל בהערכת המנהל",
    });
  };

  return {
    consentGiven,
    userInfo,
    colleagueInfo,
    currentStep,
    answers,
    isSubmitting,
    totalSteps,
    hasInfo,
    progress,
    currentQuestions,
    getAnswerValue,
    handleAnswerChange,
    handleNext,
    handlePrevious,
    canProceed,
    handleConsentResponse,
    handleUserInfoSubmit,
    handleColleagueInfoSubmit
  };
};
