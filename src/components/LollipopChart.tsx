
import React from 'react';
import { SurveyResult } from '@/lib/types';

interface LollipopChartProps {
  result: SurveyResult;
}

const LollipopChart: React.FC<LollipopChartProps> = ({ result }) => {
  const personalAverage = result.slq;

  // Updated SALIMA color palette
  const dimensionColors = {
    'S': '#FD0100', // אסטרטגיה - red
    'A': '#2FA236', // אדפטיביות - green
    'L': '#333ED4', // למידה - blue
    'I': '#F76915', // השראה - orange
    'M': '#BF4ED6', // משמעות - purple
    'A2': '#EEDE04' // אותנטיות - yellow
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
          const color = dimensionColors[dimension.dimension as keyof typeof dimensionColors];
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
