
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Question, SurveyType } from "@/lib/types";
import SurveyQuestion from "@/components/SurveyQuestion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Loader2 } from "lucide-react";

interface SurveyCardProps {
  currentQuestions: Question[];
  currentStep: number;
  totalSteps: number;
  surveyType: SurveyType;
  getAnswerValue: (questionId: number) => number | null;
  handleAnswerChange: (questionId: number, value: number) => void;
  handlePrevious: () => void;
  handleNext: () => void;
  canProceed: () => boolean;
  isSubmitting: boolean;
}

const SurveyCard: React.FC<SurveyCardProps> = ({
  currentQuestions,
  currentStep,
  totalSteps,
  surveyType,
  getAnswerValue,
  handleAnswerChange,
  handlePrevious,
  handleNext,
  canProceed,
  isSubmitting
}) => {
  const isMobile = useIsMobile();

  // Check if we're showing archetype questions (questions 91-105)
  const isArchetypeSection = currentQuestions.some(q => q.id >= 91 && q.id <= 105);
  
  const getInstructionText = () => {
    if (currentStep === 0) {
      // First page - show disclaimer
      return (
        <div className="space-y-2">
          <div>ההיגדים מנוסחים בלשון זכר אך מיועדים לכלל המגדרים</div>
          <div>
            {isArchetypeSection 
              ? (surveyType === 'manager' 
                  ? "השאלות הבאות עוסקות בארכיטיפים של מנהיגות. דרג עד כמה אתה מסכים עם ההיגדים הבאים:"
                  : "השאלות הבאות עוסקות בארכיטיפים של מנהיגות. דרג עד כמה ההיגדים הבאים נכונים לגבי המנהל שאתה מעריך:")
              : (surveyType === 'manager' 
                  ? "דרג עד כמה אתה מסכים עם ההיגדים הבאים:"
                  : "דרג עד כמה ההיגדים הבאים נכונים לגבי המנהל שאתה מעריך:")
          }
          </div>
        </div>
      );
    }
    
    if (isArchetypeSection) {
      return surveyType === 'manager' 
        ? "השאלות הבאות עוסקות בארכיטיפים של מנהיגות. דרג עד כמה אתה מסכים עם ההיגדים הבאים:"
        : "השאלות הבאות עוסקות בארכיטיפים של מנהיגות. דרג עד כמה ההיגדים הבאים נכונים לגבי המנהל שאתה מעריך:";
    }
    
    return surveyType === 'manager' 
      ? `המשך לדרג את ההיגדים (${currentStep + 1}/${totalSteps}):`
      : `המשך לדרג את ההיגדים (${currentStep + 1}/${totalSteps}):`;
  };

  // Calculate the starting display number for this step
  const questionsPerStep = currentQuestions.length;
  const startingDisplayNumber = (currentStep * questionsPerStep) + 1;

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="leading-tight text-black" style={{ fontSize: '18px' }}>
          {getInstructionText()}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="px-3 sm:px-6">
        <div className="space-y-4">
          {currentQuestions.map((question, index) => (
            <SurveyQuestion
              key={question.id}
              question={question}
              selectedValue={getAnswerValue(question.id)}
              onChange={(value) => handleAnswerChange(question.id, value)}
              surveyType={surveyType}
              displayNumber={startingDisplayNumber + index}
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
          style={{ fontSize: '16px' }}
        >
          הקודם
        </Button>
        
        <Button
          type="button"
          onClick={handleNext}
          disabled={!canProceed() || isSubmitting}
          className={`${surveyType === 'manager' ? 'bg-salima-600 hover:bg-salima-700' : 'bg-blue-600 hover:bg-blue-700'} ${isMobile ? 'w-full order-1' : 'w-auto'}`}
          style={{ fontSize: '16px' }}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2" style={{ width: '20px', height: '20px' }} />
              שומר...
            </>
          ) : (
            currentStep === totalSteps - 1 ? "סיים ושלח" : "הבא"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SurveyCard;
