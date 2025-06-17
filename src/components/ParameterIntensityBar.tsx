
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
  
  // Calculate height percentage based on score (1-5 scale)
  const heightPercentage = (score / 5) * 100;
  
  return (
    <div className="flex flex-col items-center space-y-2 p-4 bg-white rounded-lg border">
      {/* Y-axis scale */}
      <div className="relative w-16 h-40 flex flex-col justify-end">
        {/* Scale lines and numbers */}
        <div className="absolute left-0 top-0 w-full h-full">
          {[5, 4, 3, 2, 1, 0].map((value) => (
            <div
              key={value}
              className="absolute left-0 w-full flex items-center"
              style={{ bottom: `${(value / 5) * 100}%` }}
            >
              <span className="text-xs text-gray-600 w-6 text-right mr-2">
                {value}
              </span>
              <div className="w-1 h-px bg-gray-300"></div>
            </div>
          ))}
        </div>
        
        {/* The bar */}
        <div className="ml-8 w-12 bg-gray-100 relative">
          <div
            className="w-full rounded-t transition-all duration-300"
            style={{
              height: `${heightPercentage}%`,
              backgroundColor: baseColors.primary,
              minHeight: '4px'
            }}
          />
        </div>
      </div>
      
      {/* Parameter label */}
      <div className="text-center">
        <div className="text-lg font-bold text-gray-800">
          {parameterKey}
        </div>
        <div className="text-xs text-gray-600 max-w-16 leading-tight">
          {parameterName}
        </div>
      </div>
      
      {/* Score display */}
      <div className="text-sm font-semibold text-gray-700">
        {score.toFixed(2)}
      </div>
    </div>
  );
};

export default ParameterIntensityBar;
