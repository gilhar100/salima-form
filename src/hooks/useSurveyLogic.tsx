import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Answer, UserInfo, ColleagueEvaluatorInfo, SurveyType } from "@/lib/types";
import { questions } from "@/data/questions";
import { calculateSurveyResults } from "@/lib/calculations";
import { saveSurveyToDatabase, saveColleagueSurveyToDatabase, saveArchetypeAnswersToDatabase } from "@/lib/survey-service";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

export const useSurveyLogic = (surveyType: SurveyType) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const [aboutViewed, setAboutViewed] = useState(false);
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
  
  // מספר קבוצות השאלות (now includes archetype questions)
  const totalSteps = Math.ceil(questions.length / questionsPerPage);
  
  // חישוב ההתקדמות
  const hasInfo = surveyType === 'manager' ? userInfo : colleagueInfo;
  const progress = (hasInfo && aboutViewed) ? ((currentStep) / totalSteps) * 100 : 0;
  
  // השאלות הנוכחיות להצגה
  const currentQuestions = (hasInfo && aboutViewed) 
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
      
      // Split answers into core (1-90) and archetype (91-105) questions
      const coreAnswers = answers.filter(a => a.questionId <= 90);
      const archetypeAnswers = answers.filter(a => a.questionId >= 91 && a.questionId <= 105);
      
      if (surveyType === 'manager' && userInfo) {
        try {
          console.log('Processing manager survey...');
          // Calculate results only from core questions (1-90)
          const results = calculateSurveyResults(coreAnswers, userInfo);
          
          // Attach group_number as int if exists
          results.group_number = userInfo.groupNumber ? parseInt(userInfo.groupNumber) : undefined;
          
          console.log('תוצאות מחושבות למנהל:', results);
          console.log('Archetype answers:', archetypeAnswers);
          
          // שמירת התוצאות והתשובות ב־localStorage תחילה
          console.log('Saving to localStorage...');
          localStorage.setItem('salimaResults', JSON.stringify(results));
          localStorage.setItem('salimaAnswers', JSON.stringify(coreAnswers));
          localStorage.setItem('archetypeAnswers', JSON.stringify(archetypeAnswers));
          console.log('localStorage data saved successfully');
          
          // Save core survey results to survey_responses table
          console.log('Saving core survey to database...');
          const savedRecord = await saveSurveyToDatabase(results, coreAnswers, true, false);
          console.log('Core survey save completed:', savedRecord);
          
          // Save archetype answers to archetype_logic table (if any)
          if (archetypeAnswers.length > 0) {
            console.log('Saving archetype answers to database...');
            await saveArchetypeAnswersToDatabase(archetypeAnswers, userInfo);
            console.log('Archetype answers saved successfully');
          }
          
          // Save the survey ID for later retrieval of insights
          if (savedRecord && savedRecord.id) {
            localStorage.setItem('salimaSurveyId', savedRecord.id);
            console.log('Survey ID saved to localStorage:', savedRecord.id);
          }
          
          // Generate SALIMA insights
          if (savedRecord && savedRecord.id) {
            try {
              console.log('Generating SALIMA insights...');
              const insightsResponse = await fetch('https://salima-managers.functions.supabase.co/generate_salima_insights', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  record: savedRecord
                })
              });
              
              if (insightsResponse.ok) {
                const gptResults = await insightsResponse.json();
                console.log('GPT insights generated:', gptResults);
                localStorage.setItem('gptResults', JSON.stringify(gptResults));
              } else {
                console.error('Failed to generate insights:', insightsResponse.status);
              }
            } catch (insightsError) {
              console.error('Error generating insights:', insightsError);
            }
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
        console.log('Processing colleague survey...');
        const fakeUserInfo: UserInfo = {
          name: colleagueInfo.evaluatorName,
          email: colleagueInfo.evaluatorEmail
        };
        // Calculate results only from core questions (1-90)
        const results = calculateSurveyResults(coreAnswers, fakeUserInfo);
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
        
        await saveColleagueSurveyToDatabase(colleagueSubmission, coreAnswers, true, false);
        
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
    if (!hasInfo || !aboutViewed) return false;
    
    const allAnswered = currentQuestions.every(q => getAnswerValue(q.id) !== null);
    console.log(`Can proceed: ${allAnswered}, Current questions: ${currentQuestions.length}, Answered: ${currentQuestions.filter(q => getAnswerValue(q.id) !== null).length}`);
    return allAnswered;
  };
  
  // צפייה בעמוד האודות
  const handleAboutViewed = () => {
    console.log('About page viewed');
    setAboutViewed(true);
    toast({
      title: "תודה על הקריאה",
      description: "כעת תוכל להמשיך למילוי השאלון",
    });
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
    aboutViewed,
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
    handleAboutViewed,
    handleUserInfoSubmit,
    handleColleagueInfoSubmit
  };
};
