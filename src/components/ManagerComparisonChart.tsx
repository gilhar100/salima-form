
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";

interface ManagerData {
  slq_score: number;
  dimension_s: number;
  dimension_l: number;
  dimension_i: number;
  dimension_m: number;
  dimension_a: number;
  dimension_a2: number;
  user_name: string;
  created_at: string;
}

interface ColleagueData {
  slq_score: number;
  dimension_s: number;
  dimension_l: number;
  dimension_i: number;
  dimension_m: number;
  dimension_a: number;
  dimension_a2: number;
  manager_name: string;
  evaluator_name: string;
  created_at: string;
}

interface ManagerComparisonChartProps {
  managerData: ManagerData[];
  colleagueData: ColleagueData[];
  managerName: string;
}

const ManagerComparisonChart: React.FC<ManagerComparisonChartProps> = ({ 
  managerData, 
  colleagueData, 
  managerName 
}) => {
  const isMobile = useIsMobile();

  // חישוב ממוצעים
  const managerAvg = managerData.length > 0 ? {
    S: managerData.reduce((sum, d) => sum + d.dimension_s, 0) / managerData.length,
    L: managerData.reduce((sum, d) => sum + d.dimension_l, 0) / managerData.length,
    I: managerData.reduce((sum, d) => sum + d.dimension_i, 0) / managerData.length,
    M: managerData.reduce((sum, d) => sum + d.dimension_m, 0) / managerData.length,
    A: managerData.reduce((sum, d) => sum + d.dimension_a, 0) / managerData.length,
    A2: managerData.reduce((sum, d) => sum + d.dimension_a2, 0) / managerData.length,
    SLQ: managerData.reduce((sum, d) => sum + d.slq_score, 0) / managerData.length,
  } : null;

  const colleagueAvg = colleagueData.length > 0 ? {
    S: colleagueData.reduce((sum, d) => sum + d.dimension_s, 0) / colleagueData.length,
    L: colleagueData.reduce((sum, d) => sum + d.dimension_l, 0) / colleagueData.length,
    I: colleagueData.reduce((sum, d) => sum + d.dimension_i, 0) / colleagueData.length,
    M: colleagueData.reduce((sum, d) => sum + d.dimension_m, 0) / colleagueData.length,
    A: colleagueData.reduce((sum, d) => sum + d.dimension_a, 0) / colleagueData.length,
    A2: colleagueData.reduce((sum, d) => sum + d.dimension_a2, 0) / colleagueData.length,
    SLQ: colleagueData.reduce((sum, d) => sum + d.slq_score, 0) / colleagueData.length,
  } : null;

  // הכנת נתונים לגרף
  const chartData = [
    { dimension: 'S - אסטרטגיה', manager: managerAvg?.S || 0, colleagues: colleagueAvg?.S || 0 },
    { dimension: 'L - מנהיגות', manager: managerAvg?.L || 0, colleagues: colleagueAvg?.L || 0 },
    { dimension: 'I - חדשנות', manager: managerAvg?.I || 0, colleagues: colleagueAvg?.I || 0 },
    { dimension: 'M - ניהול', manager: managerAvg?.M || 0, colleagues: colleagueAvg?.M || 0 },
    { dimension: 'A - הסתגלות', manager: managerAvg?.A || 0, colleagues: colleagueAvg?.A || 0 },
    { dimension: 'A2 - הסתגלות 2', manager: managerAvg?.A2 || 0, colleagues: colleagueAvg?.A2 || 0 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">
          השוואה: {managerName} - דירוג עצמי מול דירוג עמיתים
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600">מספר הערכות עצמיות</p>
              <p className="text-2xl font-bold text-blue-600">{managerData.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">מספר הערכות עמיתים</p>
              <p className="text-2xl font-bold text-green-600">{colleagueData.length}</p>
            </div>
          </div>

          <div className={`${isMobile ? 'h-80' : 'h-96'} w-full`}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={chartData} 
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="dimension" 
                  fontSize={isMobile ? 10 : 12}
                  angle={isMobile ? -45 : 0}
                  textAnchor={isMobile ? "end" : "middle"}
                  height={isMobile ? 80 : 50}
                />
                <YAxis domain={[0, 5]} fontSize={isMobile ? 10 : 12} />
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    value.toFixed(2), 
                    name === 'manager' ? 'דירוג עצמי' : 'דירוג עמיתים'
                  ]}
                />
                <Legend />
                <Bar dataKey="manager" fill="#3b82f6" name="דירוג עצמי" />
                <Bar dataKey="colleagues" fill="#10b981" name="דירוג עמיתים" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {managerAvg && colleagueAvg && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">ציון SLQ כולל</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600">דירוג עצמי</p>
                  <p className="text-xl font-bold text-blue-600">{managerAvg.SLQ.toFixed(2)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">דירוג עמיתים</p>
                  <p className="text-xl font-bold text-green-600">{colleagueAvg.SLQ.toFixed(2)}</p>
                </div>
              </div>
              <div className="text-center mt-2">
                <p className="text-sm text-gray-600">הפרש</p>
                <p className={`text-lg font-semibold ${
                  (managerAvg.SLQ - colleagueAvg.SLQ) > 0 ? 'text-blue-600' : 'text-red-600'
                }`}>
                  {(managerAvg.SLQ - colleagueAvg.SLQ > 0 ? '+' : '')}
                  {(managerAvg.SLQ - colleagueAvg.SLQ).toFixed(2)}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ManagerComparisonChart;
