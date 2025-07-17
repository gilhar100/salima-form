
import { SurveyResult, Dimension } from "@/lib/types";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import { dimensionInfo } from "@/data/questions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { dimensionColors } from "./diverging-chart/constants";

interface ResultsRadarProps {
  result: SurveyResult;
  hideScores?: boolean;
}

const ResultsRadar: React.FC<ResultsRadarProps> = ({
  result,
  hideScores = false
}) => {
  const isMobile = useIsMobile();
  const {
    dimensions,
    slq
  } = result;

  // הכנת הנתונים לתצוגה בגרף - using fixed colors
  const radarData = [{
    dimension: dimensionInfo.S.title,
    value: dimensions.S.score,
    fullMark: 5,
    color: dimensionColors.S.strong // Fixed color
  }, {
    dimension: dimensionInfo.L.title,
    value: dimensions.L.score,
    fullMark: 5,
    color: dimensionColors.L.strong // Fixed color
  }, {
    dimension: dimensionInfo.I.title,
    value: dimensions.I.score,
    fullMark: 5,
    color: dimensionColors.I.strong // Fixed color
  }, {
    dimension: dimensionInfo.M.title,
    value: dimensions.M.score,
    fullMark: 5,
    color: dimensionColors.M.strong // Fixed color
  }, {
    dimension: dimensionInfo.A.title,
    value: dimensions.A.score,
    fullMark: 5,
    color: dimensionColors.A.strong // Fixed color
  }, {
    dimension: dimensionInfo.A2.title,
    value: dimensions.A2.score,
    fullMark: 5,
    color: dimensionColors.A2.strong // Fixed color
  }];

  return <Card className="w-full h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-center text-lg sm:text-xl leading-tight">פרופיל מנהיגות SALIMA</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center px-3 sm:px-6">
        {!hideScores && <div className="text-center mb-4">
            <p className="text-gray-600 mb-1 text-sm">ציון SLQ כללי</p>
            <p className="text-2xl sm:text-3xl font-bold text-salima-600">{slq}</p>
          </div>}
        
        <div className={`w-full ${isMobile ? 'h-[280px]' : 'h-[350px]'}`}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius={isMobile ? "65%" : "70%"} data={radarData} margin={{
            top: 30,
            right: 30,
            bottom: 30,
            left: 30
          }}>
              <PolarGrid />
              <PolarAngleAxis dataKey="dimension" fontSize={isMobile ? 10 : 12} tick={{
              fontSize: isMobile ? 10 : 12,
              fontWeight: 'bold'
            }} />
              <Radar name="ציון" dataKey="value" stroke="#0369a1" fill="#0369a1" fillOpacity={0.5} />
              {!hideScores && <Tooltip formatter={value => [`${value}`, 'ציון']} />}
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        {!hideScores && <div className={`grid gap-2 mt-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3'} w-full`}>
            {Object.values(dimensions).map(dimension => {
          const baseColors = dimensionColors[dimension.dimension as keyof typeof dimensionColors];
          const fixedColor = baseColors.strong; // Use fixed color
          return <div key={dimension.dimension} className="text-center p-2 sm:p-3 border-2 rounded-lg transition-colors" style={{
            backgroundColor: baseColors.light,
            borderColor: fixedColor
          }}>
                  <p className="font-semibold text-xs sm:text-sm leading-tight">{dimension.title}</p>
                  <p className="text-lg sm:text-2xl font-bold mt-1" style={{
              color: fixedColor
            }}>
                    {dimension.score}
                  </p>
                </div>;
        })}
          </div>}
      </CardContent>
    </Card>;
};

export default ResultsRadar;
