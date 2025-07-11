
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

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="font-bold text-salima-800 text-lg sm:text-xl">
          ניתוח מפורט לכל ממד
        </h2>
        {!isLoadingInsights && !insightsAvailable && (
          <Button 
            onClick={onRefreshInsights} 
            variant="outline" 
            className="flex items-center gap-2 print:hidden text-sm sm:text-base w-full sm:w-auto"
          >
            <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
            רענן תובנות
          </Button>
        )}
      </div>
      
      {isLoadingInsights && (
        <div className="text-center text-black mb-4 p-3 sm:p-4 bg-blue-50 rounded-lg print:hidden text-sm sm:text-base">
          <Loader2 className="w-5 h-5 animate-spin inline-block mr-2" />
          התובנות נטענות כעת... אנא המתן מספר שניות
        </div>
      )}
      
      {!isLoadingInsights && !insightsAvailable && (
        <div className="text-center text-orange-600 mb-4 p-3 sm:p-4 bg-orange-50 rounded-lg print:hidden text-sm sm:text-base">
          התובנות נטענות כעת... אנא המתן מספר שניות והטען מחדש
        </div>
      )}
      
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        {Object.values(result.dimensions).map(dimension => (
          <ResultsDetailCard 
            key={dimension.dimension} 
            dimension={dimension} 
            answers={answers} 
            insight={getInsightForDimension(dimension.dimension, insights)} 
            isLoadingInsight={isLoadingInsights} 
          />
        ))}
      </div>

      {/* Archetype Insights Panel */}
      <div className="mt-6 sm:mt-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="font-bold text-salima-800 text-lg sm:text-xl">
            פסקאות אישיות מותאמות
          </h2>
          <Button 
            onClick={fetchArchetypeInsights} 
            variant="outline" 
            className="flex items-center gap-2 print:hidden text-sm sm:text-base w-full sm:w-auto"
            disabled={!surveyId || isLoadingArchetypes}
          >
            <RefreshCw className={`w-4 h-4 sm:w-5 sm:h-5 ${isLoadingArchetypes ? 'animate-spin' : ''}`} />
            טען פסקאות אישיות
          </Button>
        </div>

        {isLoadingArchetypes && (
          <div className="text-center text-black mb-4 p-3 sm:p-4 bg-blue-50 rounded-lg print:hidden text-sm sm:text-base">
            <Loader2 className="w-5 h-5 animate-spin inline-block mr-2" />
            טוען פסקאות אישיות...
          </div>
        )}

        {archetypeError && (
          <div className="text-center text-red-600 mb-4 p-3 sm:p-4 bg-red-50 rounded-lg text-sm sm:text-base" dir="rtl">
            אירעה שגיאה בעת יצירת הפסקאות האישיות. אנא נסו לרענן את הדף או צרו קשר עם צוות OPPORTUNITY.
          </div>
        )}

        {Object.keys(archetypeInsights).length > 0 && !isLoadingArchetypes && (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
            {Object.entries(archetypeInsights).map(([key, content]) => (
              <div 
                key={key} 
                className="bg-white rounded-lg border shadow-sm p-4 sm:p-6"
                dir="rtl"
              >
                <h3 className="font-bold text-salima-800 text-base sm:text-lg mb-3">
                  {key}
                </h3>
                <div className="text-sm sm:text-base leading-relaxed text-gray-700 whitespace-pre-line">
                  {content}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsAnalysis;
