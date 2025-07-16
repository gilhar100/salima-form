import { SurveyResult, Dimension } from "@/lib/types";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import { dimensionInfo } from "@/data/questions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
interface ResultsRadarProps {
  result: SurveyResult;
  hideScores?: boolean;
}

// Updated SALIMA color palette with intensity levels
export const dimensionColors = {
  S: {
    strongest: "#B30000",
    strong: "#FD0100",
    medium: "#FF4D4D",
    weak: "#FF9999",
    weakest: "#FFE6E6",
    light: "#FFF5F5",
    primary: "#FD0100"
  },
  L: {
    strongest: "#0000B3",
    strong: "#333ED4",
    medium: "#6666FF",
    weak: "#9999FF",
    weakest: "#E6E6FF",
    light: "#F5F5FF",
    primary: "#333ED4"
  },
  I: {
    strongest: "#CC4400",
    strong: "#F76915",
    medium: "#FF8533",
    weak: "#FFAA66",
    weakest: "#FFE6CC",
    light: "#FFF8F0",
    primary: "#F76915"
  },
  M: {
    strongest: "#8A3399",
    strong: "#BF4ED6",
    medium: "#CC66E0",
    weak: "#DD99E6",
    weakest: "#F5E6FF",
    light: "#FCF7FF",
    primary: "#BF4ED6"
  },
  A: {
    strongest: "#1F6B1F",
    strong: "#2FA236",
    medium: "#5CB85C",
    weak: "#90EE90",
    weakest: "#E6FFE6",
    light: "#F0FFF0",
    primary: "#2FA236"
  },
  A2: {
    strongest: "#B8B800",
    strong: "#EEDE04",
    medium: "#F0E833",
    weak: "#F5F566",
    weakest: "#FFFACD",
    light: "#FEFEF0",
    primary: "#EEDE04"
  }
};

// פונקציה לקבלת עוצמת צבע בהתאם לציון
const getColorIntensity = (score: number, baseColors: any) => {
  const normalizedScore = Math.max(0, Math.min(5, score)) / 5;
  if (normalizedScore >= 0.9) return baseColors.strongest;
  if (normalizedScore >= 0.75) return baseColors.strong;
  if (normalizedScore >= 0.55) return baseColors.medium;
  if (normalizedScore >= 0.35) return baseColors.weak;
  return baseColors.weakest;
};
const ResultsRadar: React.FC<ResultsRadarProps> = ({
  result,
  hideScores = false
}) => {
  const isMobile = useIsMobile();
  const {
    dimensions,
    slq
  } = result;

  // הכנת הנתונים לתצוגה בגרף
  const radarData = [{
    dimension: dimensionInfo.S.title,
    value: dimensions.S.score,
    fullMark: 5,
    color: getColorIntensity(dimensions.S.score, dimensionColors.S)
  }, {
    dimension: dimensionInfo.L.title,
    value: dimensions.L.score,
    fullMark: 5,
    color: getColorIntensity(dimensions.L.score, dimensionColors.L)
  }, {
    dimension: dimensionInfo.I.title,
    value: dimensions.I.score,
    fullMark: 5,
    color: getColorIntensity(dimensions.I.score, dimensionColors.I)
  }, {
    dimension: dimensionInfo.M.title,
    value: dimensions.M.score,
    fullMark: 5,
    color: getColorIntensity(dimensions.M.score, dimensionColors.M)
  }, {
    dimension: dimensionInfo.A.title,
    value: dimensions.A.score,
    fullMark: 5,
    color: getColorIntensity(dimensions.A.score, dimensionColors.A)
  }, {
    dimension: dimensionInfo.A2.title,
    value: dimensions.A2.score,
    fullMark: 5,
    color: getColorIntensity(dimensions.A2.score, dimensionColors.A2)
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
          const intensityColor = getColorIntensity(dimension.score, baseColors);
          return <div key={dimension.dimension} className="text-center p-2 sm:p-3 border-2 rounded-lg transition-colors" style={{
            backgroundColor: baseColors.light,
            borderColor: intensityColor
          }}>
                  <p className="font-semibold text-xs sm:text-sm leading-tight">{dimension.title}</p>
                  <p className="text-lg sm:text-2xl font-bold mt-1" style={{
              color: intensityColor
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