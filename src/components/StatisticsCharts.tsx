
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, Cell } from "recharts";
import { SurveyResult } from "@/lib/types";

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

  // הכנת נתונים להשוואת ממדים
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
  const dimensionData = createDimensionComparison();

  // מציאת הבין שבו נמצא המשתמש
  const getUserBin = () => {
    return histogramData.find(bin => 
      userResults.slq >= bin.min && userResults.slq < bin.max
    ) || histogramData[histogramData.length - 1];
  };

  const userBin = getUserBin();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>התפלגות ציוני SLQ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={histogramData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
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
          <p className="text-sm text-gray-600 mt-2 text-center">
            העמודה האדומה מציינת את הטווח שלך ({userResults.slq})
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>השוואת ממדים לממוצע</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dimensionData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 5]} />
                <YAxis dataKey="dimension" type="category" width={100} />
                <Tooltip 
                  formatter={(value, name) => [
                    value, 
                    name === 'average' ? 'ממוצע כללי' : 
                    name === 'userScore' ? 'הציון שלך' : 'הפרש'
                  ]}
                />
                <Bar dataKey="average" fill="#94a3b8" name="ממוצע כללי" />
                <Bar dataKey="userScore" fill="#0369a1" name="הציון שלך" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {dimensionData.map((dim, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{dim.dimension}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">הציון שלך:</span>
                  <span className="font-bold text-salima-600">{dim.userScore}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">ממוצע כללי:</span>
                  <span className="font-medium">{dim.average}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">הפרש:</span>
                  <span className={`font-medium ${dim.difference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
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
