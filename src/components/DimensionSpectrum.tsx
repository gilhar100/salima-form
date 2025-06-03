
import React from 'react';

interface DimensionSpectrumProps {
  score: number;
  baseColors: any;
  intensityColor: string;
  levelDescription: string;
  hideScore?: boolean;
}

const DimensionSpectrum: React.FC<DimensionSpectrumProps> = ({
  score,
  baseColors,
  intensityColor,
  levelDescription,
  hideScore = false
}) => {
  return (
    <div>
      {!hideScore && (
        <>
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>1.0</span>
            <span>2.5</span>
            <span>5.0</span>
          </div>
          <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
            {/* רקע הספקטרום */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: `linear-gradient(to right, ${baseColors.weakest} 0%, ${baseColors.weak} 25%, ${baseColors.medium} 50%, ${baseColors.strong} 75%, ${baseColors.strongest} 100%)`
              }}
            />
            {/* מחוון המיקום הנוכחי */}
            <div 
              className="absolute top-1/2 transform -translate-y-1/2 w-1 h-6 bg-white border-2 rounded-full shadow-lg"
              style={{ 
                left: `${(score / 5) * 100}%`,
                borderColor: intensityColor,
                marginLeft: '-2px'
              }}
            />
          </div>
        </>
      )}
      <p className="text-sm text-gray-600 mt-2 text-center">
        {levelDescription}
      </p>
    </div>
  );
};

export default DimensionSpectrum;
