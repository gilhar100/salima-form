
import React from 'react';

interface ColorIntensityBarProps {
  score: number;
  color: string;
  dimensionName: string;
}

const ColorIntensityBar: React.FC<ColorIntensityBarProps> = ({ score, color, dimensionName }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-black">{dimensionName}</span>
      </div>
    </div>
  );
};

export default ColorIntensityBar;
