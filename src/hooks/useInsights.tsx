
import { useState, useEffect } from "react";
import { getSurveyWithInsights } from "@/lib/survey-service";

interface DatabaseInsights {
  insight_strategy?: string;
  insight_adaptive?: string;
  insight_learning?: string;
  insight_inspiration?: string;
  insight_meaning?: string;
  insight_authentic?: string;
  dominant_archetype?: string;
}

export const useInsights = (surveyId: string | null) => {
  const [insights, setInsights] = useState<DatabaseInsights>({});
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);
  const [insightsAvailable, setInsightsAvailable] = useState(false);

  const fetchInsightsWithDelay = async (surveyId: string) => {
    setIsLoadingInsights(true);

    // Wait 2.5 seconds before fetching
    await new Promise(resolve => setTimeout(resolve, 2500));

    try {
      const data = await getSurveyWithInsights(surveyId);
      
      const fetchedInsights = {
        insight_strategy: data.insight_strategy,
        insight_adaptive: data.insight_adaptive,
        insight_learning: data.insight_learning,
        insight_inspiration: data.insight_inspiration,
        insight_meaning: data.insight_meaning,
        insight_authentic: data.insight_authentic,
        dominant_archetype: data.dominant_archetype
      };

      setInsights(fetchedInsights);

      // Check if any insights are available
      const hasAnyInsight = Object.values(fetchedInsights).some(insight => insight && insight.trim() !== '');
      setInsightsAvailable(hasAnyInsight);
    } catch (error) {
      console.error('Error fetching insights:', error);
      setInsightsAvailable(false);
    } finally {
      setIsLoadingInsights(false);
    }
  };

  useEffect(() => {
    if (surveyId) {
      fetchInsightsWithDelay(surveyId);
    }
  }, [surveyId]);

  const handleRefreshInsights = () => {
    if (surveyId) {
      fetchInsightsWithDelay(surveyId);
    }
  };

  return {
    insights,
    isLoadingInsights,
    insightsAvailable,
    handleRefreshInsights
  };
};
