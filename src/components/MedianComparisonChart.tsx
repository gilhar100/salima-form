
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

  function getParameterColor(dimension: string) {
    const colors = dimensionColors[dimension as keyof typeof dimensionColors];
    return colors?.primary || '#4F46E5';
  }

  // Separate dimensions above and below median
  const aboveMedian = dimensions
    .filter(d => d.score > medianScore)
    .sort((a, b) => a.score - b.score); // Ascending order (lowest to highest)

  const belowMedian = dimensions
    .filter(d => d.score < medianScore)
    .sort((a, b) => a.score - b.score); // Ascending order for left side too

  const atMedian = dimensions.filter(d => d.score === medianScore);

  // Calculate bar lengths based on distance from median
  const maxDistance = Math.max(
    ...dimensions.map(d => Math.abs(d.score - medianScore))
  );

  const getBarLength = (score: number) => {
    const distance = Math.abs(score - medianScore);
    return Math.min((distance / maxDistance) * 100, 100);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-xl font-bold mb-8 text-center text-gray-800">
        ממדי SALIMA ביחס לציון הממוצע האישי
      </h3>
      
      <div className="flex items-center justify-center min-h-[300px]">
        {/* Left Side - Below Median */}
        <div className="flex-1 flex flex-col items-end pr-8 space-y-3">
          <div className="text-sm font-medium text-gray-500 mb-4">מתחת לממוצע</div>
          {belowMedian.map((dimension) => {
            const hebrewName = dimensionNames[dimension.dimension as keyof typeof dimensionNames] || dimension.title;
            const barLength = getBarLength(dimension.score);
            
            return (
              <div key={dimension.dimension} className="flex items-center gap-3 w-full">
                <span 
                  className="font-medium text-base whitespace-nowrap min-w-[80px] text-right"
                  style={{ color: getParameterColor(dimension.dimension) }}
                >
                  {hebrewName}
                </span>
                <div className="flex-1 flex justify-end">
                  <div 
                    className="h-6 rounded-l-md"
                    style={{ 
                      backgroundColor: getParameterColor(dimension.dimension),
                      width: `${barLength}%`,
                      maxWidth: '120px'
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Center - Median Score */}
        <div className="flex flex-col items-center px-6">
          <div className="w-1 h-32 bg-gray-400 relative">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">
                  {medianScore.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="text-xs font-medium text-orange-600 whitespace-nowrap">
                ממוצע אישי
              </div>
            </div>
          </div>
          
          {/* Parameters exactly at median */}
          {atMedian.length > 0 && (
            <div className="mt-8 space-y-2">
              {atMedian.map((dimension) => {
                const hebrewName = dimensionNames[dimension.dimension as keyof typeof dimensionNames] || dimension.title;
                return (
                  <div key={dimension.dimension} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getParameterColor(dimension.dimension) }}
                    />
                    <span 
                      className="font-medium text-sm"
                      style={{ color: getParameterColor(dimension.dimension) }}
                    >
                      {hebrewName}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Side - Above Median */}
        <div className="flex-1 flex flex-col items-start pl-8 space-y-3">
          <div className="text-sm font-medium text-gray-500 mb-4">מעל הממוצע</div>
          {aboveMedian.map((dimension) => {
            const hebrewName = dimensionNames[dimension.dimension as keyof typeof dimensionNames] || dimension.title;
            const barLength = getBarLength(dimension.score);
            
            return (
              <div key={dimension.dimension} className="flex items-center gap-3 w-full">
                <div className="flex-1 flex justify-start">
                  <div 
                    className="h-6 rounded-r-md"
                    style={{ 
                      backgroundColor: getParameterColor(dimension.dimension),
                      width: `${barLength}%`,
                      maxWidth: '120px'
                    }}
                  />
                </div>
                <span 
                  className="font-medium text-base whitespace-nowrap min-w-[80px] text-left"
                  style={{ color: getParameterColor(dimension.dimension) }}
                >
                  {hebrewName}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom indicators */}
      <div className="flex justify-between text-xs text-gray-500 mt-6 px-8">
        <span>ציונים נמוכים יותר</span>
        <span>ציונים גבוהים יותר</span>
      </div>
    </div>
  );
};

export default MedianComparisonChart;
