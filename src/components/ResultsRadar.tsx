
import { SurveyResult, Dimension } from "@/lib/types";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import { dimensionInfo } from "@/data/questions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface ResultsRadarProps {
  result: SurveyResult;
}

const ResultsRadar: React.FC<ResultsRadarProps> = ({ result }) => {
  const isMobile = useIsMobile();
  const { dimensions, slq } = result;
  
  // הכנת הנתונים לתצוגה בגרף
  const radarData = [
    { dimension: dimensionInfo.S.title, value: dimensions.S.score, fullMark: 5 },
    { dimension: dimensionInfo.L.title, value: dimensions.L.score, fullMark: 5 },
    { dimension: dimensionInfo.I.title, value: dimensions.I.score, fullMark: 5 },
    { dimension: dimensionInfo.M.title, value: dimensions.M.score, fullMark: 5 },
    { dimension: dimensionInfo.A.title, value: dimensions.A.score, fullMark: 5 },
    { dimension: dimensionInfo.A2.title, value: dimensions.A2.score, fullMark: 5 }
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
          {Object.values(dimensions).map((dimension) => (
            <div 
              key={dimension.dimension} 
              className="text-center p-2 sm:p-3 border rounded-lg hover:bg-salima-50 transition-colors"
            >
              <p className="font-semibold text-xs sm:text-sm leading-tight">{dimension.title}</p>
              <p className="text-lg sm:text-2xl font-bold text-salima-600 mt-1">{dimension.score}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsRadar;
