import React from 'react';
interface DimensionStatsProps {
  score: number;
  baseColors: any;
  intensityColor: string;
}
const DimensionStats: React.FC<DimensionStatsProps> = ({
  score,
  baseColors,
  intensityColor
}) => {
  return <div className="grid grid-cols-2 gap-3 text-center">
      
      
    </div>;
};
export default DimensionStats;