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
  const userDataPoint = bellCurveData.reduce((prev, curr) => Math.abs(curr.score - userScore) < Math.abs(prev.score - userScore) ? curr : prev);

  // Custom dot component for the user marker
  const UserMarker = (props: any) => {
    const {
      cx,
      cy
    } = props;
    if (Math.abs(props.payload.score - userScore) < 0.05) {
      return <g>
          <circle cx={cx} cy={cy} r={isMobile ? 4 : 6} fill="#dc2626" stroke="#fff" strokeWidth={2} />
          <circle cx={cx} cy={cy} r={isMobile ? 2 : 3} fill="#fff" />
        </g>;
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
  return <Card className="text-center w-full">
      
      
    </Card>;
};
export default BellCurveVisualization;