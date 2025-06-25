
import React from 'react';
import { SurveyResult } from '@/lib/types';

interface DivergingBarChartProps {
  result: SurveyResult;
}

const DivergingBarChart: React.FC<DivergingBarChartProps> = ({ result }) => {
  const personalAverage = result.slq;

  // Updated SALIMA color palette - matching PersonalColorProfile
  const dimensionColors = {
    'S': {
      strongest: '#B30000',
      strong: '#FD0100',
      medium: '#FF4D4D',
      weak: '#FF9999',
      weakest: '#FFE6E6'
    },
    'L': {
      strongest: '#0000B3',
      strong: '#333ED4',
      medium: '#6666FF',
      weak: '#9999FF',
      weakest: '#E6E6FF'
    },
    'I': {
      strongest: '#CC4400',
      strong: '#F76915',
      medium: '#FF8533',
      weak: '#FFAA66',
      weakest: '#FFE6CC'
    },
    'M': {
      strongest: '#8A3399',
      strong: '#BF4ED6',
      medium: '#CC66E0',
      weak: '#DD99E6',
      weakest: '#F5E6FF'
    },
    'A': {
      strongest: '#1F6B1F',
      strong: '#2FA236',
      medium: '#5CB85C',
      weak: '#90EE90',
      weakest: '#E6FFE6'
    },
    'A2': {
      strongest: '#B8B800',
      strong: '#EEDE04',
      medium: '#F0E833',
      weak: '#F5F566',
      weakest: '#FFFACD'
    }
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

  // Function to get color intensity matching PersonalColorProfile
  const getIntensityColor = (score: number, baseColors: any) => {
    const normalizedScore = Math.max(0, Math.min(5, score)) / 5;
    
    if (normalizedScore >= 0.9) return baseColors.strongest;
    if (normalizedScore >= 0.75) return baseColors.strong;
    if (normalizedScore >= 0.6) return baseColors.medium;
    if (normalizedScore >= 0.4) return baseColors.weak;
    return baseColors.weakest;
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
    return Math.max(20, (difference / Math.max(maxDifference, 0.5)) * 120); // Min 20px, max 120px
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
      
      {/* Chart container with labels */}
      <div className="relative">
        {/* Side labels */}
        <div className="flex justify-between mb-4">
          <div className="text-black font-bold text-sm">
            מתחת לממוצע האישי
          </div>
          <div className="text-black font-bold text-sm">
            מעל לממוצע האישי
          </div>
        </div>
        
        {/* Chart with continuous center line */}
        <div className="relative flex flex-col items-center space-y-2">
          {/* Single continuous vertical line */}
          <div 
            className="absolute bg-gray-300 z-10" 
            style={{ 
              width: '2px', 
              height: `${(aboveAverage.length + belowAverage.length + 1) * 44}px`,
              left: '50%',
              transform: 'translateX(-50%)',
              top: '0px'
            }}
          ></div>
          
          {/* Above average bars (right side) */}
          {aboveAverage.map((dimension, index) => {
            const baseColors = dimensionColors[dimension.dimension as keyof typeof dimensionColors];
            const color = getIntensityColor(dimension.score, baseColors);
            const hebrewName = dimensionNames[dimension.dimension as keyof typeof dimensionNames];
            const barWidth = getBarWidth(dimension.score);
            
            return (
              <div key={dimension.dimension} className="flex items-center w-full justify-center relative z-20">
                <div className="flex items-center" style={{ minWidth: '400px' }}>
                  {/* Left spacer */}
                  <div style={{ width: '200px' }}></div>
                  
                  {/* Bar extending to the right */}
                  <div className="flex items-center">
                    <div 
                      className="h-8 rounded-r-md ml-1"
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

          {/* Below average bars (left side) */}
          {belowAverage.map((dimension, index) => {
            const baseColors = dimensionColors[dimension.dimension as keyof typeof dimensionColors];
            const color = getIntensityColor(dimension.score, baseColors);
            const hebrewName = dimensionNames[dimension.dimension as keyof typeof dimensionNames];
            const barWidth = getBarWidth(dimension.score);
            
            return (
              <div key={dimension.dimension} className="flex items-center w-full justify-center relative z-20">
                <div className="flex items-center" style={{ minWidth: '400px' }}>
                  {/* Bar extending to the left */}
                  <div className="flex items-center justify-end" style={{ width: '200px' }}>
                    <span className="ml-3 text-base font-medium text-black whitespace-nowrap">
                      {hebrewName}
                    </span>
                    <div 
                      className="h-8 rounded-l-md mr-1"
                      style={{ 
                        backgroundColor: color,
                        width: `${barWidth}px`
                      }}
                    />
                  </div>
                  
                  {/* Right spacer */}
                  <div style={{ width: '200px' }}></div>
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
