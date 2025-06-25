
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
    return Math.max(15, (difference / Math.max(maxDifference, 0.5)) * 150); // Min 15px, max 150px
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-xl font-bold mb-6 text-center text-black">
        ממדי SALIMA
      </h3>
      
      {/* Personal average score - placed above the chart */}
      <div className="text-center mb-6">
        <div className="text-lg font-semibold text-black">
          ממוצע אישי: {personalAverage.toFixed(2)}
        </div>
      </div>
      
      {/* Chart container */}
      <div className="relative flex flex-col items-center space-y-3">
        {/* Above average bars (right side) */}
        {aboveAverage.map((dimension, index) => {
          const color = dimensionColors[dimension.dimension as keyof typeof dimensionColors];
          const hebrewName = dimensionNames[dimension.dimension as keyof typeof dimensionNames];
          const barWidth = getBarWidth(dimension.score);
          
          return (
            <div key={dimension.dimension} className="flex items-center w-full justify-center">
              <div className="flex items-center" style={{ minWidth: '400px' }}>
                {/* Left spacer */}
                <div style={{ width: '150px' }}></div>
                
                {/* Center line */}
                <div className="w-px bg-gray-300" style={{ height: '32px' }}></div>
                
                {/* Bar extending to the right */}
                <div className="flex items-center mr-2">
                  <div 
                    className="h-8 rounded-r-md"
                    style={{ 
                      backgroundColor: color,
                      width: `${barWidth}px`
                    }}
                  />
                  <span className="mr-3 text-base font-medium text-black whitespace-nowrap">
                    {hebrewName}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Center reference line */}
        <div className="w-full flex justify-center">
          <div className="w-px bg-gray-400" style={{ height: '2px', width: '300px' }}></div>
        </div>

        {/* Below average bars (left side) */}
        {belowAverage.map((dimension, index) => {
          const color = dimensionColors[dimension.dimension as keyof typeof dimensionColors];
          const hebrewName = dimensionNames[dimension.dimension as keyof typeof dimensionNames];
          const barWidth = getBarWidth(dimension.score);
          
          return (
            <div key={dimension.dimension} className="flex items-center w-full justify-center">
              <div className="flex items-center" style={{ minWidth: '400px' }}>
                {/* Bar extending to the left */}
                <div className="flex items-center justify-end ml-2" style={{ width: '150px' }}>
                  <span className="ml-3 text-base font-medium text-black whitespace-nowrap">
                    {hebrewName}
                  </span>
                  <div 
                    className="h-8 rounded-l-md"
                    style={{ 
                      backgroundColor: color,
                      width: `${barWidth}px`
                    }}
                  />
                </div>
                
                {/* Center line */}
                <div className="w-px bg-gray-300" style={{ height: '32px' }}></div>
                
                {/* Right spacer */}
                <div style={{ width: '150px' }}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DivergingBarChart;
