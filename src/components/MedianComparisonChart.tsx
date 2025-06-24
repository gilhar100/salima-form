
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
    .sort((a, b) => b.score - a.score); // Descending order (highest to lowest)

  const belowMedian = dimensions
    .filter(d => d.score < medianScore)
    .sort((a, b) => b.score - a.score); // Descending order for consistency

  const atMedian = dimensions.filter(d => d.score === medianScore);

  // Calculate bar lengths based on distance from median
  const maxDistance = Math.max(
    ...dimensions.map(d => Math.abs(d.score - medianScore))
  );

  const getBarLength = (score: number) => {
    if (maxDistance === 0) return 0;
    const distance = Math.abs(score - medianScore);
    return Math.min((distance / maxDistance) * 100, 100);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-xl font-bold mb-2 text-center text-gray-800">
        ממדי SALIMA ביחס לציון הממוצע האישי
      </h3>
      
      {/* Display personal average at the top */}
      <div className="text-center mb-8">
        <div className="inline-block bg-orange-100 rounded-lg px-4 py-2">
          <span className="text-orange-700 font-semibold">
            ממוצע אישי: {medianScore.toFixed(2)}
          </span>
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Above median dimensions */}
        {aboveMedian.map((dimension) => {
          const hebrewName = dimensionNames[dimension.dimension as keyof typeof dimensionNames] || dimension.title;
          const barLength = getBarLength(dimension.score);
          
          return (
            <div key={dimension.dimension} className="flex items-center gap-4">
              {/* Dimension label on the right */}
              <div className="w-20 text-right">
                <span 
                  className="font-medium text-sm"
                  style={{ color: getParameterColor(dimension.dimension) }}
                >
                  {hebrewName}
                </span>
              </div>
              
              {/* Left spacer for below-median side */}
              <div className="flex-1 flex justify-end">
                <div className="w-32" />
              </div>
              
              {/* Center line */}
              <div className="w-1 h-6 bg-orange-400 rounded" />
              
              {/* Right bar for above-median */}
              <div className="flex-1 flex justify-start">
                <div 
                  className="h-6 rounded-r-md transition-all duration-300"
                  style={{ 
                    backgroundColor: getParameterColor(dimension.dimension),
                    width: `${Math.max(barLength, 10)}%`,
                    maxWidth: '128px'
                  }}
                />
              </div>
              
              {/* Status indicator */}
              <div className="w-24 text-right">
                <span className="text-xs text-green-600 font-medium">
                  מעל הממוצע
                </span>
              </div>
            </div>
          );
        })}

        {/* At median dimensions */}
        {atMedian.map((dimension) => {
          const hebrewName = dimensionNames[dimension.dimension as keyof typeof dimensionNames] || dimension.title;
          
          return (
            <div key={dimension.dimension} className="flex items-center gap-4">
              {/* Dimension label on the right */}
              <div className="w-20 text-right">
                <span 
                  className="font-medium text-sm"
                  style={{ color: getParameterColor(dimension.dimension) }}
                >
                  {hebrewName}
                </span>
              </div>
              
              {/* Left spacer */}
              <div className="flex-1 flex justify-end">
                <div className="w-32" />
              </div>
              
              {/* Center indicator */}
              <div className="flex items-center justify-center">
                <div 
                  className="w-6 h-6 rounded-full border-2"
                  style={{ 
                    backgroundColor: getParameterColor(dimension.dimension),
                    borderColor: '#f97316'
                  }}
                />
              </div>
              
              {/* Right spacer */}
              <div className="flex-1 flex justify-start">
                <div className="w-32" />
              </div>
              
              {/* Status indicator */}
              <div className="w-24 text-right">
                <span className="text-xs text-orange-600 font-medium">
                  בממוצע
                </span>
              </div>
            </div>
          );
        })}

        {/* Below median dimensions */}
        {belowMedian.map((dimension) => {
          const hebrewName = dimensionNames[dimension.dimension as keyof typeof dimensionNames] || dimension.title;
          const barLength = getBarLength(dimension.score);
          
          return (
            <div key={dimension.dimension} className="flex items-center gap-4">
              {/* Dimension label on the right */}
              <div className="w-20 text-right">
                <span 
                  className="font-medium text-sm"
                  style={{ color: getParameterColor(dimension.dimension) }}
                >
                  {hebrewName}
                </span>
              </div>
              
              {/* Left bar for below-median */}
              <div className="flex-1 flex justify-end">
                <div 
                  className="h-6 rounded-l-md transition-all duration-300"
                  style={{ 
                    backgroundColor: getParameterColor(dimension.dimension),
                    width: `${Math.max(barLength, 10)}%`,
                    maxWidth: '128px'
                  }}
                />
              </div>
              
              {/* Center line */}
              <div className="w-1 h-6 bg-orange-400 rounded" />
              
              {/* Right spacer for above-median side */}
              <div className="flex-1 flex justify-start">
                <div className="w-32" />
              </div>
              
              {/* Status indicator */}
              <div className="w-24 text-right">
                <span className="text-xs text-orange-600 font-medium">
                  מתחת לממוצע
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom legend */}
      <div className="flex justify-center items-center gap-8 mt-8 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-4 h-3 bg-gray-400 rounded-l-md" />
          <span className="text-xs text-gray-600">מתחת לממוצע</span>
        </div>
        <div className="w-1 h-4 bg-orange-400 rounded" />
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600">מעל הממוצע</span>
          <div className="w-4 h-3 bg-gray-400 rounded-r-md" />
        </div>
      </div>
    </div>
  );
};

export default MedianComparisonChart;
