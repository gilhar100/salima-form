
import React from 'react';
import { SurveyResult } from '@/lib/types';
import ChartHeader from './diverging-chart/ChartHeader';
import ChartArea from './diverging-chart/ChartArea';
import { sortDimensions } from './diverging-chart/utils';

interface DivergingBarChartProps {
  result: SurveyResult;
}

const DivergingBarChart: React.FC<DivergingBarChartProps> = ({ result }) => {
  const personalAverage = result.slq;
  const dimensions = Object.values(result.dimensions);
  
  // Separate dimensions above and below personal average
  const { aboveAverage, belowAverage } = sortDimensions(dimensions, personalAverage);

  // Calculate bar widths based on difference from average
  const maxDifference = Math.max(
    ...dimensions.map(d => Math.abs(d.score - personalAverage))
  );

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border w-full">
      <ChartHeader personalAverage={personalAverage} />
      <div className="overflow-x-auto">
        <ChartArea 
          aboveAverage={aboveAverage}
          belowAverage={belowAverage}
          personalAverage={personalAverage}
          maxDifference={maxDifference}
        />
      </div>
    </div>
  );
};

export default DivergingBarChart;
