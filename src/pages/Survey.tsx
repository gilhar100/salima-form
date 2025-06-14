import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Question, Answer, UserInfo, ColleagueEvaluatorInfo, SurveyType } from "@/lib/types";
import { questions } from "@/data/questions";
import { calculateSurveyResults } from "@/lib/calculations";
import { saveSurveyToDatabase, saveColleagueSurveyToDatabase } from "@/lib/survey-service";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import SurveyQuestion from "@/components/SurveyQuestion";
import UserInfoForm from "@/components/UserInfoForm";
import ColleagueInfoForm from "@/components/ColleagueInfoForm";
import ResearchConsentForm from "@/components/ResearchConsentForm";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Loader2 } from "lucide-react";

const Survey = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [searchParams] = useSearchParams();
  const surveyType: SurveyType = (searchParams.get('type') as SurveyType) || 'manager';
  
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
          await saveSurveyToDatabase(results, answers, true, false);
          
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
        try {
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
        } catch (error) {
          console.error('שגיאה בעיבוד תוצאות העמית:', error);
          toast({
            title: "שגיאה",
            description: "אירעה שגיאה בשמירת הנתונים. אנא נסה שוב.",
            variant: "destructive"
          });
          setIsSubmitting(false);
        }
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

  // אם לא ניתנה הסכמה למחקר
  if (!consentGiven) {
    return <ResearchConsentForm onConsent={handleConsentResponse} />;
  }

  // אם לא הוזנו פרטי המשתמש/עמית
  if (!hasInfo) {
    return surveyType === 'manager' ? (
      <UserInfoForm onSubmit={handleUserInfoSubmit} />
    ) : (
      <ColleagueInfoForm onSubmit={handleColleagueInfoSubmit} />
    );
  }

  const surveyTitle = surveyType === 'manager' ? 'שאלון מנהיגות' : 'הערכת מנהל';
  const instructionText = surveyType === 'manager' 
    ? "דרג/י עד כמה את/ה מסכים/ה עם ההיגדים הבאים:"
    : "דרג/י עד כמה ההיגדים הבאים נכונים לגבי המנהל שאתה מעריך:";

  return (
    <div className="container py-4 max-w-3xl mx-auto px-4">
      <div className="mb-4 space-y-3">
        <h1 className="text-xl sm:text-2xl font-bold text-center">{surveyTitle}</h1>
        {surveyType === 'colleague' && colleagueInfo && (
          <p className="text-center text-gray-600">מעריך את: {colleagueInfo.managerName}</p>
        )}
        <Progress value={progress} className="h-2 sm:h-3" />
        <div className="text-center text-sm text-gray-500">
          שלב {currentStep + 1} מתוך {totalSteps}
        </div>
      </div>
      
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg sm:text-xl leading-tight">
            {currentStep === 0 ? instructionText : `המשך/י לדרג את ההיגדים (${currentStep + 1}/${totalSteps}):`}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="px-3 sm:px-6">
          <div className="space-y-4">
            {currentQuestions.map((question) => (
              <SurveyQuestion
                key={question.id}
                question={question}
                selectedValue={getAnswerValue(question.id)}
                onChange={(value) => handleAnswerChange(question.id, value)}
                surveyType={surveyType}
              />
            ))}
          </div>
        </CardContent>
        
        <CardFooter className={`flex justify-between px-3 sm:px-6 ${isMobile ? 'flex-col gap-3' : 'flex-row'}`}>
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={isMobile ? 'w-full order-2' : 'w-auto'}
          >
            הקודם
          </Button>
          
          <Button
            type="button"
            onClick={handleNext}
            disabled={!canProceed() || isSubmitting}
            className={`${surveyType === 'manager' ? 'bg-salima-600 hover:bg-salima-700' : 'bg-blue-600 hover:bg-blue-700'} ${isMobile ? 'w-full order-1' : 'w-auto'}`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                שומר...
              </>
            ) : (
              currentStep === totalSteps - 1 ? "סיים ושלח" : "הבא"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Survey;
