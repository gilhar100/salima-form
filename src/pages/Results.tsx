
import { Loader2 } from "lucide-react";
import { useResultsData } from "@/hooks/useResultsData";
import ResultsContent from "@/components/results/ResultsContent";

const Results = () => {
  const {
    results,
    answers,
    insights,
    gptResults,
    surveyId,
    isLoadingInsights,
    insightsAvailable,
    handleRefreshInsights
  } = useResultsData();

  if (!results) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2 text-black text-base">טוען תוצאות...</span>
      </div>
    );
  }

  console.log('Rendering results page with data:', results);
  console.log('Insights data being passed:', insights);

  return (
    <ResultsContent 
      results={results}
      answers={answers}
      insights={insights}
      gptResults={gptResults}
      surveyId={surveyId}
      isLoadingInsights={isLoadingInsights}
      insightsAvailable={insightsAvailable}
      onRefreshInsights={handleRefreshInsights}
    />
  );
};

export default Results;
