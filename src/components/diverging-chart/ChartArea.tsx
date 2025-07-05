
import React from 'react';
import ChartLabels from './ChartLabels';
import DimensionBar from './DimensionBar';
import { getBarWidth } from './utils';

interface ChartAreaProps {
  aboveAverage: any[];
  belowAverage: any[];
  personalAverage: number;
  maxDifference: number;
}

const ChartArea: React.FC<ChartAreaProps> = ({ 
  aboveAverage, 
  belowAverage, 
  personalAverage, 
  maxDifference 
}) => {
  const totalRows = aboveAverage.length + belowAverage.length;
  const chartHeight = totalRows * 54; // 54px per row (including spacing)

  return (
    <div className="relative px-8">
      <ChartLabels />
      
      {/* Chart with continuous center line */}
      <div className="relative flex flex-col items-center space-y-1">
        {/* Single continuous vertical line with gradient */}
        <div 
          className="absolute z-10" 
          style={{ 
            width: '3px', 
            height: `${chartHeight}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            top: '0px',
            background: 'linear-gradient(to bottom, #e5e7eb 0%, #9ca3af 50%, #e5e7eb 100%)',
            borderRadius: '1.5px'
          }}
        ></div>
        
        {/* Above average bars (left side) */}
        {aboveAverage.map((dimension) => {
          const barWidth = getBarWidth(dimension.score, personalAverage, maxDifference);
          
          return (
            <DimensionBar
              key={dimension.dimension}
              dimension={dimension}
              barWidth={barWidth}
              side="left"
            />
          );
        })}

        {/* Below average bars (right side) */}
        {belowAverage.map((dimension) => {
          const barWidth = getBarWidth(dimension.score, personalAverage, maxDifference);
          
          return (
            <DimensionBar
              key={dimension.dimension}
              dimension={dimension}
              barWidth={barWidth}
              side="right"
            />
          );
        })}
      </div>
    </div>
  );
};

export default ChartArea;
