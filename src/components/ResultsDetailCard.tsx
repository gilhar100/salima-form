
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DimensionResult } from "@/lib/types";
import { Loader2 } from "lucide-react";
import ColorIntensityBar from "./ColorIntensityBar";

interface ResultsDetailCardProps {
  dimension: DimensionResult;
  answers: { questionId: number; value: number; }[];
  insight?: string;
  isLoadingInsight?: boolean;
}

const ResultsDetailCard = ({ dimension, insight, isLoadingInsight }: ResultsDetailCardProps) => {
  // SALIMA color palette
  const dimensionColors = {
    'S': '#0072B2', // אסטרטגיה
    'A': '#E69F00', // אדפטיביות
    'L': '#009E73', // למידה
    'I': '#D55E00', // השראה
    'M': '#CC79A7', // משמעות
    'A2': '#F0E442' // אותנטיות
  };

  const getIntensityColor = (score: number) => {
    if (score >= 4.5) return "bg-green-500";
    if (score >= 4.0) return "bg-green-400";
    if (score >= 3.5) return "bg-yellow-400";
    if (score >= 3.0) return "bg-orange-400";
    return "bg-red-400";
  };

  const getIntensityText = (score: number) => {
    if (score >= 4.5) return "מצוין";
    if (score >= 4.0) return "חזק";
    if (score >= 3.5) return "בינוני";
    if (score >= 3.0) return "מתפתח";
    return "לפיתוח";
  };

  const getDimensionTitle = (dimension: string) => {
    const titles: Record<string, string> = {
      'S': 'אסטרטגיה',
      'L': 'למידה',
      'I': 'השראה',
      'M': 'משמעות',
      'A': 'אדפטיביות',
      'A2': 'אותנטיות'
    };
    return titles[dimension] || dimension;
  };

  const getDimensionColor = (dimension: string) => {
    return dimensionColors[dimension as keyof typeof dimensionColors] || '#4F46E5';
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-salima-800">{dimension.title}</span>
          <Badge 
            variant="outline" 
            className={`${getIntensityColor(dimension.score)} text-white border-none`}
          >
            {getIntensityText(dimension.score)}
          </Badge>
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          ממד {dimension.dimension} בשאלון SALIMA
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Color Intensity Bar */}
        <ColorIntensityBar 
          score={dimension.score}
          color={getDimensionColor(dimension.dimension)}
          dimensionName={getDimensionTitle(dimension.dimension)}
        />

        <div>
          {isLoadingInsight ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              <span className="text-sm text-gray-600">טוען ניתוח...</span>
            </div>
          ) : insight ? (
            <div className="text-sm leading-relaxed text-gray-700 bg-gray-50 p-4 rounded-lg border-r-4 border-salima-400">
              {insight}
            </div>
          ) : (
            <div className="text-sm leading-relaxed text-gray-500 bg-gray-50 p-4 rounded-lg border-r-4 border-gray-300 italic">
              ניתוח מותאם אישית בהכנה...
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsDetailCard;
