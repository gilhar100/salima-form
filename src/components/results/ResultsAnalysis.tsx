import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import { SurveyResult } from "@/lib/types";
import ResultsDetailCard from "@/components/ResultsDetailCard";

interface DatabaseInsights {
  insight_strategy?: string;
  insight_adaptive?: string;
  insight_learning?: string;
  insight_inspiration?: string;
  insight_meaning?: string;
  insight_authentic?: string;
  dominant_archetype?: string;
}

interface ArchetypeInsights {
  [key: string]: string;
}

interface ResultsAnalysisProps {
  result: SurveyResult;
  answers: { questionId: number; value: number; }[];
  insights: DatabaseInsights;
  isLoadingInsights: boolean;
  insightsAvailable: boolean;
  onRefreshInsights: () => void;
  surveyId: string | null;
}

// Helper function to get the appropriate insight for each dimension
const getInsightForDimension = (dimension: string, insights: DatabaseInsights): string | undefined => {
  const dimensionInsightMap: Record<string, keyof DatabaseInsights> = {
    'S': 'insight_strategy',
    'L': 'insight_learning',
    'I': 'insight_inspiration',
    'M': 'insight_meaning',
    'A': 'insight_adaptive',
    'A2': 'insight_authentic'
  };

  const insightKey = dimensionInsightMap[dimension];
  return insightKey && insights[insightKey] && insights[insightKey]!.trim() !== '' ? insights[insightKey] : undefined;
};

const ResultsAnalysis: React.FC<ResultsAnalysisProps> = ({
  result,
  answers,
  insights,
  isLoadingInsights,
  insightsAvailable,
  onRefreshInsights,
  surveyId
}) => {
  const [archetypeInsights, setArchetypeInsights] = useState<ArchetypeInsights>({});
  const [isLoadingArchetypes, setIsLoadingArchetypes] = useState(false);
  const [archetypeError, setArchetypeError] = useState(false);

  const fetchArchetypeInsights = async () => {
    if (!surveyId) return;
    
    setIsLoadingArchetypes(true);
    setArchetypeError(false);
    
    try {
      const response = await fetch('https://lhmrghebdtcbhmgtbqfe.functions.supabase.co/salima_archetypes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          record_id: surveyId
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      setArchetypeInsights(data);
    } catch (error) {
      console.error('Error fetching archetype insights:', error);
      setArchetypeError(true);
    } finally {
      setIsLoadingArchetypes(false);
    }
  };

  // Fixed order: top-left to bottom-right
  const fixedDimensionOrder = ['S', 'A', 'I', 'L', 'A2', 'M'];

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
        <h2 className="font-bold text-salima-800 text-base sm:text-lg lg:text-xl">
          ניתוח מפורט לכל ממד
        </h2>
        {!isLoadingInsights && !insightsAvailable && (
          <Button 
            onClick={onRefreshInsights} 
            variant="outline" 
            className="flex items-center gap-2 print:hidden text-xs sm:text-sm lg:text-base w-full sm:w-auto px-3 py-2"
          >
            <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
            רענן תובנות
          </Button>
        )}
      </div>
      
      {isLoadingInsights && (
        <div className="text-center text-black mb-3 sm:mb-4 p-3 sm:p-4 bg-blue-50 rounded-lg print:hidden text-xs sm:text-sm lg:text-base">
          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin inline-block mr-2" />
          התובנות נטענות כעת... אנא המתן מספר שניות
        </div>
      )}
      
      {!isLoadingInsights && !insightsAvailable && (
        <div className="text-center text-orange-600 mb-3 sm:mb-4 p-3 sm:p-4 bg-orange-50 rounded-lg print:hidden text-xs sm:text-sm lg:text-base">
          התובנות נטענות כעת... אנא המתן מספר שניות והטען מחדש
        </div>
      )}

      <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-1 xl:grid-cols-2 rtl text-right">
        {fixedDimensionOrder.map(dimensionKey => {
          const dimension = result.dimensions[dimensionKey];
          return (
            <ResultsDetailCard 
              key={dimensionKey}
              dimension={dimension}
              answers={answers}
              insight={getInsightForDimension(dimensionKey, insights)}
              isLoadingInsight={isLoadingInsights}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ResultsAnalysis;