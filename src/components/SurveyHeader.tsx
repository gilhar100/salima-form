
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
      <h1 className="text-xl sm:text-2xl font-bold text-center">{surveyTitle}</h1>
      <h2 className="text-lg sm:text-xl font-semibold text-center text-gray-600">ד"ר יוסי שרעבי</h2>
      {surveyType === 'colleague' && colleagueInfo && (
        <p className="text-center text-gray-600">מעריך את: {colleagueInfo.managerName}</p>
      )}
      <Progress value={progress} className="h-2 sm:h-3" />
      <div className="text-center text-sm text-gray-500">
        שלב {currentStep + 1} מתוך {totalSteps}
      </div>
    </div>
  );
};

export default SurveyHeader;
