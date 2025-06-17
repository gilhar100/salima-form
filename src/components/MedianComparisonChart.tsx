
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Tooltip } from 'recharts';
import { SurveyResult } from '@/lib/types';

interface MedianComparisonChartProps {
  result: SurveyResult;
}

const MedianComparisonChart: React.FC<MedianComparisonChartProps> = ({ result }) => {
  // Calculate median score across all dimensions
  const scores = Object.values(result.dimensions).map(d => d.score);
  const medianScore = scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)];

  // Prepare data for chart
  const chartData = Object.values(result.dimensions).map(dimension => ({
    name: dimension.dimension,
    title: dimension.title,
    score: dimension.score,
    aboveMedian: dimension.score > medianScore,
    color: getParameterColor(dimension.dimension)
  }));

  function getParameterColor(dimension: string) {
    const colors = {
      'S': '#3b82f6', // Blue
      'A': '#10b981', // Emerald
      'L': '#f59e0b', // Amber
      'I': '#ef4444', // Red
      'M': '#8b5cf6', // Violet
      'A2': '#ec4899' // Pink
    };
    return colors[dimension as keyof typeof colors] || '#6b7280';
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-800">{data.title}</p>
          <p className="text-sm text-gray-600">
            ציון: <span className="font-medium">{data.score.toFixed(1)}</span>
          </p>
          <p className="text-xs text-gray-500">
            {data.aboveMedian ? 'מעל החציון' : 'מתחת לחציון'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border">
      <h3 className="text-lg font-semibold mb-4 text-center text-gray-800">
        התפלגות מדדים ביחס לציון החציוני האישי
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <XAxis 
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <YAxis 
              domain={[0, 5]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine 
              y={medianScore} 
              stroke="#374151" 
              strokeDasharray="5 5"
              strokeWidth={2}
              label={{ 
                value: `חציון: ${medianScore.toFixed(1)}`, 
                position: "insideTopRight",
                style: { fontSize: '12px', fill: '#374151' }
              }}
            />
            <Bar 
              dataKey="score" 
              radius={[4, 4, 0, 0]}
              fill={(entry) => entry.color}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex justify-center gap-6 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span>מעל החציון</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span>מתחת לחציון</span>
        </div>
      </div>
    </div>
  );
};

export default MedianComparisonChart;
