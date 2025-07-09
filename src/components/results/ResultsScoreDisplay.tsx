
import { Award } from "lucide-react";

interface ResultsScoreDisplayProps {
  slq: number;
}

const ResultsScoreDisplay: React.FC<ResultsScoreDisplayProps> = ({ slq }) => {
  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border-2 border-salima-200 text-center w-full max-w-sm">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
          <Award className="w-5 h-5 sm:w-6 sm:h-6 text-salima-600" />
          <h3 className="font-bold text-salima-800 text-lg sm:text-xl">
            ציון מנהיגות כללי
          </h3>
        </div>
        <div className="text-4xl sm:text-5xl font-bold text-salima-600 mb-2">
          {slq}/5
        </div>
      </div>
    </div>
  );
};

export default ResultsScoreDisplay;
