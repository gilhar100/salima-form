
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

  const getInstructionText = () => {
    return surveyType === 'manager' 
      ? "דרג/י עד כמה את/ה מסכים/ה עם ההיגדים הבאים:"
      : "דרג/י עד כמה ההיגדים הבאים נכונים לגבי המנהל שאתה מעריך:";
  };

  // Calculate the starting display number for this step
  const questionsPerStep = currentQuestions.length;
  const startingDisplayNumber = (currentStep * questionsPerStep) + 1;

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="leading-tight text-black" style={{ fontSize: '18px' }}>
          {currentStep === 0 ? getInstructionText() : `המשך/י לדרג את ההיגדים (${currentStep + 1}/${totalSteps}):`}
        </CardTitle>
        
        {/* Gender Disclaimer - only show on first step */}
        {currentStep === 0 && (
          <div className="text-center text-gray-500 mt-2" style={{ fontSize: '14px' }}>
            השאלון מנוסח בלשון זכר אך מיועד לכלל המגדרים
          </div>
        )}
        
        {/* Rating Scale Legend */}
        <div className="text-center text-black mt-3 border-t pt-3" style={{ fontSize: '14px', lineHeight: '1.5' }}>
          <div className="flex flex-wrap justify-center gap-1 text-xs">
            <span>1 – לא נכון אף פעם</span>
            <span>|</span>
            <span>2 – נכון לעיתים רחוקות</span>
            <span>|</span>
            <span>3 – די נכון</span>
            <span>|</span>
            <span>4 – נכון לעיתים קרובות</span>
            <span>|</span>
            <span>5 – תמיד נכון</span>
          </div>
        </div>
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
