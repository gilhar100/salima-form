
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DimensionResult } from "@/lib/types";
import { Loader2 } from "lucide-react";
import ColorIntensityBar from "./ColorIntensityBar";

interface ResultsDetailCardProps {
  dimension: DimensionResult;
  answers: {
    questionId: number;
    value: number;
  }[];
  insight?: string;
  isLoadingInsight?: boolean;
}

// Helper function to render text with bold markdown formatting
const renderFormattedText = (text: string) => {
  if (!text) return null;
  
  // Split text by bold markers (**text**)
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      // This is bold text - remove the markers and render as bold subtitle
      const boldText = part.slice(2, -2);
      return (
        <span key={index} className="block font-bold text-base text-gray-800 mb-2 mt-4 first:mt-0">
          {boldText}
        </span>
      );
    } else {
      // Regular text - preserve line breaks
      return (
        <span key={index} className="whitespace-pre-line">
          {part}
        </span>
      );
    }
  });
};

const ResultsDetailCard = ({
  dimension,
  insight,
  isLoadingInsight
}: ResultsDetailCardProps) => {
  // Updated SALIMA color palette
  const dimensionColors = {
    'S': '#FD0100',
    // אסטרטגיה - red
    'A': '#2FA236',
    // אדפטיביות - green
    'L': '#333ED4',
    // למידה - blue
    'I': '#F76915',
    // השראה - orange
    'M': '#BF4ED6',
    // משמעות - purple
    'A2': '#EEDE04' // אותנטיות - yellow
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
    return dimensionColors[dimension as keyof typeof dimensionColors] || '#FD0100';
  };
  
  return <Card className="h-full">
      <CardHeader className="pb-3 sm:pb-4 lg:pb-6">
        <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <span className="text-salima-800 text-sm sm:text-base lg:text-lg">{dimension.title}</span>
          <Badge variant="outline" className={`${getIntensityColor(dimension.score)} text-white border-none text-xs sm:text-sm self-start sm:self-auto`}>
            {getIntensityText(dimension.score)}
          </Badge>
        </CardTitle>
        
      </CardHeader>
      
      <CardContent className="space-y-3 sm:space-y-4 pt-0">
        {/* Color Intensity Bar */}
        <ColorIntensityBar score={dimension.score} color={getDimensionColor(dimension.dimension)} dimensionName={getDimensionTitle(dimension.dimension)} />

        <div>
          {isLoadingInsight ? <div className="flex items-center justify-center p-3 sm:p-4">
              <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin mr-2" />
              <span className="text-xs sm:text-sm text-gray-600">טוען ניתוח...</span>
            </div> : insight ? <div className="text-xs sm:text-sm leading-relaxed text-gray-700 bg-gray-50 p-3 sm:p-4 rounded-lg border-r-4 border-salima-400">
              <div dir="rtl" className="text-xs sm:text-sm leading-relaxed">
                {renderFormattedText(insight)}
              </div>
            </div> : <div className="text-xs sm:text-sm leading-relaxed text-gray-500 bg-gray-50 p-3 sm:p-4 rounded-lg border-r-4 border-gray-300 italic">
              ניתוח מותאם אישית בהכנה...
            </div>}
        </div>
      </CardContent>
    </Card>;
};

export default ResultsDetailCard;
