import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Question, Answer, UserInfo } from "@/lib/types";
import { questions } from "@/data/questions";
import { calculateSurveyResults } from "@/lib/calculations";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import SurveyQuestion from "@/components/SurveyQuestion";
import UserInfoForm from "@/components/UserInfoForm";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const Survey = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [questionsPerPage] = useState(isMobile ? 3 : 5);
  
  // מספר קבוצות השאלות
  const totalSteps = Math.ceil(questions.length / questionsPerPage);
  
  // חישוב ההתקדמות
  const progress = userInfo ? ((currentStep) / totalSteps) * 100 : 0;
  
  // השאלות הנוכחיות להצגה
  const currentQuestions = userInfo 
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
  const handleNext = () => {
    const nextStep = currentStep + 1;
    if (nextStep < totalSteps) {
      setCurrentStep(nextStep);
      window.scrollTo(0, 0);
    } else {
      // סיום השאלון וחישוב התוצאות
      if (userInfo) {
        const results = calculateSurveyResults(answers, userInfo);
        
        // שמירת התוצאות ב־localStorage
        localStorage.setItem('salimaResults', JSON.stringify(results));
        
        toast({
          title: "השאלון הושלם בהצלחה!",
          description: "מעבר לדף התוצאות...",
        });
        
        // מעבר לדף התוצאות
        navigate('/results');
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
    if (!userInfo) return false;
    
    return currentQuestions.every(q => getAnswerValue(q.id) !== null);
  };
  
  // התחלת השאלון אחרי הזנת פרטי המשתמש
  const handleUserInfoSubmit = (info: UserInfo) => {
    setUserInfo(info);
    toast({
      title: "ברוך הבא לשאלון המנהיגות",
      description: "אנא השב/י על כל השאלות בכנות מרבית",
    });
  };

  return (
    <div className="container py-4 max-w-3xl mx-auto px-4">
      {!userInfo ? (
        <UserInfoForm onSubmit={handleUserInfoSubmit} />
      ) : (
        <>
          <div className="mb-4 space-y-3">
            <h1 className="text-xl sm:text-2xl font-bold text-center">שאלון מנהיגות</h1>
            <Progress value={progress} className="h-2 sm:h-3" />
            <div className="text-center text-sm text-gray-500">
              שלב {currentStep + 1} מתוך {totalSteps}
            </div>
          </div>
          
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl leading-tight">
                {currentStep === 0 
                  ? "דרג/י עד כמה את/ה מסכים/ה עם ההיגדים הבאים:" 
                  : `המשך/י לדרג את ההיגדים (${currentStep + 1}/${totalSteps}):`}
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
                disabled={!canProceed()}
                className={`bg-salima-600 hover:bg-salima-700 ${isMobile ? 'w-full order-1' : 'w-auto'}`}
              >
                {currentStep === totalSteps - 1 ? "סיים ושלח" : "הבא"}
              </Button>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
};

export default Survey;
