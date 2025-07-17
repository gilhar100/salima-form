
import React from 'react';
import { SurveyResult } from '@/lib/types';
import { dimensionColors, dimensionNames } from './diverging-chart/constants';

interface LollipopChartProps {
  result: SurveyResult;
}

const LollipopChart: React.FC<LollipopChartProps> = ({ result }) => {
  const personalAverage = result.slq;

  // Primary colors for each dimension
  const primaryColors = {
    'S': dimensionColors.S.strong,
    'A': dimensionColors.A.strong,
    'L': dimensionColors.L.strong,
    'I': dimensionColors.I.strong,
    'M': dimensionColors.M.strong,
    'A2': dimensionColors.A2.strong
  };

  const dimensions = Object.values(result.dimensions);
  
  // Calculate the height of each stick based on score (0-5 scale)
  const getStickHeight = (score: number) => {
    return Math.max(20, (score / 5) * 180); // Min 20px, max 180px
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-xl font-bold mb-2 text-center text-black">
        ממדי SALIMA
      </h3>
      
      {/* Display personal average at the top */}
      <div className="text-center mb-8">
        <div className="inline-block bg-orange-100 rounded-lg px-4 py-2">
          <span className="text-orange-700 font-semibold">
            ממוצע אישי: {personalAverage.toFixed(2)}
          </span>
        </div>
      </div>
      
      {/* Vertical lollipop chart */}
      <div className="flex items-end justify-center gap-8 mb-6" style={{ height: '220px' }}>
        {dimensions.map((dimension) => {
          const color = primaryColors[dimension.dimension as keyof typeof primaryColors];
          const hebrewName = dimensionNames[dimension.dimension as keyof typeof dimensionNames];
          const stickHeight = getStickHeight(dimension.score);
          
          return (
            <div key={dimension.dimension} className="flex flex-col items-center">
              {/* Colored dot at top */}
              <div 
                className="w-4 h-4 rounded-full mb-1"
                style={{ backgroundColor: color }}
              />
              
              {/* Vertical stick */}
              <div 
                className="w-1 rounded-b-full"
                style={{ 
                  backgroundColor: color,
                  height: `${stickHeight}px`
                }}
              />
              
              {/* Parameter label at bottom */}
              <div className="mt-2 text-center min-w-0">
                <span className="font-medium text-sm text-black block">
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

export default LollipopChart;
