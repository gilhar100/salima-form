
import React from 'react';
import { dimensionColors, dimensionNames } from './constants';
import { getIntensityColor } from './utils';

interface DimensionBarProps {
  dimension: any;
  barWidth: number;
  side: 'left' | 'right';
}

const DimensionBar: React.FC<DimensionBarProps> = ({ dimension, barWidth, side }) => {
  const baseColors = dimensionColors[dimension.dimension as keyof typeof dimensionColors];
  const color = getIntensityColor(dimension.score, baseColors);
  const hebrewName = dimensionNames[dimension.dimension as keyof typeof dimensionNames];

  if (side === 'left') {
    return (
      <div className="flex items-center w-full justify-center relative z-20" style={{ height: '50px' }}>
        <div className="flex items-center" style={{ minWidth: '480px' }}>
          {/* Bar extending to the left */}
          <div className="flex items-center justify-end" style={{ width: '240px' }}>
            <span className="ml-4 text-base font-medium text-black whitespace-nowrap">
              {hebrewName}
            </span>
            <div 
              className="h-10 mr-1 transition-all duration-300 ease-in-out shadow-sm"
              style={{ 
                backgroundColor: color,
                width: `${barWidth}px`,
                borderRadius: '2px 20px 20px 2px',
                border: '1px solid rgba(255,255,255,0.3)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
              }}
            />
          </div>
          
          {/* Right spacer */}
          <div style={{ width: '240px' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center w-full justify-center relative z-20" style={{ height: '50px' }}>
      <div className="flex items-center" style={{ minWidth: '480px' }}>
        {/* Left spacer */}
        <div style={{ width: '240px' }}></div>
        
        {/* Bar extending to the right */}
        <div className="flex items-center">
          <div 
            className="h-10 ml-1 transition-all duration-300 ease-in-out shadow-sm"
            style={{ 
              backgroundColor: color,
              width: `${barWidth}px`,
              borderRadius: '20px 2px 2px 20px',
              border: '1px solid rgba(255,255,255,0.3)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
            }}
          />
          <span className="mr-4 text-base font-medium text-black whitespace-nowrap">
            {hebrewName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DimensionBar;
