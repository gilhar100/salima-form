
import { SurveyResult, Dimension } from "@/lib/types";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import { dimensionInfo } from "@/data/questions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface ResultsRadarProps {
  result: SurveyResult;
  hideScores?: boolean;
}

// New colorblind-friendly SALIMA color palette with intensity levels
export const dimensionColors = {
  S: { 
    strongest: "#0D4F8C",
    strong: "#1F77B4",
    medium: "#4A90E2",
    weak: "#87CEEB",
    weakest: "#E6F3FF",
    light: "#F0F8FF",
    primary: "#1F77B4"
  },
  L: { 
    strongest: "#1E7A1E",
    strong: "#2CA02C",
    medium: "#5CB85C",
    weak: "#90EE90",
    weakest: "#F0FFF0",
    light: "#F0FDF7",
    primary: "#2CA02C"
  },
  I: { 
    strongest: "#A01E1E",
    strong: "#D62728",
    medium: "#E74C3C",
    weak: "#FFB6C1",
    weakest: "#FFE4E1",
    light: "#FEF7F0",
    primary: "#D62728"
  },
  M: { 
    strongest: "#6A4C93",
    strong: "#9467BD",
    medium: "#B19CD9",
    weak: "#DDA0DD",
    weakest: "#F8F4FF",
    light: "#FEF7FB",
    primary: "#9467BD"
  },
  A: { 
    strongest: "#CC5500",
    strong: "#FF7F0E",
    medium: "#FFA500",
    weak: "#FFCC99",
    weakest: "#FFF8DC",
    light: "#FFFBF0",
    primary: "#FF7F0E"
  },
  A2: { 
    strongest: "#8B8B00",
    strong: "#BCBD22",
    medium: "#CCCC33",
    weak: "#FFFF99",
    weakest: "#FFFACD",
    light: "#FEFEF0",
    primary: "#BCBD22"
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

const ResultsRadar: React.FC<ResultsRadarProps> = ({ result, hideScores = false }) => {
  const isMobile = useIsMobile();
  const { dimensions, slq } = result;
  
  // הכנת הנתונים לתצוגה בגרف
  const radarData = [
    { dimension: dimensionInfo.S.title, value: dimensions.S.score, fullMark: 5, color: getColorIntensity(dimensions.S.score, dimensionColors.S) },
    { dimension: dimensionInfo.L.title, value: dimensions.L.score, fullMark: 5, color: getColorIntensity(dimensions.L.score, dimensionColors.L) },
    { dimension: dimensionInfo.I.title, value: dimensions.I.score, fullMark: 5, color: getColorIntensity(dimensions.I.score, dimensionColors.I) },
    { dimension: dimensionInfo.M.title, value: dimensions.M.score, fullMark: 5, color: getColorIntensity(dimensions.M.score, dimensionColors.M) },
    { dimension: dimensionInfo.A.title, value: dimensions.A.score, fullMark: 5, color: getColorIntensity(dimensions.A.score, dimensionColors.A) },
    { dimension: dimensionInfo.A2.title, value: dimensions.A2.score, fullMark: 5, color: getColorIntensity(dimensions.A2.score, dimensionColors.A2) }
  ];

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-center text-lg sm:text-xl leading-tight">פרופיל מנהיגות SALIMA-WOCA</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center px-3 sm:px-6">
        {!hideScores && (
          <div className="text-center mb-4">
            <p className="text-gray-600 mb-1 text-sm">ציון SLQ כללי</p>
            <p className="text-2xl sm:text-3xl font-bold text-salima-600">{slq}</p>
          </div>
        )}
        
        <div className={`w-full ${isMobile ? 'h-[280px]' : 'h-[350px]'}`}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart 
              outerRadius={isMobile ? "70%" : "80%"} 
              data={radarData}
              margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <PolarGrid />
              <PolarAngleAxis 
                dataKey="dimension" 
                fontSize={isMobile ? 8 : 10}
                tick={{ fontSize: isMobile ? 8 : 10 }}
              />
              <Radar
                name="ציון"
                dataKey="value"
                stroke="#0369a1"
                fill="#0369a1"
                fillOpacity={0.5}
              />
              {!hideScores && <Tooltip formatter={(value) => [`${value}`, 'ציון']} />}
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        {!hideScores && (
          <div className={`grid gap-2 mt-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3'} w-full`}>
            {Object.values(dimensions).map((dimension) => {
              const baseColors = dimensionColors[dimension.dimension as keyof typeof dimensionColors];
              const intensityColor = getColorIntensity(dimension.score, baseColors);
              return (
                <div 
                  key={dimension.dimension} 
                  className="text-center p-2 sm:p-3 border-2 rounded-lg transition-colors"
                  style={{ 
                    backgroundColor: baseColors.light,
                    borderColor: intensityColor
                  }}
                >
                  <p className="font-semibold text-xs sm:text-sm leading-tight">{dimension.title}</p>
                  <p 
                    className="text-lg sm:text-2xl font-bold mt-1"
                    style={{ color: intensityColor }}
                  >
                    {dimension.score}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultsRadar;
