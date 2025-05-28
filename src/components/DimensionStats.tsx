
import React from 'react';

interface DimensionStatsProps {
  score: number;
  baseColors: any;
  intensityColor: string;
}

const DimensionStats: React.FC<DimensionStatsProps> = ({
  score,
  baseColors,
  intensityColor
}) => {
  return (
    <div className="grid grid-cols-2 gap-3 text-center">
      <div 
        className="p-3 rounded border-2"
        style={{ 
          backgroundColor: baseColors.light,
          borderColor: intensityColor + '60'
        }}
      >
        <p className="text-xs text-gray-600">מספר שאלות</p>
        <p 
          className="font-bold text-lg"
          style={{ color: intensityColor }}
        >
          15
        </p>
      </div>
      <div 
        className="p-3 rounded border-2"
        style={{ 
          backgroundColor: baseColors.light,
          borderColor: intensityColor + '60'
        }}
      >
        <p className="text-xs text-gray-600">אחוזון</p>
        <p 
          className="font-bold text-lg"
          style={{ color: intensityColor }}
        >
          {Math.round((score / 5) * 100)}%
        </p>
      </div>
    </div>
  );
};

export default DimensionStats;
