
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

interface ArchetypeCalculationResponse {
  dominant_archetype: string;
  archetype_1: number;
  archetype_2: number;
  archetype_3: number;
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
      console.log('Checking if archetype calculation is needed for survey:', surveyId);
      
      // First, get the current survey data to check if dominant_archetype is empty
      const { data: surveyData, error: fetchError } = await supabase
        .from('survey_responses')
        .select('*')
        .eq('id', surveyId)
        .single();

      if (fetchError) {
        console.error('Error fetching survey data:', fetchError);
        return;
      }

      console.log('Survey data retrieved:', surveyData);

      // Check if dominant_archetype is empty or null
      if (!surveyData.dominant_archetype) {
        console.log('Dominant archetype is empty, calculating...');
        
        // Prepare the payload for the edge function
        const payload = {
          strategy: surveyData.strategy,
          adaptive: surveyData.dimension_a2, // Adaptive dimension
          authenticity: surveyData.dimension_a, // Authenticity dimension
          meaning: surveyData.dimension_m,
          learning: surveyData.dimension_l,
          inspiration: surveyData.dimension_i,
          q_91: surveyData.q91,
          q_92: surveyData.q92,
          q_93: surveyData.q93,
          q_94: surveyData.q94,
          q_95: surveyData.q95,
          q_96: surveyData.q96,
          q_97: surveyData.q97,
          q_98: surveyData.q98,
          q_99: surveyData.q99,
          q_100: surveyData.q100,
          q_101: surveyData.q101,
          q_102: surveyData.q102,
          q_103: surveyData.q103,
          q_104: surveyData.q104,
          q_105: surveyData.q105
        };

        console.log('Calling calculate-archetype edge function with payload:', payload);

        // Call the edge function
        const response = await fetch('https://lhmrghebdtcbhmgtbqfe.functions.supabase.co/calculate-archetype', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`Edge function call failed: ${response.status}`);
        }

        const archetypeData: ArchetypeCalculationResponse = await response.json();
        console.log('Archetype calculation response:', archetypeData);

        // Update the database with the calculated archetype data
        const { error: updateError } = await supabase
          .from('survey_responses')
          .update({
            dominant_archetype: archetypeData.dominant_archetype,
            archetype_1_score: archetypeData.archetype_1,
            archetype_2_score: archetypeData.archetype_2,
            archetype_3_score: archetypeData.archetype_3
          })
          .eq('id', surveyId);

        if (updateError) {
          console.error('Error updating survey with archetype data:', updateError);
          throw updateError;
        }

        console.log('Successfully updated survey with archetype data');

        // Update the local insights state with the new dominant archetype
        setInsights(prev => ({
          ...prev,
          dominant_archetype: archetypeData.dominant_archetype
        }));

        toast({
          title: "חישוב ארכיטיפ הושלם",
          description: "הסגנון הניהולי הדומיננטי חושב בהצלחה"
        });
      } else {
        console.log('Dominant archetype already exists:', surveyData.dominant_archetype);
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

    console.log('Loading results from localStorage:');
    console.log('- Results:', savedResults ? 'Found' : 'Not found');
    console.log('- Answers:', savedAnswers ? 'Found' : 'Not found');
    console.log('- Survey ID:', savedSurveyId);
    console.log('- GPT Results:', savedGptResults ? 'Found' : 'Not found');

    if (savedResults) {
      try {
        const parsedResults = JSON.parse(savedResults);
        setResults(parsedResults);
        console.log('Parsed results:', parsedResults);

        if (savedAnswers) {
          const parsedAnswers = JSON.parse(savedAnswers);
          setAnswers(parsedAnswers);
          console.log('Parsed answers:', parsedAnswers.length, 'answers');
        }

        if (savedSurveyId) {
          setSurveyId(savedSurveyId);
          console.log('Starting delayed insights fetch for survey ID:', savedSurveyId);
          fetchInsightsWithDelay(savedSurveyId);
          // Also check if archetype calculation is needed
          calculateArchetypeIfNeeded(savedSurveyId);
        } else {
          console.log('No survey ID found, insights will not be loaded');
        }

        if (savedGptResults) {
          const parsedGptResults = JSON.parse(savedGptResults);
          setGptResults(parsedGptResults);
          console.log('Loaded GPT results:', parsedGptResults);
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
      console.log('No results found in localStorage, redirecting to home');
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

    // Wait 2-3 seconds before fetching
    console.log('Waiting 2.5 seconds before fetching insights...');
    await new Promise(resolve => setTimeout(resolve, 2500));

    try {
      console.log('Fetching insights after delay for survey ID:', surveyId);
      const data = await getSurveyWithInsights(surveyId);
      console.log('Insights data received:', data);

      const fetchedInsights = {
        insight_strategy: data.insight_strategy,
        insight_adaptive: data.insight_adaptive,
        insight_learning: data.insight_learning,
        insight_inspiration: data.insight_inspiration,
        insight_meaning: data.insight_meaning,
        insight_authentic: data.insight_authentic,
        dominant_archetype: data.dominant_archetype
      };

      console.log('Setting insights state with:', fetchedInsights);
      console.log('Dominant archetype from database:', data.dominant_archetype);
      setInsights(fetchedInsights);

      // Check if any insights are available
      const hasAnyInsight = Object.values(fetchedInsights).some(insight => insight && insight.trim() !== '');
      setInsightsAvailable(hasAnyInsight);
      console.log('Insights availability check:', hasAnyInsight);
    } catch (error) {
      console.error('Error fetching insights:', error);
      setInsightsAvailable(false);
    } finally {
      setIsLoadingInsights(false);
    }
  };

  const handleRefreshInsights = () => {
    if (surveyId) {
      console.log('Manual refresh of insights requested');
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
