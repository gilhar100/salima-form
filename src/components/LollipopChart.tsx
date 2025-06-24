
import React from 'react';
import { SurveyResult } from '@/lib/types';

interface LollipopChartProps {
  result: SurveyResult;
}

const LollipopChart: React.FC<LollipopChartProps> = ({ result }) => {
  const personalAverage = result.slq;

  // SALIMA color palette
  const dimensionColors = {
    'S': '#0072B2', // אסטרטגיה
    'A': '#E69F00', // אדפטיביות
    'L': '#009E73', // למידה
    'I': '#D55E00', // השראה
    'M': '#CC79A7', // משמעות
    'A2': '#F0E442' // אותנטיות
  };

  // Dimension names in Hebrew
  const dimensionNames = {
    'S': 'אסטרטגיה',
    'A': 'אדפטיביות',
    'L': 'למידה',
    'I': 'השראה',
    'M': 'משמעות',
    'A2': 'אותנטיות'
  };

  const dimensions = Object.values(result.dimensions);
  
  // Calculate maximum distance from center for scaling
  const maxDistance = Math.max(
    ...dimensions.map(d => Math.abs(d.score - personalAverage))
  );

  const getLineLength = (score: number) => {
    if (maxDistance === 0) return 0;
    const distance = Math.abs(score - personalAverage);
    return Math.min((distance / maxDistance) * 120, 120); // Max 120px
  };

  const getDirection = (score: number) => {
    return score >= personalAverage ? 'right' : 'left';
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-xl font-bold mb-2 text-center text-black">
        ממדי SALIMA ביחס לציון הממוצע האישי
      </h3>
      
      {/* Display personal average at the top */}
      <div className="text-center mb-8">
        <div className="inline-block bg-orange-100 rounded-lg px-4 py-2">
          <span className="text-orange-700 font-semibold">
            ממוצע אישי: {personalAverage.toFixed(2)}
          </span>
        </div>
      </div>
      
      <div className="space-y-6">
        {dimensions.map((dimension) => {
          const color = dimensionColors[dimension.dimension as keyof typeof dimensionColors];
          const hebrewName = dimensionNames[dimension.dimension as keyof typeof dimensionNames];
          const lineLength = getLineLength(dimension.score);
          const direction = getDirection(dimension.score);
          
          return (
            <div key={dimension.dimension} className="flex items-center justify-center gap-4">
              {/* Right side label */}
              <div className="w-24 text-right">
                <span className="font-medium text-sm text-black">
                  {hebrewName}
                </span>
              </div>
              
              {/* Left side for below-average */}
              <div className="flex-1 flex justify-end items-center">
                {direction === 'left' && (
                  <div className="flex items-center">
                    <div 
                      className="h-0.5 rounded-l-full"
                      style={{ 
                        backgroundColor: color,
                        width: `${lineLength}px`
                      }}
                    />
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  </div>
                )}
              </div>
              
              {/* Center vertical line */}
              <div className="w-0.5 h-8 bg-orange-400 rounded" />
              
              {/* Right side for above-average */}
              <div className="flex-1 flex justify-start items-center">
                {direction === 'right' && (
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <div 
                      className="h-0.5 rounded-r-full"
                      style={{ 
                        backgroundColor: color,
                        width: `${lineLength}px`
                      }}
                    />
                  </div>
                )}
              </div>
              
              {/* Status indicator */}
              <div className="w-20 text-right">
                <span className="text-xs text-gray-600">
                  {direction === 'right' ? 'מעל הממוצע' : 'מתחת לממוצע'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LollipopChart;
