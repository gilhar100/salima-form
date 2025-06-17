
import React from 'react';

interface ParameterSpectrumProps {
  score: number;
  parameterName: string;
  color: string;
}

const ParameterSpectrum: React.FC<ParameterSpectrumProps> = ({
  score,
  parameterName,
  color
}) => {
  // Calculate position on spectrum (0-100%)
  const position = Math.min(Math.max((score / 5) * 100, 0), 100);
  
  return (
    <div className="mt-3">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>1.0</span>
        <span>2.5</span>
        <span>5.0</span>
      </div>
      <div className="relative h-6 rounded-full overflow-hidden">
        {/* Color gradient spectrum from red to green */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `linear-gradient(to right, 
              #ef4444 0%, 
              #f97316 25%, 
              #eab308 50%, 
              #84cc16 75%, 
              #22c55e 100%)`
          }}
        />
        {/* Score indicator */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white border-2 border-gray-800 rounded-full shadow-lg transform -translate-x-1/2"
          style={{ 
            left: `${position}%`,
          }}
        />
      </div>
      <div className="text-center mt-1">
        <span className="text-xs font-medium text-gray-600">
          {score.toFixed(1)}
        </span>
      </div>
    </div>
  );
};

export default ParameterSpectrum;
