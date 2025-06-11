
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";

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

interface SlqHistogramChartProps {
  statistics: SurveyResponse[];
  userSlqScore: number;
}

const SlqHistogramChart: React.FC<SlqHistogramChartProps> = ({ statistics, userSlqScore }) => {
  const isMobile = useIsMobile();

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

  const getUserBin = (histogramData: any[]) => {
    return histogramData.find(bin => 
      userSlqScore >= bin.min && userSlqScore < bin.max
    ) || histogramData[histogramData.length - 1];
  };

  const histogramData = createHistogramData();
  const userBin = getUserBin(histogramData);

  return (
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
          העמודה האדומה מציינת את הטווח שלך ({userSlqScore})
        </p>
      </CardContent>
    </Card>
  );
};

export default SlqHistogramChart;
