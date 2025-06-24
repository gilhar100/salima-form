
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Legend } from 'recharts';
import { SurveyResult } from '@/lib/types';

// FIXED TERMINOLOGY - Updated dimension colors and names
export const dimensionColors = {
  strategic: { primary: '#FF6B35', secondary: '#FFE5DB' },     // Orange-red
  adaptive: { primary: '#4ECDC4', secondary: '#E8F8F7' },      // Teal - CORRECTED terminology
  learning: { primary: '#45B7D1', secondary: '#E8F4F8' },      // Blue
  inspiring: { primary: '#96CEB4', secondary: '#F0F9F4' },     // Green
  meaningful: { primary: '#FFEAA7', secondary: '#FFF9E6' },    // Yellow
  authentic: { primary: '#DDA0DD', secondary: '#F5E6F5' }      // Purple
};

interface ResultsRadarProps {
  result: SurveyResult;
  hideScores?: boolean;
}

const ResultsRadar: React.FC<ResultsRadarProps> = ({ result, hideScores = false }) => {
  // FIXED TERMINOLOGY - Updated Hebrew names
  const dimensionNames = {
    strategic: 'אסטרטגי',
    adaptive: 'אדפטיביות', // CORRECTED from הסתגלות  
    learning: 'לומד',
    inspiring: 'השראה',
    meaningful: 'משמעות',
    authentic: 'אותנטיות'
  };

  const radarData = Object.values(result.dimensions).map(dimension => ({
    dimension: dimensionNames[dimension.dimension as keyof typeof dimensionNames] || dimension.title,
    value: hideScores ? dimension.score : Math.round(dimension.score * 10) / 10,
    fullMark: 5
  }));

  return (
    <div className="w-full h-96">
      <h3 className="text-center font-bold mb-4 text-gray-800" style={{ fontSize: '18px' }}>
        פרופיל SALIMA
      </h3>
      
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={radarData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
          <PolarGrid />
          <PolarAngleAxis 
            dataKey="dimension" 
            tick={{ 
              fontSize: 14, 
              fill: '#374151',
              fontWeight: 'bold'
            }}
            className="text-right"
          />
          <Radar
            name="ציון"
            dataKey="value"
            stroke="#4F46E5"
            fill="#4F46E5"
            fillOpacity={0.3}
            strokeWidth={2}
            dot={{ fill: '#4F46E5', strokeWidth: 2, r: 4 }}
          />
          {!hideScores && (
            <Legend 
              wrapperStyle={{ 
                paddingTop: '20px',
                fontSize: '14px'
              }}
            />
          )}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResultsRadar;
