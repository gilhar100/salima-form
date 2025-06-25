
import React from 'react';
import { SurveyResult } from '@/lib/types';

interface DivergingBarChartProps {
  result: SurveyResult;
}

const DivergingBarChart: React.FC<DivergingBarChartProps> = ({ result }) => {
  const personalAverage = result.slq;

  // Official SALIMA color palette
  const dimensionColors = {
    'S': '#3E92CC', // אסטרטגיה - blue
    'A': '#FFA630', // אדפטיביות - orange
    'L': '#2E294E', // למידה - dark purple
    'I': '#A2C523', // השראה - green
    'M': '#F25F5C', // משמעות - red
    'A2': '#5E548E' // אותנטיות - purple
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
  
  // Separate dimensions above and below personal average
  const aboveAverage = dimensions.filter(d => d.score > personalAverage);
  const belowAverage = dimensions.filter(d => d.score < personalAverage);
  
  // Sort by difference from average for better visual hierarchy
  aboveAverage.sort((a, b) => (b.score - personalAverage) - (a.score - personalAverage));
  belowAverage.sort((a, b) => (personalAverage - a.score) - (personalAverage - b.score));

  // Calculate bar widths based on difference from average
  const maxDifference = Math.max(
    ...dimensions.map(d => Math.abs(d.score - personalAverage))
  );
  
  const getBarWidth = (score: number) => {
    const difference = Math.abs(score - personalAverage);
    return Math.max(10, (difference / Math.max(maxDifference, 0.5)) * 120); // Min 10px, max 120px
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-xl font-bold mb-2 text-center text-black">
        ממדי SALIMA
      </h3>
      
      {/* Chart container */}
      <div className="relative flex flex-col items-center" style={{ minHeight: '300px' }}>
        {/* Above average bars (right side) */}
        <div className="w-full mb-4">
          {aboveAverage.map((dimension, index) => {
            const color = dimensionColors[dimension.dimension as keyof typeof dimensionColors];
            const hebrewName = dimensionNames[dimension.dimension as keyof typeof dimensionNames];
            const barWidth = getBarWidth(dimension.score);
            
            return (
              <div key={dimension.dimension} className="flex items-center justify-center mb-2">
                <div className="flex items-center" style={{ minWidth: '200px' }}>
                  {/* Empty space for left side alignment */}
                  <div style={{ width: '120px' }}></div>
                  
                  {/* Center divider area */}
                  <div className="w-1 bg-gray-300 mx-2" style={{ height: '24px' }}></div>
                  
                  {/* Bar extending to the right */}
                  <div className="flex items-center">
                    <div 
                      className="h-6 rounded-r-full"
                      style={{ 
                        backgroundColor: color,
                        width: `${barWidth}px`
                      }}
                    />
                    <span className="mr-3 text-sm font-medium text-black">
                      {hebrewName}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Center line with personal average */}
        <div className="flex items-center justify-center mb-4 relative">
          <div className="absolute inset-x-0 flex items-center justify-center">
            <div className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-semibold">
              ממוצע אישי: {personalAverage.toFixed(2)}
            </div>
          </div>
          <div className="w-full h-px bg-gray-400"></div>
        </div>

        {/* Below average bars (left side) */}
        <div className="w-full">
          {belowAverage.map((dimension, index) => {
            const color = dimensionColors[dimension.dimension as keyof typeof dimensionColors];
            const hebrewName = dimensionNames[dimension.dimension as keyof typeof dimensionNames];
            const barWidth = getBarWidth(dimension.score);
            
            return (
              <div key={dimension.dimension} className="flex items-center justify-center mb-2">
                <div className="flex items-center" style={{ minWidth: '200px' }}>
                  {/* Bar extending to the left */}
                  <div className="flex items-center justify-end" style={{ width: '120px' }}>
                    <span className="ml-3 text-sm font-medium text-black">
                      {hebrewName}
                    </span>
                    <div 
                      className="h-6 rounded-l-full"
                      style={{ 
                        backgroundColor: color,
                        width: `${barWidth}px`
                      }}
                    />
                  </div>
                  
                  {/* Center divider area */}
                  <div className="w-1 bg-gray-300 mx-2" style={{ height: '24px' }}></div>
                  
                  {/* Empty space for right side alignment */}
                  <div style={{ width: '120px' }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DivergingBarChart;
