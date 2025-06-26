
import React from 'react';

interface ColorIntensityBarProps {
  score: number;
  color: string;
  dimensionName: string;
}

const ColorIntensityBar: React.FC<ColorIntensityBarProps> = ({ score, color, dimensionName }) => {
  // Calculate intensity based on score (1-5 scale)
  const intensity = Math.max(0.1, Math.min(1, score / 5));
  
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
          {/* Center tick mark fixed at 50% (2.5) */}
          <div 
            className="absolute top-0 h-full w-0.5 bg-black"
            style={{ left: '50%', transform: 'translateX(-50%)' }}
          />
          
          {/* Score indicator */}
          <div 
            className="absolute top-0 h-full w-1 bg-gray-400 rounded-full"
            style={{ 
              left: `${((score - 1) / 4) * 100}%`,
              transform: 'translateX(-50%)'
            }}
          />
        </div>
        
        {/* Center label only */}
        <div className="flex justify-center text-xs text-gray-500 mt-1">
          <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            2.5
          </span>
        </div>
      </div>
    </div>
  );
};

export default ColorIntensityBar;
