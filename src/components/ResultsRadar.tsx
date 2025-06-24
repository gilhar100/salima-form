
import { SurveyResult, Dimension } from "@/lib/types";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import { dimensionInfo } from "@/data/questions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface ResultsRadarProps {
  result: SurveyResult;
  hideScores?: boolean;
}

// פונקציה לקבלת עוצמת צבע בהתאם לציון
const getColorIntensity = (score: number, baseColors: any) => {
  const normalizedScore = Math.max(0, Math.min(5, score)) / 5; // נרמול לטווח 0-1
  
  if (normalizedScore >= 0.9) return baseColors.strongest;
  if (normalizedScore >= 0.75) return baseColors.strong;
  if (normalizedScore >= 0.55) return baseColors.medium;
  if (normalizedScore >= 0.35) return baseColors.weak;
  return baseColors.weakest;
};

// צבעים חדשים ידידותיים לעיוורי צבעים עם דרגות עוצמה
export const dimensionColors = {
  S: { 
    strongest: "#003d6b",   // Strategy - Dark Blue (darkest)
    strong: "#0072B2",     // Strategy - Dark Blue (main)
    medium: "#4a9de0",     // Strategy - Dark Blue (lighter)
    weak: "#87ceeb",       // Strategy - Dark Blue (light)
    weakest: "#e6f3ff",    // Strategy - Dark Blue (lightest)
    light: "#f0f8ff",
    primary: "#0072B2"
  },
  L: { 
    strongest: "#2a7fb8",  // Learning - Sky Blue (darkest)
    strong: "#56B4E9",     // Learning - Sky Blue (main)
    medium: "#7ac5ec",     // Learning - Sky Blue (lighter)
    weak: "#a8d6f0",       // Learning - Sky Blue (light)
    weakest: "#e5f4fc",    // Learning - Sky Blue (lightest)
    light: "#f0f9ff",
    primary: "#56B4E9"
  },
  I: { 
    strongest: "#a03f00",  // Inspiration - Vermillion (darkest)
    strong: "#D55E00",     // Inspiration - Vermillion (main)
    medium: "#e07e33",     // Inspiration - Vermillion (lighter)
    weak: "#eb9f66",       // Inspiration - Vermillion (light)
    weakest: "#f6d6c4",    // Inspiration - Vermillion (lightest)
    light: "#fef7f0",
    primary: "#D55E00"
  },
  M: { 
    strongest: "#006d52",  // Meaning - Bluish Green (darkest)
    strong: "#009E73",     // Meaning - Bluish Green (main)
    medium: "#33b088",     // Meaning - Bluish Green (lighter)
    weak: "#66c39e",       // Meaning - Bluish Green (light)
    weakest: "#ccede5",    // Meaning - Bluish Green (lightest)
    light: "#f0fdf7",
    primary: "#009E73"
  },
  A: { 
    strongest: "#b8760a",  // Adaptive - Orange (darkest)
    strong: "#E69F00",     // Adaptive - Orange (main)
    medium: "#eab233",     // Adaptive - Orange (lighter)
    weak: "#efc666",       // Adaptive - Orange (light)
    weakest: "#faebd7",    // Adaptive - Orange (lightest)
    light: "#fffbf0",
    primary: "#E69F00"
  },
  A2: { 
    strongest: "#c7c100",  // Authentic - Yellow (darkest)
    strong: "#F0E442",     // Authentic - Yellow (main)
    medium: "#f3e968",     // Authentic - Yellow (lighter)
    weak: "#f6ee8e",       // Authentic - Yellow (light)
    weakest: "#fcf8d4",    // Authentic - Yellow (lightest)
    light: "#fefef0",
    primary: "#F0E442"
  }
};

const ResultsRadar: React.FC<ResultsRadarProps> = ({ result, hideScores = false }) => {
  const isMobile = useIsMobile();
  const { dimensions, slq } = result;
  
  // הכנת הנתונים לתצוגה בגרף
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
