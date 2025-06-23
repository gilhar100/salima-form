
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DimensionResult } from "@/lib/types";
import { getEnhancedPersonalizedAnalysis } from "@/lib/analysis/enhanced-personalized-analysis";

interface ResultsDetailCardProps {
  dimension: DimensionResult;
  answers: { questionId: number; value: number; }[];
}

const ResultsDetailCard = ({ dimension, answers }: ResultsDetailCardProps) => {
  const [analysis, setAnalysis] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateAnalysis = async () => {
      setIsLoading(true);
      try {
        // יצירת מזהה משתמש יציב על בסיס התשובות
        const userIdentifier = answers.map(a => `${a.questionId}-${a.value}`).join(',');
        const analysisText = await getEnhancedPersonalizedAnalysis(
          dimension.dimension, 
          answers.map(a => ({ questionId: a.questionId, value: a.value })),
          userIdentifier
        );
        setAnalysis(analysisText);
      } catch (error) {
        console.error('Error generating analysis:', error);
        setAnalysis("שגיאה ביצירת ניתוח עבור ממד זה.");
      } finally {
        setIsLoading(false);
      }
    };

    generateAnalysis();
  }, [dimension.dimension, answers]);

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
        {isLoading ? (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-salima-600"></div>
          </div>
        ) : (
          <div className="text-sm leading-relaxed text-gray-700 bg-gray-50 p-4 rounded-lg">
            {analysis}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultsDetailCard;
