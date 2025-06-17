
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
    .sort((a, b) => b.score - a.score); // Descending order (highest to lowest)

  const atMedian = dimensions.filter(d => d.score === medianScore);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-xl font-bold mb-8 text-center text-gray-800">
        ממדי SALIMA ביחס לציון הממוצע האישי
      </h3>
      
      <div className="flex items-center justify-center min-h-[300px]">
        {/* Left Side - Below Median */}
        <div className="flex-1 flex flex-col items-end pr-8 space-y-4">
          <div className="text-sm font-medium text-gray-500 mb-2">מתחת לממוצע</div>
          {belowMedian.map((dimension, index) => {
            const hebrewName = dimensionNames[dimension.dimension as keyof typeof dimensionNames] || dimension.title;
            const distance = Math.abs(dimension.score - medianScore);
            const marginRight = Math.min(distance * 20, 60); // Visual spacing based on distance
            
            return (
              <div 
                key={dimension.dimension}
                className="flex items-center gap-2"
                style={{ marginRight: `${marginRight}px` }}
              >
                <span 
                  className="font-medium text-lg"
                  style={{ color: getParameterColor(dimension.dimension) }}
                >
                  {hebrewName}
                </span>
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getParameterColor(dimension.dimension) }}
                />
              </div>
            );
          })}
        </div>

        {/* Center - Median Score */}
        <div className="flex flex-col items-center px-6">
          <div className="w-20 h-20 rounded-full bg-orange-400 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">
              {medianScore.toFixed(2)}
            </span>
          </div>
          <div className="text-sm font-medium text-orange-600 mt-2">
            ממוצע אישי
          </div>
          
          {/* Parameters exactly at median */}
          {atMedian.length > 0 && (
            <div className="mt-4 space-y-2">
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
        <div className="flex-1 flex flex-col items-start pl-8 space-y-4">
          <div className="text-sm font-medium text-gray-500 mb-2">מעל הממוצע</div>
          {aboveMedian.map((dimension, index) => {
            const hebrewName = dimensionNames[dimension.dimension as keyof typeof dimensionNames] || dimension.title;
            const distance = Math.abs(dimension.score - medianScore);
            const marginLeft = Math.min(distance * 20, 60); // Visual spacing based on distance
            
            return (
              <div 
                key={dimension.dimension}
                className="flex items-center gap-2"
                style={{ marginLeft: `${marginLeft}px` }}
              >
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getParameterColor(dimension.dimension) }}
                />
                <span 
                  className="font-medium text-lg"
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
