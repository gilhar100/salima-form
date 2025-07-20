import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SurveyResult, Answer } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { getSurveyWithInsights } from "@/lib/survey-service";
import { supabase } from "@/integrations/supabase/client";
import { calculateDominantArchetype } from "@/lib/archetype-logic";

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
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [insights, setInsights] = useState<DatabaseInsights>({});
  const [gptResults, setGptResults] = useState<GPTResults | null>(null);
  const [surveyId, setSurveyId] = useState<string | null>(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);
  const [insightsAvailable, setInsightsAvailable] = useState(false);

  const calculateArchetypeIfNeeded = async (surveyId: string, parsedAnswers: Answer[]) => {
    try {
      console.log('🔍 ARCHETYPE: Checking if archetype calculation is needed for survey:', surveyId);

      const { data: surveyData, error: fetchError } = await supabase
        .from('survey_responses')
        .select('*')
        .eq('id', surveyId)
        .single();

      if (fetchError) {
        console.error('❌ ARCHETYPE: Error fetching survey data:', fetchError);
        return;
      }

      console.log('📊 ARCHETYPE: Survey data retrieved, dominant_archetype =', surveyData.dominant_archetype);

      if (!surveyData.dominant_archetype) {
        const dominant = calculateDominantArchetype(parsedAnswers);

        console.log('✅ ARCHETYPE: Calculated dominant archetype:', dominant);

        const { error: updateError } = await supabase
          .from('survey_responses')
          .update({ dominant_archetype: dominant })
          .eq('id', surveyId);

        if (updateError) {
          console.error('Error updating survey with dominant archetype:', updateError);
          throw updateError;
        }

        setInsights(prev => ({
          ...prev,
          dominant_archetype: dominant
        }));

        toast({
          title: "חישוב ארכיטיפ הושלם",
          description: "הסגנון הניהולי הדומיננטי חושב בהצלחה"
        });
      } else {
        console.log('🟢 ARCHETYPE: Dominant archetype already exists:', surveyData.dominant_archetype);
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
    console.log('Results page mounted, checking localStorage...');
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

          if (savedSurveyId) {
            setSurveyId(savedSurveyId);
            fetchInsightsWithDelay(savedSurveyId);
            calculateArchetypeIfNeeded(savedSurveyId, parsedAnswers);
          }
        }

        if (savedGptResults) {
          setGptResults(JSON.parse(savedGptResults));
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
      setInsightsAvailable(Object.values(fetchedInsights).some(i => i && i.trim() !== ''));
    } catch (error) {
      console.error('Error fetching insights:', error);
      setInsightsAvailable(false);
    } finally {
      setIsLoadingInsights(false);
    }
  };

  const handleRefreshInsights = () => {
    if (surveyId) fetchInsightsWithDelay(surveyId);
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