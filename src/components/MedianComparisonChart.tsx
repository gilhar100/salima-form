
import React from 'react';
import { SurveyResult } from '@/lib/types';
import { dimensionColors } from './ResultsRadar';

interface MedianComparisonChartProps {
  result: SurveyResult;
}

const MedianComparisonChart: React.FC<MedianComparisonChartProps> = ({ result }) => {
  // Calculate mean score across all dimensions
  const scores = Object.values(result.dimensions).map(d => d.score);
  const meanScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;

  // Separate dimensions above and below mean
  const belowMean = Object.values(result.dimensions)
    .filter(d => d.score < meanScore)
    .sort((a, b) => a.score - b.score); // Sort ascending (lowest first)
    
  const aboveMean = Object.values(result.dimensions)
    .filter(d => d.score > meanScore)
    .sort((a, b) => b.score - a.score); // Sort descending (highest first)

  const atMean = Object.values(result.dimensions)
    .filter(d => Math.abs(d.score - meanScore) < 0.01); // Very close to mean

  // Calculate max distance from mean for scaling
  const maxDistance = Math.max(
    ...Object.values(result.dimensions).map(d => Math.abs(d.score - meanScore))
  );

  const getBarWidth = (score: number) => {
    if (maxDistance === 0) return 0;
    return (Math.abs(score - meanScore) / maxDistance) * 100;
  };

  function getParameterColor(dimension: string) {
    const colors = dimensionColors[dimension as keyof typeof dimensionColors];
    return colors?.primary || '#6b7280';
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-xl font-bold mb-6 text-center text-gray-800">
        ממדי SALIMA ביחס לציון הממוצע האישי
      </h3>
      
      <div className="space-y-3">
        {/* Below mean parameters */}
        {belowMean.map((dimension) => (
          <div key={`below-${dimension.dimension}`} className="flex items-center h-8">
            <div className="w-1/2 flex justify-end pr-4">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-700 ml-3">
                  {dimension.title}
                </span>
                <div
                  className="h-6 rounded-r-md"
                  style={{
                    width: `${getBarWidth(dimension.score)}%`,
                    maxWidth: '150px',
                    backgroundColor: getParameterColor(dimension.dimension),
                    opacity: 0.8
                  }}
                />
              </div>
            </div>
            
            {/* Center line space */}
            <div className="w-0 flex justify-center">
              <div className="w-px h-8 bg-gray-600"></div>
            </div>
            
            <div className="w-1/2"></div>
          </div>
        ))}

        {/* At mean parameters */}
        {atMean.map((dimension) => (
          <div key={`at-${dimension.dimension}`} className="flex items-center h-8">
            <div className="w-1/2 flex justify-end pr-4">
              <span className="text-sm font-medium text-gray-700">
                {dimension.title}
              </span>
            </div>
            
            {/* Center line */}
            <div className="flex justify-center items-center">
              <div className="w-px h-8 bg-gray-600"></div>
            </div>
            
            <div className="w-1/2"></div>
          </div>
        ))}

        {/* Above mean parameters */}
        {aboveMean.map((dimension) => (
          <div key={`above-${dimension.dimension}`} className="flex items-center h-8">
            <div className="w-1/2"></div>
            
            {/* Center line space */}
            <div className="w-0 flex justify-center">
              <div className="w-px h-8 bg-gray-600"></div>
            </div>
            
            <div className="w-1/2 flex justify-start pl-4">
              <div className="flex items-center">
                <div
                  className="h-6 rounded-l-md"
                  style={{
                    width: `${getBarWidth(dimension.score)}%`,
                    maxWidth: '150px',
                    backgroundColor: getParameterColor(dimension.dimension),
                    opacity: 0.8
                  }}
                />
                <span className="text-sm font-medium text-gray-700 mr-3">
                  {dimension.title}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Mean line label */}
        <div className="flex items-center mt-6 pt-4 border-t border-gray-300">
          <div className="w-1/2 flex justify-end pr-4">
            <span className="text-sm text-gray-600">מתחת לממוצע</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-px h-12 bg-gray-800"></div>
            <span className="text-lg font-bold text-gray-800 mt-2">
              ממוצע: {meanScore.toFixed(2)}
            </span>
          </div>
          
          <div className="w-1/2 flex justify-start pl-4">
            <span className="text-sm text-gray-600">מעל הממוצע</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedianComparisonChart;
