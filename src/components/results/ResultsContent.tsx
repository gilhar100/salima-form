
import { useState } from "react";
import { SurveyResult } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import BellCurveVisualization from "@/components/BellCurveVisualization";
import { getSurveyWithInsights } from "@/lib/survey-service";
import ResultsHeader from "@/components/results/ResultsHeader";
import ResultsScoreDisplay from "@/components/results/ResultsScoreDisplay";
import ResultsDominantArchetype from "@/components/results/ResultsDominantArchetype";
import ResultsSummaryCards from "@/components/results/ResultsSummaryCards";
import ResultsCharts from "@/components/results/ResultsCharts";
import ResultsAnalysis from "@/components/results/ResultsAnalysis";
import ResultsActions from "@/components/results/ResultsActions";
import ResultsGptInsights from "@/components/results/ResultsGptInsights";

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

interface ResultsContentProps {
  results: SurveyResult;
  answers: { questionId: number; value: number; }[];
  insights: DatabaseInsights;
  gptResults: GPTResults | null;
  surveyId: string | null;
  isLoadingInsights: boolean;
  insightsAvailable: boolean;
  onRefreshInsights: () => void;
}

const ResultsContent: React.FC<ResultsContentProps> = ({
  results,
  answers,
  insights,
  gptResults,
  surveyId,
  isLoadingInsights,
  insightsAvailable,
  onRefreshInsights
}) => {
  const highestDimension = Object.values(results.dimensions).reduce((prev, current) => 
    prev.score > current.score ? prev : current
  );

  const lowestDimension = Object.values(results.dimensions).reduce((prev, current) => 
    prev.score < current.score ? prev : current
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <div className="container py-4 sm:py-6 max-w-full xl:max-w-6xl mx-auto px-4 sm:px-6">
          <ResultsHeader />
          
          <Card className="mb-4 sm:mb-6 bg-gradient-to-r from-salima-50 to-blue-50">
            <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
              <ResultsScoreDisplay slq={results.slq} />
              
              <ResultsDominantArchetype dominantArchetype={insights.dominant_archetype} />
              
              <ResultsSummaryCards 
                highestDimension={highestDimension}
                lowestDimension={lowestDimension}
              />
              
              <ResultsCharts result={results} />
              
              <ResultsAnalysis
                result={results}
                answers={answers}
                insights={insights}
                isLoadingInsights={isLoadingInsights}
                insightsAvailable={insightsAvailable}
                onRefreshInsights={onRefreshInsights}
                surveyId={surveyId}
              />
              
              <div className="text-center text-green-600 font-medium print:hidden text-base sm:text-lg">
                ✓ הנתונים נשמרו בהצלחה במערכת
              </div>
            </CardContent>
          </Card>
          
          <div className="mb-6 sm:mb-8 chart-container">
            <BellCurveVisualization userScore={results.slq} />
          </div>
          
          <ResultsActions />
        </div>
      </div>
      
      <div className="text-center text-black p-4 text-sm sm:text-base">
        ™ כל הזכויות שמורות לד״ר יוסי שרעבי
      </div>
    </div>
  );
};

export default ResultsContent;
