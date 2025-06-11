
import { SurveyResult } from "@/lib/types";
import SlqHistogramChart from "./charts/SlqHistogramChart";
import DimensionRadarChart from "./charts/DimensionRadarChart";
import DimensionComparisonCards from "./charts/DimensionComparisonCards";

interface SurveyResponse {
  id: string;
  slq_score: number;
  dimension_s: number;
  dimension_l: number;
  dimension_i: number;
  dimension_m: number;
  dimension_a: number;
  dimension_a2: number;
  created_at: string;
}

interface StatisticsChartsProps {
  statistics: SurveyResponse[];
  userResults: SurveyResult;
}

const StatisticsCharts: React.FC<StatisticsChartsProps> = ({ statistics, userResults }) => {
  return (
    <div className="space-y-4 px-2 sm:px-0">
      <SlqHistogramChart statistics={statistics} userSlqScore={userResults.slq} />
      <DimensionRadarChart statistics={statistics} userResults={userResults} />
      <DimensionComparisonCards statistics={statistics} userResults={userResults} />
    </div>
  );
};

export default StatisticsCharts;
