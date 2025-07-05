
import React from 'react';

const ChartLabels: React.FC = () => {
  return (
    <div className="flex justify-between mb-4 px-4">
      <div className="text-black font-semibold text-sm text-right">
        מתחת לממוצע האישי
      </div>
      <div className="text-black font-semibold text-sm text-left">
        מעל לממוצע האישי
      </div>
    </div>
  );
};

export default ChartLabels;
