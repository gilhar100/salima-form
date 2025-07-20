


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

  return (
    <div className="mt-6 sm:mt-8">
      <h2 className="font-bold text-salima-800 text-lg sm:text-xl mb-4">
        תובנות מותאמות אישית
      </h2>
      
      {/* Manual 2x3 grid layout */}
      <div className="grid gap-4 sm:gap-6 grid-cols-2" dir="rtl">
        
        {/* Row 1 - Top */}
        {/* Top right: אדפטיביות */}
        <div className="bg-white rounded-lg border shadow-sm p-4 sm:p-6">
          <h3 className="font-bold text-salima-800 text-base sm:text-lg mb-3 flex items-center gap-2">
            <span className="text-blue-600">📘</span>
            אדפטיביות
          </h3>
          <div className="text-sm sm:text-base leading-relaxed text-gray-700 whitespace-pre-line">
            {gptResults.insights.A}
          </div>
        </div>
        
        {/* Top left: אסטרטגיה */}
        <div className="bg-white rounded-lg border shadow-sm p-4 sm:p-6">
          <h3 className="font-bold text-salima-800 text-base sm:text-lg mb-3 flex items-center gap-2">
            <span className="text-blue-600">📘</span>
            אסטרטגיה
          </h3>
          <div className="text-sm sm:text-base leading-relaxed text-gray-700 whitespace-pre-line">
            {gptResults.insights.S}
          </div>
        </div>

        {/* Row 2 - Middle */}
        {/* Middle right: למידה */}
        <div className="bg-white rounded-lg border shadow-sm p-4 sm:p-6">
          <h3 className="font-bold text-salima-800 text-base sm:text-lg mb-3 flex items-center gap-2">
            <span className="text-blue-600">📘</span>
            לומד
          </h3>
          <div className="text-sm sm:text-base leading-relaxed text-gray-700 whitespace-pre-line">
            {gptResults.insights.L}
          </div>
        </div>
        
        {/* Middle left: השראה */}
        <div className="bg-white rounded-lg border shadow-sm p-4 sm:p-6">
          <h3 className="font-bold text-salima-800 text-base sm:text-lg mb-3 flex items-center gap-2">
            <span className="text-blue-600">📘</span>
            השראה
          </h3>
          <div className="text-sm sm:text-base leading-relaxed text-gray-700 whitespace-pre-line">
            {gptResults.insights.I}
          </div>
        </div>

        {/* Row 3 - Bottom */}
        {/* Bottom right: משמעות */}
        <div className="bg-white rounded-lg border shadow-sm p-4 sm:p-6">
          <h3 className="font-bold text-salima-800 text-base sm:text-lg mb-3 flex items-center gap-2">
            <span className="text-blue-600">📘</span>
            משמעות
          </h3>
          <div className="text-sm sm:text-base leading-relaxed text-gray-700 whitespace-pre-line">
            {gptResults.insights.M}
          </div>
        </div>
        
        {/* Bottom left: אותנטיות */}
        <div className="bg-white rounded-lg border shadow-sm p-4 sm:p-6">
          <h3 className="font-bold text-salima-800 text-base sm:text-lg mb-3 flex items-center gap-2">
            <span className="text-blue-600">📘</span>
            אותנטיות
          </h3>
          <div className="text-sm sm:text-base leading-relaxed text-gray-700 whitespace-pre-line">
            {gptResults.insights.A2}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ResultsGptInsights;


