import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Legend } from 'recharts';
import { SurveyResult } from '@/lib/types';

// FIXED TERMINOLOGY - Updated dimension colors and names with backward compatibility
export const dimensionColors = {
  strategic: { primary: '#FF6B35', secondary: '#FFE5DB', light: '#FFE5DB', medium: '#FFB899', strongest: '#CC3B00', strong: '#FF6B35', weak: '#FFB899', weakest: '#FFF2ED' },
  adaptive: { primary: '#4ECDC4', secondary: '#E8F8F7', light: '#E8F8F7', medium: '#A3E4E0', strongest: '#2BA59A', strong: '#4ECDC4', weak: '#A3E4E0', weakest: '#F4FCFB' },
  learning: { primary: '#45B7D1', secondary: '#E8F4F8', light: '#E8F4F8', medium: '#92CBE5', strongest: '#2980B9', strong: '#45B7D1', weak: '#92CBE5', weakest: '#F4F9FC' },
  inspiring: { primary: '#96CEB4', secondary: '#F0F9F4', light: '#F0F9F4', medium: '#BBDECA', strongest: '#5BA876', strong: '#96CEB4', weak: '#BBDECA', weakest: '#F8FCFA' },
  meaningful: { primary: '#FFEAA7', secondary: '#FFF9E6', light: '#FFF9E6', medium: '#FFF0C4', strongest: '#D4C441', strong: '#FFEAA7', weak: '#FFF0C4', weakest: '#FFFCF3' },
  authentic: { primary: '#DDA0DD', secondary: '#F5E6F5', light: '#F5E6F5', medium: '#E8C3E8', strongest: '#B370B3', strong: '#DDA0DD', weak: '#E8C3E8', weakest: '#FAF0FA' },
  
  // Backward compatibility with short keys
  S: { primary: '#FF6B35', secondary: '#FFE5DB', light: '#FFE5DB', medium: '#FFB899', strongest: '#CC3B00', strong: '#FF6B35', weak: '#FFB899', weakest: '#FFF2ED' },
  L: { primary: '#45B7D1', secondary: '#E8F4F8', light: '#E8F4F8', medium: '#92CBE5', strongest: '#2980B9', strong: '#45B7D1', weak: '#92CBE5', weakest: '#F4F9FC' },
  I: { primary: '#96CEB4', secondary: '#F0F9F4', light: '#F0F9F4', medium: '#BBDECA', strongest: '#5BA876', strong: '#96CEB4', weak: '#BBDECA', weakest: '#F8FCFA' },
  M: { primary: '#FFEAA7', secondary: '#FFF9E6', light: '#FFF9E6', medium: '#FFF0C4', strongest: '#D4C441', strong: '#FFEAA7', weak: '#FFF0C4', weakest: '#FFFCF3' },
  A: { primary: '#4ECDC4', secondary: '#E8F8F7', light: '#E8F8F7', medium: '#A3E4E0', strongest: '#2BA59A', strong: '#4ECDC4', weak: '#A3E4E0', weakest: '#F4FCFB' },
  A2: { primary: '#DDA0DD', secondary: '#F5E6F5', light: '#F5E6F5', medium: '#E8C3E8', strongest: '#B370B3', strong: '#DDA0DD', weak: '#E8C3E8', weakest: '#FAF0FA' }
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
