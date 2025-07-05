
import React from 'react';

interface ChartHeaderProps {
  personalAverage: number;
}

const ChartHeader: React.FC<ChartHeaderProps> = ({ personalAverage }) => {
  return (
    <>
      <h3 className="text-lg font-bold mb-4 text-center text-black">
        ציון SLQ ממוצע: {personalAverage.toFixed(2)}
      </h3>
    </>
  );
};

export default ChartHeader;
