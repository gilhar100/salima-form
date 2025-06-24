
import { Progress } from "@/components/ui/progress";
import { SurveyType, ColleagueEvaluatorInfo } from "@/lib/types";

interface SurveyHeaderProps {
  surveyType: SurveyType;
  colleagueInfo: ColleagueEvaluatorInfo | null;
  progress: number;
  currentStep: number;
  totalSteps: number;
}

const SurveyHeader: React.FC<SurveyHeaderProps> = ({
  surveyType,
  colleagueInfo,
  progress,
  currentStep,
  totalSteps
}) => {
  const surveyTitle = surveyType === 'manager' ? 'שאלון מנהיגות' : 'הערכת מנהל';

  return (
    <div className="mb-4 space-y-3">
      <h1 className="font-bold text-center text-black" style={{ fontSize: '22px' }}>{surveyTitle}</h1>
      {surveyType === 'colleague' && colleagueInfo && (
        <p className="text-center text-black" style={{ fontSize: '16px' }}>מעריך את: {colleagueInfo.managerName}</p>
      )}
      <Progress value={progress} className="h-2 sm:h-3" />
      <div className="text-center text-black" style={{ fontSize: '16px' }}>
        שלב {currentStep + 1} מתוך {totalSteps}
      </div>
    </div>
  );
};

export default SurveyHeader;
