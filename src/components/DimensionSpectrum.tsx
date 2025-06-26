
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
          <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
            {/* רקע הספקטרום */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: `linear-gradient(to right, ${baseColors.weakest} 0%, ${baseColors.weak} 25%, ${baseColors.medium} 50%, ${baseColors.strong} 75%, ${baseColors.strongest} 100%)`
              }}
            />
            
            {/* קו מרכזי קבוע ב-50% (2.5) */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-black z-20"
              style={{ 
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            />
            
            {/* מחוון המיקום הנוכחי של הציון */}
            <div 
              className="absolute top-1/2 transform -translate-y-1/2 w-0.5 h-6 bg-gray-400 z-10"
              style={{ 
                left: `${((score - 1) / 4) * 100}%`,
                marginLeft: '-1px'
              }}
            />
          </div>
          
          {/* תווית 2.5 מתחת לקו המרכזי */}
          <div className="relative">
            <div 
              className="absolute text-xs font-bold text-black"
              style={{ 
                left: '50%',
                transform: 'translateX(-50%)',
                top: '-2px'
              }}
            >
              2.5
            </div>
          </div>
        </>
      )}
      <p className="text-sm text-gray-600 mt-4 text-center">
        {levelDescription}
      </p>
    </div>
  );
};

export default DimensionSpectrum;
