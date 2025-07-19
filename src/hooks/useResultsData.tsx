
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SurveyResult } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
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
      console.log('Raw dominant_archetype value:', data.dominant_archetype);
      console.log('Type of dominant_archetype:', typeof data.dominant_archetype);

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

  console.log('useResultsData returning insights:', insights);
  console.log('Current insights.dominant_archetype:', insights.dominant_archetype);

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
