
interface GPTResults {
  insights: {
    S: string;
    A: string;
    L: string;
    I: string;
    M: string;
    A2: string;
  };
}

interface ResultsGptInsightsProps {
  gptResults: GPTResults | null;
}

const ResultsGptInsights: React.FC<ResultsGptInsightsProps> = ({ gptResults }) => {
  if (!gptResults || !gptResults.insights) {
    return null;
  }

  // Use the actual keys from the GPT results in the correct order
  // Based on edge function logs: S, A, L, I, M, A2
  const keyMapping: Record<string, string> = {
    'S': 'אסטרטגיה',
    'A': 'אדפטיביות', 
    'L': 'לומד',
    'I': 'השראה',
    'M': 'משמעות',
    'A2': 'אותנטיות'
  };
  
  const orderedKeys = ['S', 'A', 'L', 'I', 'M', 'A2'];

  return (
    <div className="mt-6 sm:mt-8">
      <h2 className="font-bold text-salima-800 text-lg sm:text-xl mb-4">
        תובנות מותאמות אישית
      </h2>
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        {orderedKeys.map((key) => {
          const content = gptResults.insights[key as keyof typeof gptResults.insights];
          const hebrewLabel = keyMapping[key];
          if (!content || !hebrewLabel) return null;
          
          return (
            <div 
              key={key} 
              className="bg-white rounded-lg border shadow-sm p-4 sm:p-6"
              dir="rtl"
            >
              <h3 className="font-bold text-salima-800 text-base sm:text-lg mb-3 flex items-center gap-2">
                <span className="text-blue-600">📘</span>
                {hebrewLabel}
              </h3>
              <div className="text-sm sm:text-base leading-relaxed text-gray-700 whitespace-pre-line">
                {content}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResultsGptInsights;
