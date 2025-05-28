
import React from 'react';

interface DimensionAnalysisProps {
  analysis: string;
  baseColors: any;
  intensityColor: string;
}

const DimensionAnalysis: React.FC<DimensionAnalysisProps> = ({
  analysis,
  baseColors,
  intensityColor
}) => {
  return (
    <div 
      className="p-4 rounded-lg border-2"
      style={{ 
        backgroundColor: baseColors.light,
        borderColor: intensityColor + '40'
      }}
    >
      <h4 
        className="font-semibold mb-3"
        style={{ color: intensityColor }}
      >
        ניתוח מותאם אישית:
      </h4>
      <div className="text-sm leading-relaxed whitespace-pre-line">{analysis}</div>
    </div>
  );
};

export default DimensionAnalysis;
