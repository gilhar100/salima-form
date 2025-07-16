import { SurveyResult, Dimension } from "@/lib/types";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import { dimensionInfo } from "@/data/questions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import EnhancedRadarChart from "@/components/charts/EnhancedRadarChart";
interface ResultsRadarProps {
  result: SurveyResult;
  hideScores?: boolean;
}

// Updated SALIMA color palette with new assignments and intensity levels
export const dimensionColors = {
  S: { // Strategy - Red
    strongest: "#B30000",
    strong: "#DC2626",
    medium: "#EF4444",
    weak: "#F87171",
    weakest: "#FEE2E2",
    light: "#FEF2F2",
    primary: "#DC2626"
  },
  A: { // Adaptive - Blue  
    strongest: "#1E3A8A",
    strong: "#1D4ED8",
    medium: "#3B82F6",
    weak: "#60A5FA",
    weakest: "#DBEAFE",
    light: "#EFF6FF",
    primary: "#1D4ED8"
  },
  L: { // Learning - Yellow
    strongest: "#A16207",
    strong: "#CA8A04",
    medium: "#EAB308",
    weak: "#FACC15",
    weakest: "#FEF3C7",
    light: "#FFFBEB",
    primary: "#CA8A04"
  },
  I: { // Inspiration - Pink
    strongest: "#BE185D",
    strong: "#DB2777",
    medium: "#EC4899",
    weak: "#F472B6",
    weakest: "#FCE7F3",
    light: "#FDF2F8",
    primary: "#DB2777"
  },
  A2: { // Authentic - Turquoise
    strongest: "#0F766E",
    strong: "#0D9488",
    medium: "#14B8A6",
    weak: "#5EEAD4",
    weakest: "#CCFBF1",
    light: "#F0FDFA",
    primary: "#0D9488"
  },
  M: { // Meaning - Brown
    strongest: "#78350F",
    strong: "#92400E",
    medium: "#A16207",
    weak: "#D97706",
    weakest: "#FED7AA",
    light: "#FFF7ED",
    primary: "#92400E"
  }
};

// Archetype group borders
export const archetypeGroups = {
  opportunity: { // Strategy + Adaptive - Purple
    dimensions: ['S', 'A'],
    borderColor: "#7C3AED",
    name: "מנהל ההזדמנות"
  },
  curious: { // Learning + Inspiration - Orange  
    dimensions: ['L', 'I'],
    borderColor: "#EA580C",
    name: "המנהל הסקרן"
  },
  empowering: { // Authentic + Meaning - Green
    dimensions: ['A2', 'M'], 
    borderColor: "#059669",
    name: "המנהל המעצים"
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

  // הכנת הנתונים לתצוגה בגרף - ממוין לפי קבוצות ארכיטיפ
  const radarData = [
    // מנהל ההזדמנות: Strategy + Adaptive
    {
      dimension: dimensionInfo.S.title,
      value: dimensions.S.score,
      fullMark: 5,
      color: getColorIntensity(dimensions.S.score, dimensionColors.S),
      dimKey: 'S'
    },
    {
      dimension: dimensionInfo.A.title,
      value: dimensions.A.score,
      fullMark: 5,
      color: getColorIntensity(dimensions.A.score, dimensionColors.A),
      dimKey: 'A'
    },
    // המנהל הסקרן: Learning + Inspiration
    {
      dimension: dimensionInfo.L.title,
      value: dimensions.L.score,
      fullMark: 5,
      color: getColorIntensity(dimensions.L.score, dimensionColors.L),
      dimKey: 'L'
    },
    {
      dimension: dimensionInfo.I.title,
      value: dimensions.I.score,
      fullMark: 5,
      color: getColorIntensity(dimensions.I.score, dimensionColors.I),
      dimKey: 'I'
    },
    // המנהל המעצים: Authentic + Meaning
    {
      dimension: dimensionInfo.A2.title,
      value: dimensions.A2.score,
      fullMark: 5,
      color: getColorIntensity(dimensions.A2.score, dimensionColors.A2),
      dimKey: 'A2'
    },
    {
      dimension: dimensionInfo.M.title,
      value: dimensions.M.score,
      fullMark: 5,
      color: getColorIntensity(dimensions.M.score, dimensionColors.M),
      dimKey: 'M'
    }
  ];
  return <Card className="w-full h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-center text-lg sm:text-xl leading-tight">פרופיל מנהיגות SALIMA</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center px-3 sm:px-6">
        {!hideScores && <div className="text-center mb-4">
            <p className="text-gray-600 mb-1 text-sm">ציון SLQ כללי</p>
            <p className="text-2xl sm:text-3xl font-bold text-salima-600">{slq}</p>
          </div>}
        
        <div className={`w-full ${isMobile ? 'h-[320px]' : 'h-[400px]'}`}>
          <EnhancedRadarChart
            data={radarData}
            outerRadius={isMobile ? "60%" : "65%"}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            fontSize={isMobile ? 10 : 12}
            showArchetypeBorders={true}
          >
            <Radar 
              name="ציון" 
              dataKey="value" 
              stroke="#374151" 
              fill="url(#multiColor)" 
              fillOpacity={0.6}
              strokeWidth={2}
            />
            {!hideScores && <Tooltip formatter={value => [`${value}`, 'ציון']} />}
          </EnhancedRadarChart>
        </div>
        
        {!hideScores && (
          <>
            {/* Archetype group legend */}
            <div className="grid gap-2 mt-4 text-xs text-center">
              {Object.entries(archetypeGroups).map(([key, group]) => (
                <div key={key} className="flex items-center justify-center gap-2">
                  <div 
                    className="w-3 h-3 rounded border-2" 
                    style={{ borderColor: group.borderColor }}
                  />
                  <span className="font-medium">{group.name}</span>
                </div>
              ))}
            </div>
            
            {/* Dimension scores - ordered by archetype groups */}
            <div className={`grid gap-2 mt-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3'} w-full`}>
              {['S', 'A', 'L', 'I', 'A2', 'M'].map(dimKey => {
                const dimension = dimensions[dimKey as keyof typeof dimensions];
                const baseColors = dimensionColors[dimKey as keyof typeof dimensionColors];
                const intensityColor = getColorIntensity(dimension.score, baseColors);
                
                return (
                  <div 
                    key={dimKey} 
                    className="text-center p-2 sm:p-3 border-2 rounded-lg transition-colors" 
                    style={{
                      backgroundColor: baseColors.light,
                      borderColor: intensityColor
                    }}
                  >
                    <p className="font-semibold text-xs sm:text-sm leading-tight">{dimension.title}</p>
                    <p className="text-lg sm:text-2xl font-bold mt-1" style={{ color: intensityColor }}>
                      {dimension.score}
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </CardContent>
    </Card>;
};
export default ResultsRadar;