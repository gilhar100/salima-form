
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Cell } from "recharts";
import { SurveyResult } from "@/lib/types";
import { useIsMobile } from "@/hooks/use-mobile";
import { dimensionColors } from "./ResultsRadar";
import { getColorIntensity } from "@/lib/analysis/color-intensity";

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

interface StatisticsChartsProps {
  statistics: SurveyResponse[];
  userResults: SurveyResult;
}

const StatisticsCharts: React.FC<StatisticsChartsProps> = ({ statistics, userResults }) => {
  const isMobile = useIsMobile();

  // הכנת נתונים להיסטוגרמה של ציוני SLQ
  const createHistogramData = () => {
    const bins = [
      { range: "1.0-1.5", min: 1.0, max: 1.5, count: 0 },
      { range: "1.5-2.0", min: 1.5, max: 2.0, count: 0 },
      { range: "2.0-2.5", min: 2.0, max: 2.5, count: 0 },
      { range: "2.5-3.0", min: 2.5, max: 3.0, count: 0 },
      { range: "3.0-3.5", min: 3.0, max: 3.5, count: 0 },
      { range: "3.5-4.0", min: 3.5, max: 4.0, count: 0 },
      { range: "4.0-4.5", min: 4.0, max: 4.5, count: 0 },
      { range: "4.5-5.0", min: 4.5, max: 5.0, count: 0 },
    ];

    statistics.forEach(response => {
      const score = response.slq_score;
      const bin = bins.find(b => score >= b.min && score < b.max) || bins[bins.length - 1];
      bin.count++;
    });

    return bins;
  };

  // הכנת נתונים להשוואת ממדים - גרף רדאר משופר
  const createDimensionRadarData = () => {
    const dimensions = [
      { key: 'S', title: 'אסטרטגיה' },
      { key: 'L', title: 'למידה' }, 
      { key: 'I', title: 'השראה' },
      { key: 'M', title: 'משמעות' },
      { key: 'A', title: 'הסתגלות' },
      { key: 'A2', title: 'אותנטיות' }
    ];
    
    return dimensions.map(dim => {
      const dimKey = `dimension_${dim.key.toLowerCase()}` as keyof SurveyResponse;
      const scores = statistics.map(s => s[dimKey] as number).filter(s => typeof s === 'number');
      const avg = scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;
      
      const userDimScore = userResults.dimensions[dim.key as keyof typeof userResults.dimensions].score;
      const baseColors = dimensionColors[dim.key as keyof typeof dimensionColors];
      
      return {
        dimension: dim.title,
        average: Number(avg.toFixed(2)),
        userScore: userDimScore,
        fullMark: 5,
        color: getColorIntensity(userDimScore, baseColors)
      };
    });
  };

  // הכנת נתונים להשוואת ממדים - טבלה
  const createDimensionComparison = () => {
    const dimensions = ['S', 'L', 'I', 'M', 'A', 'A2'];
    
    return dimensions.map(dim => {
      const dimKey = `dimension_${dim.toLowerCase()}` as keyof SurveyResponse;
      const scores = statistics.map(s => s[dimKey] as number).filter(s => typeof s === 'number');
      const avg = scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;
      
      const userDimScore = userResults.dimensions[dim as keyof typeof userResults.dimensions].score;
      
      return {
        dimension: userResults.dimensions[dim as keyof typeof userResults.dimensions].title,
        average: Number(avg.toFixed(2)),
        userScore: userDimScore,
        difference: Number((userDimScore - avg).toFixed(2))
      };
    });
  };

  const histogramData = createHistogramData();
  const radarData = createDimensionRadarData();
  const dimensionData = createDimensionComparison();

  // מציאת הבין שבו נמצא המשתמש
  const getUserBin = () => {
    return histogramData.find(bin => 
      userResults.slq >= bin.min && userResults.slq < bin.max
    ) || histogramData[histogramData.length - 1];
  };

  const userBin = getUserBin();

  return (
    <div className="space-y-4 px-2 sm:px-0">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg sm:text-xl">התפלגות ציוני SLQ</CardTitle>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <div className={`${isMobile ? 'h-64' : 'h-80'} w-full`}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={histogramData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="range" 
                  fontSize={isMobile ? 10 : 12}
                  angle={isMobile ? -45 : 0}
                  textAnchor={isMobile ? "end" : "middle"}
                  height={isMobile ? 60 : 30}
                />
                <YAxis fontSize={isMobile ? 10 : 12} />
                <Tooltip 
                  formatter={(value, name) => [value, 'מספר משתתפים']}
                  labelFormatter={(label) => `טווח: ${label}`}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {histogramData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry === userBin ? "#dc2626" : "#0369a1"} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-2 text-center px-2">
            העמודה האדומה מציינת את הטווח שלך ({userResults.slq})
          </p>
        </CardContent>
      </Card>

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

      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {dimensionData.map((dim, index) => (
          <Card key={index} className="shadow-sm">
            <CardHeader className="pb-2 px-4">
              <CardTitle className="text-base sm:text-lg leading-tight">{dim.dimension}</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-gray-600">הציון שלך:</span>
                  <span className="font-bold text-salima-600 text-sm sm:text-base">{dim.userScore}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-gray-600">ממוצע כללי:</span>
                  <span className="font-medium text-sm sm:text-base">{dim.average}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-gray-600">הפרש:</span>
                  <span className={`font-medium text-sm sm:text-base ${dim.difference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {dim.difference > 0 ? '+' : ''}{dim.difference}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StatisticsCharts;
