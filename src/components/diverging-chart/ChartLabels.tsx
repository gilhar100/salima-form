
import React from 'react';

const ChartLabels: React.FC = () => {
  return (
    <div className="flex justify-between mb-6">
      <div className="text-black font-bold text-sm">
        מתחת לממוצע האישי
      </div>
      <div className="text-black font-bold text-sm">
        מעל לממוצע האישי
      </div>
    </div>
  );
};

export default ChartLabels;
