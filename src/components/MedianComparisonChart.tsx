
import React from 'react';
import { SurveyResult } from '@/lib/types';
import { dimensionColors } from './ResultsRadar';

interface MedianComparisonChartProps {
  result: SurveyResult;
}

const MedianComparisonChart: React.FC<MedianComparisonChartProps> = ({ result }) => {
  // Calculate median score across all dimensions
  const scores = Object.values(result.dimensions).map(d => d.score);
  const medianScore = scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)];

  // Separate dimensions above and below median
  const belowMedian = Object.values(result.dimensions)
    .filter(d => d.score < medianScore)
    .sort((a, b) => a.score - b.score); // Sort ascending (lowest first)
    
  const aboveMedian = Object.values(result.dimensions)
    .filter(d => d.score > medianScore)
    .sort((a, b) => b.score - a.score); // Sort descending (highest first)

  const atMedian = Object.values(result.dimensions)
    .filter(d => d.score === medianScore);

  // Calculate max distance from median for scaling
  const maxDistance = Math.max(
    ...Object.values(result.dimensions).map(d => Math.abs(d.score - medianScore))
  );

  const getBarWidth = (score: number) => {
    if (maxDistance === 0) return 0;
    return (Math.abs(score - medianScore) / maxDistance) * 100;
  };

  function getParameterColor(dimension: string) {
    const colors = dimensionColors[dimension as keyof typeof dimensionColors];
    return colors?.primary || '#6b7280';
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border">
      <h3 className="text-lg font-semibold mb-6 text-center text-gray-800">
        התפלגות מדדים ביחס לציון החציוני האישי
      </h3>
      
      <div className="space-y-3">
        {/* Below median parameters */}
        {belowMedian.map((dimension) => (
          <div key={`below-${dimension.dimension}`} className="flex items-center">
            <div className="w-1/2 flex justify-end pr-2">
              <div className="flex items-center">
                <span className="text-xs font-medium text-gray-600 mr-2">
                  {dimension.score.toFixed(1)}
                </span>
                <div
                  className="h-6 rounded-r-md flex items-center justify-start pl-2"
                  style={{
                    width: `${getBarWidth(dimension.score)}%`,
                    backgroundColor: getParameterColor(dimension.dimension),
                    opacity: 0.8
                  }}
                >
                  <span className="text-xs font-medium text-white truncate">
                    {dimension.title}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Center line space */}
            <div className="w-0 flex justify-center">
              <div className="w-px h-6 bg-gray-400"></div>
            </div>
            
            <div className="w-1/2"></div>
          </div>
        ))}

        {/* At median parameters */}
        {atMedian.map((dimension) => (
          <div key={`at-${dimension.dimension}`} className="flex items-center">
            <div className="w-1/2 flex justify-end pr-2">
              <span className="text-xs font-medium text-gray-600">
                {dimension.title}
              </span>
            </div>
            
            {/* Center line with score */}
            <div className="flex justify-center items-center">
              <div className="w-px h-6 bg-gray-400"></div>
              <span className="text-xs font-semibold text-gray-800 mx-1">
                {dimension.score.toFixed(1)}
              </span>
            </div>
            
            <div className="w-1/2"></div>
          </div>
        ))}

        {/* Above median parameters */}
        {aboveMedian.map((dimension) => (
          <div key={`above-${dimension.dimension}`} className="flex items-center">
            <div className="w-1/2"></div>
            
            {/* Center line space */}
            <div className="w-0 flex justify-center">
              <div className="w-px h-6 bg-gray-400"></div>
            </div>
            
            <div className="w-1/2 flex justify-start pl-2">
              <div className="flex items-center">
                <div
                  className="h-6 rounded-l-md flex items-center justify-end pr-2"
                  style={{
                    width: `${getBarWidth(dimension.score)}%`,
                    backgroundColor: getParameterColor(dimension.dimension),
                    opacity: 0.8
                  }}
                >
                  <span className="text-xs font-medium text-white truncate">
                    {dimension.title}
                  </span>
                </div>
                <span className="text-xs font-medium text-gray-600 ml-2">
                  {dimension.score.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Median line label */}
        <div className="flex items-center mt-4 pt-2 border-t border-gray-200">
          <div className="w-1/2 flex justify-end pr-2">
            <span className="text-sm text-gray-600">מתחת לחציון</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-px h-8 bg-gray-600"></div>
            <span className="text-sm font-bold text-gray-800 mt-1">
              חציון: {medianScore.toFixed(1)}
            </span>
          </div>
          
          <div className="w-1/2 flex justify-start pl-2">
            <span className="text-sm text-gray-600">מעל החציון</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedianComparisonChart;
