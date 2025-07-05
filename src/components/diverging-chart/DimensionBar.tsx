
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
      <div className="flex items-center w-full justify-center relative z-20" style={{ height: '40px' }}>
        <div className="flex items-center" style={{ minWidth: '480px' }}>
          {/* Bar extending to the left */}
          <div className="flex items-center justify-end" style={{ width: '240px' }}>
            <span className="ml-3 text-base font-medium text-black whitespace-nowrap">
              {hebrewName}
            </span>
            <div 
              className="h-8 mr-1"
              style={{ 
                backgroundColor: color,
                width: `${barWidth}px`,
                borderTopLeftRadius: '6px',
                borderBottomLeftRadius: '6px',
                borderTopRightRadius: '0px',
                borderBottomRightRadius: '0px'
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
    <div className="flex items-center w-full justify-center relative z-20" style={{ height: '40px' }}>
      <div className="flex items-center" style={{ minWidth: '480px' }}>
        {/* Left spacer */}
        <div style={{ width: '240px' }}></div>
        
        {/* Bar extending to the right */}
        <div className="flex items-center">
          <div 
            className="h-8 ml-1"
            style={{ 
              backgroundColor: color,
              width: `${barWidth}px`,
              borderTopLeftRadius: '0px',
              borderBottomLeftRadius: '0px',
              borderTopRightRadius: '6px',
              borderBottomRightRadius: '6px'
            }}
          />
          <span className="mr-3 text-base font-medium text-black whitespace-nowrap">
            {hebrewName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DimensionBar;
