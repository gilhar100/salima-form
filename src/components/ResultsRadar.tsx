
import { SurveyResult, Dimension } from "@/lib/types";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import { dimensionInfo } from "@/data/questions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface ResultsRadarProps {
  result: SurveyResult;
}

// צבעים ייחודיים לכל ממד
export const dimensionColors = {
  S: { 
    primary: "#1e40af", // כחול עמוק לאסטרטגיה
    light: "#dbeafe",
    medium: "#93c5fd"
  },
  L: { 
    primary: "#059669", // ירוק ללמידה
    light: "#d1fae5",
    medium: "#6ee7b7"
  },
  I: { 
    primary: "#dc2626", // אדום להשראה
    light: "#fee2e2",
    medium: "#fca5a5"
  },
  M: { 
    primary: "#7c3aed", // סגול למשמעות
    light: "#ede9fe",
    medium: "#c4b5fd"
  },
  A: { 
    primary: "#ea580c", // כתום להסתגלות
    light: "#fed7aa",
    medium: "#fdba74"
  },
  A2: { 
    primary: "#be185d", // ורוד לאותנטיות
    light: "#fce7f3",
    medium: "#f9a8d4"
  }
};

const ResultsRadar: React.FC<ResultsRadarProps> = ({ result }) => {
  const isMobile = useIsMobile();
  const { dimensions, slq } = result;
  
  // הכנת הנתונים לתצוגה בגרף
  const radarData = [
    { dimension: dimensionInfo.S.title, value: dimensions.S.score, fullMark: 5, color: dimensionColors.S.primary },
    { dimension: dimensionInfo.L.title, value: dimensions.L.score, fullMark: 5, color: dimensionColors.L.primary },
    { dimension: dimensionInfo.I.title, value: dimensions.I.score, fullMark: 5, color: dimensionColors.I.primary },
    { dimension: dimensionInfo.M.title, value: dimensions.M.score, fullMark: 5, color: dimensionColors.M.primary },
    { dimension: dimensionInfo.A.title, value: dimensions.A.score, fullMark: 5, color: dimensionColors.A.primary },
    { dimension: dimensionInfo.A2.title, value: dimensions.A2.score, fullMark: 5, color: dimensionColors.A2.primary }
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
            const colors = dimensionColors[dimension.dimension as keyof typeof dimensionColors];
            return (
              <div 
                key={dimension.dimension} 
                className="text-center p-2 sm:p-3 border rounded-lg transition-colors"
                style={{ 
                  backgroundColor: colors.light,
                  borderColor: colors.medium
                }}
              >
                <p className="font-semibold text-xs sm:text-sm leading-tight">{dimension.title}</p>
                <p 
                  className="text-lg sm:text-2xl font-bold mt-1"
                  style={{ color: colors.primary }}
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
