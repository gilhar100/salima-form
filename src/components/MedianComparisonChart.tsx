
import React from 'react';
import { SurveyResult } from '@/lib/types';
import { dimensionColors } from './ResultsRadar';

interface MedianComparisonChartProps {
  result: SurveyResult;
}

const MedianComparisonChart: React.FC<MedianComparisonChartProps> = ({ result }) => {
  // Use the SLQ score as the median reference point
  const medianScore = result.slq;

  // Get all dimensions with their Hebrew names
  const dimensionNames = {
    strategic: 'אסטרטגי',
    adaptive: 'אדפטיבי', 
    learning: 'לומד',
    inspiring: 'השראה',
    meaningful: 'משמעות',
    authentic: 'אותנטיות'
  };

  const dimensions = Object.values(result.dimensions);

  // Sort dimensions by score relative to median
  const sortedDimensions = [...dimensions].sort((a, b) => a.score - b.score);

  function getParameterColor(dimension: string) {
    const colors = dimensionColors[dimension as keyof typeof dimensionColors];
    return colors?.primary || '#4F46E5';
  }

  // Calculate the maximum height for scaling
  const maxScore = Math.max(...dimensions.map(d => d.score), 5);
  const chartHeight = 300;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-xl font-bold mb-6 text-center text-gray-800">
        ממדי SALIMA ביחס לציון הממוצע האישי
      </h3>
      
      <div className="relative" style={{ height: chartHeight + 80 }}>
        {/* Y-axis scale */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-sm text-gray-600">
          <span>5</span>
          <span>4</span>
          <span>3</span>
          <span>2</span>
          <span>1</span>
          <span>0</span>
        </div>

        {/* Chart area */}
        <div className="ml-8 relative" style={{ height: chartHeight }}>
          {/* Median line */}
          <div 
            className="absolute w-full border-t-2 border-orange-400 border-dashed"
            style={{ 
              bottom: `${(medianScore / maxScore) * chartHeight}px`,
            }}
          >
            <span className="absolute right-0 -top-6 text-sm font-medium text-orange-600">
              ממוצע: {medianScore.toFixed(2)}
            </span>
          </div>

          {/* Bars container */}
          <div className="flex items-end justify-between h-full gap-2">
            {sortedDimensions.map((dimension, index) => {
              const barHeight = (dimension.score / maxScore) * chartHeight;
              const hebrewName = dimensionNames[dimension.dimension as keyof typeof dimensionNames] || dimension.title;
              
              return (
                <div key={dimension.dimension} className="flex flex-col items-center flex-1">
                  {/* Score value above bar */}
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    {dimension.score.toFixed(2)}
                  </div>
                  
                  {/* Bar */}
                  <div 
                    className="w-full rounded-t-md relative"
                    style={{ 
                      height: `${barHeight}px`,
                      backgroundColor: getParameterColor(dimension.dimension),
                      minWidth: '60px',
                      maxWidth: '80px'
                    }}
                  />
                  
                  {/* Dimension label */}
                  <div className="text-sm font-medium text-gray-800 mt-2 text-center">
                    {hebrewName}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center items-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-400"></div>
            <span className="text-sm text-gray-600">ממוצע קולטות</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500"></div>
            <span className="text-sm text-gray-600">הערכה עצמית</span>
          </div>
        </div>

        {/* Below/Above median indicators */}
        <div className="flex justify-between text-sm text-gray-600 mt-4">
          <span>מתחת לממוצע</span>
          <span>מעל הממוצע</span>
        </div>
      </div>
    </div>
  );
};

export default MedianComparisonChart;
