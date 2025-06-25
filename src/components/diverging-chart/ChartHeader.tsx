
import React from 'react';

interface ChartHeaderProps {
  personalAverage: number;
}

const ChartHeader: React.FC<ChartHeaderProps> = ({ personalAverage }) => {
  return (
    <>
      <h3 className="text-xl font-bold mb-6 text-center text-black">
        ממדי SALIMA
      </h3>
      
      {/* Personal average score - centered above the chart */}
      <div className="text-center mb-4">
        <div className="text-lg font-semibold text-black">
          ממוצע אישי: {personalAverage.toFixed(2)}
        </div>
      </div>
    </>
  );
};

export default ChartHeader;
