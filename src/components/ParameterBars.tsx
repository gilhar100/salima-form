
import React from 'react';
import { SurveyResult } from "@/lib/types";
import { dimensionColors } from "./diverging-chart/constants";
import { dimensionInfo } from "@/data/questions";

interface ParameterBarsProps {
  result: SurveyResult;
}

const ParameterBars: React.FC<ParameterBarsProps> = ({ result }) => {
  const { dimensions } = result;
  
  const parameterData = [
    { key: 'S', dimension: dimensions.S },
    { key: 'L', dimension: dimensions.L },
    { key: 'I', dimension: dimensions.I },
    { key: 'M', dimension: dimensions.M },
    { key: 'A', dimension: dimensions.A },
    { key: 'A2', dimension: dimensions.A2 }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center text-salima-800 mb-4">
        פרופיל הממדים
      </h3>
      <div className="space-y-3">
        {parameterData.map(({ key, dimension }) => {
          const baseColors = dimensionColors[key as keyof typeof dimensionColors];
          const fixedColor = baseColors.strong; // Use fixed color regardless of score
          const percentage = (dimension.score / 5) * 100;
          
          return (
            <div key={key} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  {dimension.title}
                </span>
                <span className="text-xs text-gray-500">
                  {dimensionInfo[key as keyof typeof dimensionInfo].description}
                </span>
              </div>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: fixedColor
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>נמוך</span>
                  <span>בינוני</span>
                  <span>גבוה</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ParameterBars;
