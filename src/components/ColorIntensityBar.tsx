
import React from 'react';

interface ColorIntensityBarProps {
  score: number;
  color: string;
  dimensionName: string;
}

const ColorIntensityBar: React.FC<ColorIntensityBarProps> = ({ score, color, dimensionName }) => {
  // Calculate intensity based on score (1-5 scale)
  const intensity = Math.max(0.1, Math.min(1, score / 5));
  
  // Calculate position for the score indicator (0-100%)
  const indicatorPosition = ((score - 1) / 4) * 100;
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-black">{dimensionName}</span>
      </div>
      
      <div className="relative">
        {/* Background bar with gradient intensity */}
        <div 
          className="h-3 rounded-full relative overflow-hidden"
          style={{ 
            background: `linear-gradient(to left, ${color}${Math.round(intensity * 255).toString(16).padStart(2, '0')}, ${color}20)`
          }}
        >
          {/* Center tick mark at 2.5 */}
          <div 
            className="absolute top-0 h-full w-0.5 bg-gray-400"
            style={{ left: '37.5%' }}
          />
          
          {/* Score indicator */}
          <div 
            className="absolute top-0 h-full w-1 bg-black rounded-full"
            style={{ 
              left: `${Math.max(0, Math.min(100, indicatorPosition))}%`,
              transform: 'translateX(-50%)'
            }}
          />
        </div>
        
        {/* Center label only */}
        <div className="flex justify-center text-xs text-gray-500 mt-1">
          <span style={{ position: 'absolute', left: '37.5%', transform: 'translateX(-50%)' }}>
            2.5
          </span>
        </div>
      </div>
    </div>
  );
};

export default ColorIntensityBar;
