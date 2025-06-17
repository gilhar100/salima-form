
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
  
  // Calculate opacity based on score (1-5 scale)
  const intensity = Math.min(Math.max(score / 5, 0.1), 1);
  
  // Calculate width percentage for the bar
  const widthPercentage = (score / 5) * 100;
  
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gray-700">
        עוצמת מדד {parameterName}
      </h4>
      <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
        <div 
          className="h-full rounded-lg transition-all duration-700 ease-out flex items-center justify-end pr-2"
          style={{ 
            width: `${widthPercentage}%`,
            backgroundColor: baseColors.primary,
            opacity: 0.3 + (intensity * 0.7) // Range from 0.3 to 1.0 opacity
          }}
        >
          <span className="text-xs font-semibold text-gray-800">
            {score.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ParameterIntensityBar;
