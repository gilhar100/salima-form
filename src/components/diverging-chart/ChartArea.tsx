
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
  const chartHeight = totalRows * 48; // 48px per row (including spacing)

  return (
    <div className="relative px-8">
      <ChartLabels />
      
      {/* Chart with continuous center line */}
      <div className="relative flex flex-col items-center space-y-3">
        {/* Single continuous vertical line */}
        <div 
          className="absolute bg-gray-300 z-10" 
          style={{ 
            width: '2px', 
            height: `${chartHeight}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            top: '0px'
          }}
        ></div>
        
        {/* Above average bars (right side) */}
        {aboveAverage.map((dimension) => {
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

        {/* Below average bars (left side) */}
        {belowAverage.map((dimension) => {
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
      </div>
    </div>
  );
};

export default ChartArea;
