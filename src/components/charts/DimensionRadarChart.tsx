
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import { SurveyResult } from "@/lib/types";
import { useIsMobile } from "@/hooks/use-mobile";
import { dimensionNames, DIMENSION_ORDER } from "../diverging-chart/constants";

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

interface DimensionRadarChartProps {
  statistics: SurveyResponse[];
  userResults: SurveyResult;
}

const DimensionRadarChart: React.FC<DimensionRadarChartProps> = ({ statistics, userResults }) => {
  const isMobile = useIsMobile();

  const createDimensionRadarData = () => {
    // Use fixed archetype order
    return DIMENSION_ORDER.map(dimKey => {
      const dimKeyLower = dimKey.toLowerCase();
      const dimDbKey = dimKeyLower === 'a2' ? 'dimension_a2' : `dimension_${dimKeyLower}`;
      const scores = statistics.map(s => s[dimDbKey as keyof SurveyResponse] as number).filter(s => typeof s === 'number');
      const avg = scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;
      
      const userDimScore = userResults.dimensions[dimKey as keyof typeof userResults.dimensions].score;
      
      return {
        dimension: dimensionNames[dimKey],
        average: Number(avg.toFixed(2)),
        userScore: userDimScore,
        fullMark: 5
      };
    });
  };

  const radarData = createDimensionRadarData();

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg sm:text-xl">השוואת ממדים - פרופיל אישי מול ממוצע כללי</CardTitle>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <div className={`${isMobile ? 'h-80' : 'h-96'} w-full`}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart 
              outerRadius={isMobile ? "65%" : "75%"} 
              data={radarData}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <PolarGrid />
              <PolarAngleAxis 
                dataKey="dimension" 
                fontSize={isMobile ? 9 : 11}
                tick={{ fontSize: isMobile ? 9 : 11 }}
              />
              <Radar
                name="ממוצע כללי"
                dataKey="average"
                stroke="#94a3b8"
                fill="#94a3b8"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar
                name="הציון שלך"
                dataKey="userScore"
                stroke="#0369a1"
                fill="#0369a1"
                fillOpacity={0.5}
                strokeWidth={3}
              />
              <Tooltip 
                formatter={(value, name) => [
                  Number(value).toFixed(2), 
                  name === 'average' ? 'ממוצע כללי' : 'הציון שלך'
                ]}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-600 rounded"></div>
            <span>הציון שלך</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-400 rounded"></div>
            <span>ממוצע כללי</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DimensionRadarChart;
