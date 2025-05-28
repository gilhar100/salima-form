
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface DimensionStatsProps {
  score: number;
  baseColors: any;
  intensityColor: string;
  preservationPoints: string[];
  improvementPoints: string[];
}

const DimensionStats: React.FC<DimensionStatsProps> = ({
  score,
  baseColors,
  intensityColor,
  preservationPoints,
  improvementPoints
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* נקודות לשימור */}
      <div 
        className="p-4 rounded-lg border-2"
        style={{ 
          backgroundColor: baseColors.light,
          borderColor: '#10b981'
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-4 w-4 text-green-600" />
          <h4 className="font-semibold text-green-700">
            נקודות לשימור והעמקה
          </h4>
        </div>
        <div className="space-y-2">
          {preservationPoints.map((point, index) => (
            <div key={index} className="text-sm text-gray-700 leading-relaxed">
              • {point}
            </div>
          ))}
        </div>
      </div>

      {/* נקודות לשיפור */}
      <div 
        className="p-4 rounded-lg border-2"
        style={{ 
          backgroundColor: baseColors.light,
          borderColor: '#f59e0b'
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <TrendingDown className="h-4 w-4 text-orange-600" />
          <h4 className="font-semibold text-orange-700">
            נקודות לשיפור והתפתחות
          </h4>
        </div>
        <div className="space-y-2">
          {improvementPoints.map((point, index) => (
            <div key={index} className="text-sm text-gray-700 leading-relaxed">
              • {point}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DimensionStats;
