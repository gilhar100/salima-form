import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SurveyResult } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { getSurveyWithInsights } from "@/lib/survey-service";
import { supabase } from "@/integrations/supabase/client";

interface DatabaseInsights {
  insight_strategy?: string;
  insight_adaptive?: string;
  insight_learning?: string;
  insight_inspiration?: string;
  insight_meaning?: string;
  insight_authentic?: string;
  dominant_archetype?: string;
}

interface GPTResults {
  insights: {
    אסטרטגיה: string;
    אדפטיביות: string;
    לומד: string;
    השראה: string;
    משמעות: string;
    אותנטיות: string;
  };
}

export const useResultsData = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [results, setResults] = useState<SurveyResult | null>(null);
  const [answers, setAnswers] = useState<{ questionId: number; value: number; }[]>([]);
  const [insights, setInsights] = useState<DatabaseInsights>({});
  const [gptResults, setGptResults] = useState<GPTResults | null>(null);
  const [surveyId, setSurveyId] = useState<string | null>(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);
  const [insightsAvailable, setInsightsAvailable] = useState(false);

  const calculateArchetypeIfNeeded = async (surveyId: string) => {
    try {
      const { data: surveyData, error: fetchError } = await supabase
        .from('survey_responses')
        .select('*')
        .eq('id', surveyId)
        .single();

      if (fetchError) {
        console.error('Error fetching survey data:', fetchError);
        return;
      }

      if (!surveyData.dominant_archetype) {
        const getScore = (key: string) => typeof surveyData[key] === "number" ? surveyData[key] : 0;

        const strategyAdaptiveAvg = (surveyData.strategy + surveyData.dimension_adaptive) / 2;
        const authenticityMeaningAvg = (surveyData.dimension_authentic + surveyData.dimension_m) / 2;
        const learningInspirationAvg = (surveyData.dimension_l + surveyData.dimension_i) / 2;

        const opportunityAvg = (
          getScore('q91') + getScore('q94') + getScore('q97') + getScore('q101') + getScore('q103')
        ) / 5;

        const empoweringAvg = (
          getScore('q92') + getScore('q95') + getScore('q99') + getScore('q102') + getScore('q104')
        ) / 5;

        const curiousAvg = (
          getScore('q93') + getScore('q96') + getScore('q98') + getScore('q100') + getScore('q105')
        ) / 5;

        const archetype_1 = 0.7 * strategyAdaptiveAvg + 0.3 * opportunityAvg;
        const archetype_2 = 0.7 * authenticityMeaningAvg + 0.3 * empoweringAvg;
        const archetype_3 = 0.7 * learningInspirationAvg + 0.3 * curiousAvg;

        const archetypeScores = [
          { key: "מנהל ההזדמנות", score: archetype_1 },
          { key: "המנהל המעצים", score: archetype_2 },
          { key: "המנהל הסקרן", score: archetype_3 }
        ];

        archetypeScores.sort((a, b) => b.score - a.score);
        const dominant_archetype = archetypeScores[0].key;

        const { error: updateError } = await supabase
          .from('survey_responses')
          .update({
            dominant_archetype,
            archetype_1_score: archetype_1,
            archetype_2_score: archetype_2,
            archetype_3_score: archetype_3
          })
          .eq('id', surveyId);

        if (updateError) {
          console.error('Error updating archetype data:', updateError);
          throw updateError;
        }

        setInsights(prev => ({
          ...prev,
          dominant_archetype
        }));

        toast({
          title: "חישוב ארכיטיפ הושלם",
          description: "הסגנון הניהולי הדומיננטי חושב בהצלחה"
        });
      }
    } catch (error) {
      console.error('Error calculating archetype:', error);
      toast({
        title: "שגיאה בחישוב הארכיטיפ",
        description: "אירעה שגיאה בחישוב הסגנון הניהולי הדומיננטי",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    const savedResults = localStorage.getItem('salimaResults');
    const savedAnswers = localStorage.getItem('salimaAnswers');
    const savedSurveyId = localStorage.getItem('salimaSurveyId');
    const savedGptResults = localStorage.getItem('gptResults');

    if (savedResults) {
      try {
        const parsedResults = JSON.parse(savedResults);
        setResults(parsedResults);

        if (savedAnswers) {
          const parsedAnswers = JSON.parse(savedAnswers);
          setAnswers(parsedAnswers);
        }

        if (savedSurveyId) {
          setSurveyId(savedSurveyId);
          fetchInsightsWithDelay(savedSurveyId);
          calculateArchetypeIfNeeded(savedSurveyId);
        }

        if (savedGptResults) {
          const parsedGptResults = JSON.parse(savedGptResults);
          setGptResults(parsedGptResults);
        }

        toast({
          title: "תוצאות השאלון",
          description: "הנתונים כבר נשמרו במערכת בהצלחה"
        });
      } catch (error) {
        console.error('Error parsing saved results:', error);
        toast({
          title: "שגיאה בטעינת התוצאות",
          description: "אירעה שגיאה בטעינת התוצאות השמורות",
          variant: "destructive"
        });
        navigate('/');
      }
    } else {
      toast({
        title: "לא נמצאו תוצאות",
        description: "אנא מלא/י את השאלון תחילה",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [navigate, toast]);

  const fetchInsightsWithDelay = async (surveyId: string) => {
    setIsLoadingInsights(true);
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

      const hasAnyInsight = Object.values(fetchedInsights).some(insight => insight && insight.trim() !== '');
      setInsightsAvailable(hasAnyInsight);
    } catch (error) {
      console.error('Error fetching insights:', error);
      setInsightsAvailable(false);
    } finally {
      setIsLoadingInsights(false);
    }
  };

  const handleRefreshInsights = () => {
    if (surveyId) {
      fetchInsightsWithDelay(surveyId);
    }
  };

  return {
    results,
    answers,
    insights,
    gptResults,
    surveyId,
    isLoadingInsights,
    insightsAvailable,
    handleRefreshInsights
  };
};