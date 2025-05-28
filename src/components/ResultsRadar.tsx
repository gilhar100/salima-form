
import { SurveyResult, Dimension } from "@/lib/types";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import { dimensionInfo } from "@/data/questions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface ResultsRadarProps {
  result: SurveyResult;
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

// צבעים ייחודיים לכל ממד עם דרגות עוצמה
export const dimensionColors = {
  S: { 
    strongest: "#1e3a8a", // כחול עמוק מאוד
    strong: "#1e40af",    // כחול עמוק
    medium: "#3b82f6",    // כחול בינוני
    weak: "#93c5fd",      // כחול בהיר
    weakest: "#dbeafe",   // כחול בהיר מאוד
    light: "#eff6ff",
    primary: "#1e40af"
  },
  L: { 
    strongest: "#14532d", // ירוק עמוק מאוד
    strong: "#166534",    // ירוק עמוק
    medium: "#16a34a",    // ירוק בינוני
    weak: "#4ade80",      // ירוק בהיר
    weakest: "#bbf7d0",   // ירוק בהיר מאוד
    light: "#f0fdf4",
    primary: "#166534"
  },
  I: { 
    strongest: "#7f1d1d", // אדום עמוק מאוד
    strong: "#b91c1c",    // אדום עמוק
    medium: "#dc2626",    // אדום בינוני
    weak: "#f87171",      // אדום בהיר
    weakest: "#fecaca",   // אדום בהיר מאוד
    light: "#fef2f2",
    primary: "#b91c1c"
  },
  M: { 
    strongest: "#581c87", // סגול עמוק מאוד
    strong: "#7c2d12",    // חום-סגול עמוק
    medium: "#a855f7",    // סגול בינוני
    weak: "#c084fc",      // סגול בהיר
    weakest: "#e9d5ff",   // סגול בהיר מאוד
    light: "#faf5ff",
    primary: "#7c2d12"
  },
  A: { 
    strongest: "#9a3412", // כתום עמוק מאוד
    strong: "#c2410c",    // כתום עמוק
    medium: "#ea580c",    // כתום בינוני
    weak: "#fb923c",      // כתום בהיר
    weakest: "#fed7aa",   // כתום בהיר מאוד
    light: "#fff7ed",
    primary: "#c2410c"
  },
  A2: { 
    strongest: "#831843", // ורוד עמוק מאוד
    strong: "#be185d",    // ורוד עמוק
    medium: "#db2777",    // ורוד בינוני
    weak: "#f472b6",      // ורוד בהיר
    weakest: "#fce7f3",   // ורוד בהיר מאוד
    light: "#fdf2f8",
    primary: "#be185d"
  }
};

const ResultsRadar: React.FC<ResultsRadarProps> = ({ result }) => {
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
        <div className="text-center mb-4">
          <p className="text-gray-600 mb-1 text-sm">ציון SLQ כללי</p>
          <p className="text-2xl sm:text-3xl font-bold text-salima-600">{slq}</p>
        </div>
        
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
              <Tooltip formatter={(value) => [`${value}`, 'ציון']} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
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
      </CardContent>
    </Card>
  );
};

export default ResultsRadar;
