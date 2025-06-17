
import React from 'react';
import { dimensionColors } from './ResultsRadar';

interface ParameterIntensityBarProps {
  score: number;
  parameterKey: string;
  parameterName: string;
}

const ParameterIntensityBar: React.FC<ParameterIntensityBarProps> = ({
  score,
  parameterKey,
  parameterName
}) => {
  // Get the base color for this parameter
  const baseColors = dimensionColors[parameterKey as keyof typeof dimensionColors];
  
  // Calculate opacity based on score (1-5 scale) for intensity effect
  const intensity = Math.min(Math.max(score / 5, 0.2), 1);
  
  return (
    <div className="space-y-3 p-4 bg-white rounded-lg border">
      <h4 className="text-lg font-semibold text-gray-800 text-center">
        {parameterName}
      </h4>
      
      {/* Score circle */}
      <div className="flex justify-center">
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg"
          style={{ backgroundColor: baseColors.primary }}
        >
          {score.toFixed(2)}
        </div>
      </div>
      
      {/* Color intensity bar */}
      <div className="space-y-2">
        <div className="relative h-6 bg-gray-100 rounded-full overflow-hidden">
          {/* Full bar with parameter color and calculated intensity */}
          <div 
            className="h-full w-full rounded-full"
            style={{ 
              backgroundColor: baseColors.primary,
              opacity: intensity
            }}
          />
          
          {/* Score indicator line */}
          <div 
            className="absolute top-0 h-full w-0.5 bg-gray-800"
            style={{ 
              left: `${(score / 5) * 100}%`,
              transform: 'translateX(-50%)'
            }}
          />
        </div>
        
        {/* Scale labels */}
        <div className="flex justify-between text-xs text-gray-600">
          <span>1.0</span>
          <span>2.5</span>
          <span>5.0</span>
        </div>
        
        <p className="text-center text-sm text-gray-600 mt-2">
          ציון מדד בין קיצוני משמעויות לציפייה
        </p>
      </div>
    </div>
  );
};

export default ParameterIntensityBar;
