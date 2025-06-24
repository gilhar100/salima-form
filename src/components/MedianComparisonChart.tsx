
import React from 'react';
import { SurveyResult } from '@/lib/types';
import { dimensionColors } from './ResultsRadar';

interface MedianComparisonChartProps {
  result: SurveyResult;
}

const MedianComparisonChart: React.FC<MedianComparisonChartProps> = ({ result }) => {
  // Use the SLQ score as the median reference point
  const medianScore = result.slq;

  // Get all dimensions with their Hebrew names - FIXED TERMINOLOGY
  const dimensionNames = {
    strategic: 'אסטרטגי',
    adaptive: 'אדפטיביות', // CORRECTED from הסתגלות
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
    .sort((a, b) => b.score - a.score);

  const belowMedian = dimensions
    .filter(d => d.score < medianScore)
    .sort((a, b) => a.score - b.score); // Sort ascending for better visual flow

  const atMedian = dimensions.filter(d => d.score === medianScore);

  // Calculate bar lengths based on distance from median
  const maxDistance = Math.max(
    ...dimensions.map(d => Math.abs(d.score - medianScore))
  );

  const getBarLength = (score: number) => {
    if (maxDistance === 0) return 0;
    const distance = Math.abs(score - medianScore);
    // Use a minimum bar length for visibility and scale up to 60% max width
    return Math.max((distance / maxDistance) * 60, 8);
  };

  const allDimensionsData = [
    ...aboveMedian.map(d => ({ ...d, position: 'above' as const })),
    ...atMedian.map(d => ({ ...d, position: 'at' as const })),
    ...belowMedian.map(d => ({ ...d, position: 'below' as const }))
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-xl font-bold mb-6 text-center text-gray-800">
        ממדי SALIMA ביחס לציון הממוצע האישי
      </h3>
      
      {/* Display personal average at the top */}
      <div className="text-center mb-8">
        <div className="inline-block bg-orange-100 rounded-lg px-4 py-2">
          <span className="text-orange-700 font-semibold" style={{ fontSize: '16px' }}>
            ממוצע אישי: {medianScore.toFixed(1)}
          </span>
        </div>
      </div>
      
      <div className="space-y-4">
        {allDimensionsData.map((dimension) => {
          const hebrewName = dimensionNames[dimension.dimension as keyof typeof dimensionNames] || dimension.title;
          const barLength = getBarLength(dimension.score);
          const color = getParameterColor(dimension.dimension);
          
          return (
            <div key={dimension.dimension} className="flex items-center gap-2">
              {/* Left side for below median bars */}
              <div className="flex-1 flex justify-end items-center">
                {dimension.position === 'below' && (
                  <div 
                    className="h-8 rounded-l-md transition-all duration-300"
                    style={{ 
                      backgroundColor: color,
                      width: `${barLength}%`,
                      minWidth: '20px'
                    }}
                  />
                )}
              </div>
              
              {/* Center line */}
              <div className="w-px h-12 bg-orange-400" />
              
              {/* Right side for above median bars */}
              <div className="flex-1 flex justify-start items-center">
                {dimension.position === 'above' && (
                  <div 
                    className="h-8 rounded-r-md transition-all duration-300"
                    style={{ 
                      backgroundColor: color,
                      width: `${barLength}%`,
                      minWidth: '20px'
                    }}
                  />
                )}
                {dimension.position === 'at' && (
                  <div 
                    className="w-4 h-4 rounded-full border-2 border-orange-400"
                    style={{ backgroundColor: color }}
                  />
                )}
              </div>
              
              {/* Dimension label on the right */}
              <div className="w-24 text-right">
                <span 
                  className="font-medium"
                  style={{ 
                    color: color,
                    fontSize: '16px'
                  }}
                >
                  {hebrewName}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MedianComparisonChart;
