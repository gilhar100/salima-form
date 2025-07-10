
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import QuestionFetcher from "@/components/QuestionFetcher";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-salima-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <img 
            src="/lovable-uploads/97bb30f6-a7bc-4ce4-a840-c7e1bd4b4c3f.png" 
            alt="SALIMA Logo" 
            className="mx-auto mb-8 h-32 w-auto"
          />
          
          <h1 className="text-5xl font-bold text-salima-800 mb-6">
            ברוכים הבאים לשאלון SALIMA
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            השאלון המוביל לאבחון ופיתוח מנהיגות אסטרטגית. גלו את כישורי המנהיגות שלכם ואת הדרכים לפיתוחם.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/survey-selection">
              <Button 
                size="lg" 
                className="bg-salima-600 hover:bg-salima-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                התחל במילוי השאלון
              </Button>
            </Link>
            
            <Link to="/statistics">
              <Button 
                variant="outline" 
                size="lg"
                className="border-salima-600 text-salima-600 hover:bg-salima-50 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                צפייה בסטטיסטיקות
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <div className="w-16 h-16 bg-salima-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="text-salima-600 text-2xl font-bold">S</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">אסטרטגיה</h3>
            <p className="text-gray-600 text-center">
              יכולת לראות תמונה גדולה, לתכנן ארוך טווח ולהוביל שינוי אסטרטגי
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <div className="w-16 h-16 bg-salima-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="text-salima-600 text-2xl font-bold">L</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">למידה</h3>
            <p className="text-gray-600 text-center">
              סקרנות, פתיחות לידע חדש ויכולת להתפתח ולהסתגל
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <div className="w-16 h-16 bg-salima-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="text-salima-600 text-2xl font-bold">I</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">השראה</h3>
            <p className="text-gray-600 text-center">
              יכולת להניע, לעורר השראה ולהוביל אחרים למימוש מטרות
            </p>
          </div>
        </div>

        {/* Debug section - will be removed after questions are verified */}
        <div className="mt-16">
          <QuestionFetcher />
        </div>
      </div>
    </div>
  );
};

export default Index;
