
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Dot } from 'recharts';
import { useIsMobile } from "@/hooks/use-mobile";

interface BellCurveVisualizationProps {
  userScore: number;
  title?: string;
}

const BellCurveVisualization: React.FC<BellCurveVisualizationProps> = ({ 
  userScore, 
  title = "מיקום הציון שלך" 
}) => {
  const isMobile = useIsMobile();
  
  // Generate bell curve data points
  const generateBellCurveData = () => {
    const data = [];
    const mean = 3; // Center of the bell curve
    const stdDev = 0.8; // Standard deviation for a nice curve shape
    
    for (let x = 1; x <= 5; x += 0.1) {
      const y = Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2)) / (stdDev * Math.sqrt(2 * Math.PI));
      data.push({
        score: Number(x.toFixed(1)),
        frequency: Number((y * 100).toFixed(2)) // Scale for better visualization
      });
    }
    return data;
  };

  const bellCurveData = generateBellCurveData();

  // Find the closest data point to user's score for marker positioning
  const userDataPoint = bellCurveData.reduce((prev, curr) => 
    Math.abs(curr.score - userScore) < Math.abs(prev.score - userScore) ? curr : prev
  );

  // Custom dot component for the user marker
  const UserMarker = (props: any) => {
    const { cx, cy } = props;
    if (Math.abs(props.payload.score - userScore) < 0.05) {
      return (
        <g>
          <circle cx={cx} cy={cy} r={isMobile ? 4 : 6} fill="#dc2626" stroke="#fff" strokeWidth={2} />
          <circle cx={cx} cy={cy} r={isMobile ? 2 : 3} fill="#fff" />
        </g>
      );
    }
    return null;
  };

  const getPositionDescription = (score: number) => {
    if (score >= 4.5) return "ציון יוצא דופן";
    if (score >= 4.0) return "ציון גבוה מאוד";
    if (score >= 3.5) return "ציון מעל הממוצע";
    if (score >= 2.5) return "ציון סביב הממוצע";
    if (score >= 2.0) return "ציון מתחת לממוצע";
    return "ציון הדורש פיתוח";
  };

  return (
    <Card className="text-center w-full">
      <CardHeader className="pb-2 sm:pb-3 px-4 sm:px-6">
        <CardTitle className="text-base sm:text-lg lg:text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 px-4 sm:px-6">
        <div className="w-full h-48 sm:h-56 lg:h-64 mb-3 sm:mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={bellCurveData} 
              margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
            >
              <XAxis 
                dataKey="score" 
                domain={[1, 5]}
                type="number"
                scale="linear"
                tickFormatter={(value) => value.toFixed(1)}
                fontSize={isMobile ? 10 : 12}
                axisLine={true}
                tickLine={true}
              />
              <YAxis hide />
              <Line
                type="monotone"
                dataKey="frequency"
                stroke="#94a3b8"
                strokeWidth={isMobile ? 2 : 3}
                dot={false}
                activeDot={false}
              />
              <Line
                type="monotone"
                dataKey="frequency"
                stroke="transparent"
                dot={<UserMarker />}
                activeDot={false}
              />
              <ReferenceLine 
                x={3} 
                stroke="#cbd5e1" 
                strokeDasharray="2 2" 
                label={{ 
                  value: "ממוצע", 
                  position: "top", 
                  fontSize: isMobile ? 8 : 10 
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="space-y-2">
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-salima-600">{userScore}</p>
          <p className="text-sm sm:text-base text-gray-600">{getPositionDescription(userScore)}</p>
          <div className="flex items-center justify-center gap-2 mt-2 sm:mt-3">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-600 rounded-full"></div>
            <span className="text-xs sm:text-sm text-gray-600">המיקום שלך</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BellCurveVisualization;
