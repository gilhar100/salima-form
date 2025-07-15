
import { SurveyResult } from "@/lib/types";
import ResultsRadar from "@/components/ResultsRadar";
import PersonalColorProfile from "@/components/PersonalColorProfile";
import DivergingBarChart from "@/components/DivergingBarChart";

interface ResultsChartsProps {
  result: SurveyResult;
}

const ResultsCharts: React.FC<ResultsChartsProps> = ({ result }) => {
  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6">
      <div className="mobile-stack flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-6">
        <div className="w-full lg:w-1/2">
          <div className="chart-container">
            <DivergingBarChart result={result} />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="bg-white rounded-lg p-2 sm:p-3 lg:p-4 shadow-sm chart-container">
            <ResultsRadar result={result} hideScores={true} />
          </div>
        </div>
      </div>
      
      <div className="w-full chart-container">
        <PersonalColorProfile result={result} />
      </div>
    </div>
  );
};

export default ResultsCharts;
