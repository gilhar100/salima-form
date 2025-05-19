
import { SurveyResult, Dimension } from "@/lib/types";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import { dimensionInfo } from "@/data/questions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResultsRadarProps {
  result: SurveyResult;
}

const ResultsRadar: React.FC<ResultsRadarProps> = ({ result }) => {
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
      <CardHeader>
        <CardTitle className="text-center text-xl">פרופיל מנהיגות SALIMA-WOCA</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="text-center mb-4">
          <p className="text-gray-600 mb-1">ציון SLQ כללי</p>
          <p className="text-3xl font-bold text-salima-600">{slq}</p>
        </div>
        
        <div className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius="80%" data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="dimension" />
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
        
        <div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-3">
          {Object.values(dimensions).map((dimension) => (
            <div 
              key={dimension.dimension} 
              className="text-center p-3 border rounded-lg hover:bg-salima-50 transition-colors"
            >
              <p className="font-semibold">{dimension.title}</p>
              <p className="text-2xl font-bold text-salima-600">{dimension.score}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsRadar;
