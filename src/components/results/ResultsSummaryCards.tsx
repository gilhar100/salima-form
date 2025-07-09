
import { DimensionResult } from "@/lib/types";

interface ResultsSummaryCardsProps {
  highestDimension: DimensionResult;
  lowestDimension: DimensionResult;
}

const ResultsSummaryCards: React.FC<ResultsSummaryCardsProps> = ({ 
  highestDimension, 
  lowestDimension 
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-center">
      <div className="p-3 sm:p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
        <h3 className="font-semibold mb-2 text-gray-700 text-base sm:text-lg">הממד החזק ביותר</h3>
        <div className="font-bold text-gray-600 mb-1 text-lg sm:text-xl">
          {highestDimension.title}
        </div>
        <p className="text-black text-sm sm:text-base">אזור של כוח וחוזק</p>
      </div>
      
      <div className="p-3 sm:p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
        <h3 className="font-semibold mb-2 text-gray-700 text-base sm:text-lg">הממד לפיתוח</h3>
        <div className="font-bold text-gray-600 mb-1 text-lg sm:text-xl">
          {lowestDimension.title}
        </div>
        <p className="text-black text-sm sm:text-base">אזור להשקעה ופיתוח</p>
      </div>
    </div>
  );
};

export default ResultsSummaryCards;
