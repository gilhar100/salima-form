import React from 'react';
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
interface DimensionHeaderProps {
  title: string;
  description: string;
  score: number;
  level: string;
  baseColors: any;
  intensityColor: string;
}
const DimensionHeader: React.FC<DimensionHeaderProps> = ({
  title,
  description,
  score,
  level,
  baseColors,
  intensityColor
}) => {
  return <CardHeader className="pb-4" style={{
    backgroundColor: baseColors.light
  }}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <CardTitle className="text-xl mb-2" style={{
          color: intensityColor
        }}>
            {title}
          </CardTitle>
          <CardDescription className="text-gray-700">
            {description}
          </CardDescription>
        </div>
        <div className="text-center ml-4">
          <div className="text-3xl font-bold rounded-full w-16 h-16 flex items-center justify-center text-white shadow-lg border-2" style={{
          backgroundColor: intensityColor,
          borderColor: baseColors.strongest
        }}>
            {score}
          </div>
          
        </div>
      </div>
    </CardHeader>;
};
export default DimensionHeader;