import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Answer, UserInfo, ColleagueEvaluatorInfo, SurveyType } from "@/lib/types";
import { questions } from "@/data/questions";
import { calculateSurveyResults } from "@/lib/calculations";
import { saveSurveyToDatabase, saveColleagueSurveyToDatabase } from "@/lib/survey-service";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

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
    console.log(`Answer changed: Question ${questionId} = ${value}`);
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
  
  // מעבר לשלב הבא
  const handleNext = async () => {
    const nextStep = currentStep + 1;
    console.log(`Moving to next step: ${nextStep}/${totalSteps}`);
    
    if (nextStep < totalSteps) {
      setCurrentStep(nextStep);
      window.scrollTo(0, 0);
    } else {
      // סיום השאלון וחישוב התוצאות
      if (isSubmitting) {
        console.log('Already submitting, ignoring duplicate submission');
        return;
      }
      
      console.log('Starting survey submission...');
      setIsSubmitting(true);
      console.log('סיום השאלון, סוג:', surveyType);
      console.log('תשובות גולמיות:', answers);
      console.log(`Total answers: ${answers.length}`);
      
      if (surveyType === 'manager' && userInfo) {
        try {
          console.log('Processing manager survey...');
          const results = calculateSurveyResults(answers, userInfo);
          
          // Attach group_number as int if exists
          results.group_number = userInfo.groupNumber ? parseInt(userInfo.groupNumber) : undefined;
          
          console.log('תוצאות מחושבות למנהל:', results);
          
          // שמירת התוצאות והתשובות ב־localStorage תחילה
          console.log('Saving to localStorage...');
          localStorage.setItem('salimaResults', JSON.stringify(results));
          localStorage.setItem('salimaAnswers', JSON.stringify(answers));
          console.log('localStorage data saved successfully');
          
          // שמירה במסד הנתונים עם התשובות הגולמיות
          console.log('Saving to database...');
          const savedRecord = await saveSurveyToDatabase(results, answers, true, false);
          console.log('Database save completed:', savedRecord);
          
          // Save the survey ID for later retrieval of insights
          if (savedRecord && savedRecord.id) {
            localStorage.setItem('salimaSurveyId', savedRecord.id);
            console.log('Survey ID saved to localStorage:', savedRecord.id);
          }
          
          toast({
            title: "השאלון הושלם בהצלחה!",
            description: "הנתונים נשמרו במסד הנתונים. מעבר לדף התוצאות...",
          });
          
          console.log('Navigating to results page...');
          // Small delay to ensure everything is saved
          setTimeout(() => {
            navigate('/results');
          }, 1000);
          
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
        // ... keep existing code (colleague survey handling)
        console.log('Processing colleague survey...');
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
      } else {
        console.error('Missing required data for submission:', { surveyType, userInfo, colleagueInfo });
        toast({
          title: "שגיאה",
          description: "חסרים נתונים נדרשים להשלמת השאלון.",
          variant: "destructive"
        });
        setIsSubmitting(false);
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
    
    const allAnswered = currentQuestions.every(q => getAnswerValue(q.id) !== null);
    console.log(`Can proceed: ${allAnswered}, Current questions: ${currentQuestions.length}, Answered: ${currentQuestions.filter(q => getAnswerValue(q.id) !== null).length}`);
    return allAnswered;
  };
  
  // הסכמה למחקר
  const handleConsentResponse = (consented: boolean) => {
    console.log('Consent response:', consented);
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
    console.log('Manager info submitted:', info);
    setUserInfo(info);
    toast({
      title: "פרטים נרשמו בהצלחה",
      description: "כעת תוכל להתחיל במילוי השאלון",
    });
  };

  // התחלת השאלון אחרי הזנת פרטי העמית
  const handleColleagueInfoSubmit = (info: ColleagueEvaluatorInfo) => {
    console.log('Colleague info submitted:', info);
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
