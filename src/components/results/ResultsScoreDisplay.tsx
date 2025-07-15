
import { Award } from "lucide-react";

interface ResultsScoreDisplayProps {
  slq: number;
}

const ResultsScoreDisplay: React.FC<ResultsScoreDisplayProps> = ({ slq }) => {
  return (
    <div className="flex justify-center px-2">
      <div className="bg-white rounded-xl p-3 sm:p-4 lg:p-6 shadow-lg border-2 border-salima-200 text-center w-full max-w-xs sm:max-w-sm">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
          <Award className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-salima-600" />
          <h3 className="font-bold text-salima-800 text-base sm:text-lg lg:text-xl">
            ציון מנהיגות כללי
          </h3>
        </div>
        <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-salima-600 mb-2">
          {slq}/5
        </div>
      </div>
    </div>
  );
};

export default ResultsScoreDisplay;
