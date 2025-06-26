
import React from 'react';

interface DimensionSpectrumProps {
  score: number;
  baseColors: any;
  intensityColor: string;
  levelDescription: string;
  hideScore?: boolean;
}

const DimensionSpectrum: React.FC<DimensionSpectrumProps> = ({
  score,
  baseColors,
  intensityColor,
  levelDescription,
  hideScore = false
}) => {
  return (
    <div>
      <p className="text-sm text-gray-600 mt-4 text-center">
        {levelDescription}
      </p>
    </div>
  );
};

export default DimensionSpectrum;
