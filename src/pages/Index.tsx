
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-50 p-4">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-salima-800">SALIMA</h1>
        
        <Card className="mb-6 sm:mb-8 shadow-lg">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-lg sm:text-xl">ברוכים הבאים למערכת OPPORTUNITY</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              כלי להערכת יכולות מנהיגות ופיתוח אישי וארגוני
            </CardDescription>
          </CardHeader>
          
          <CardContent className="px-4 sm:px-6">
            <p className="mb-4 text-sm sm:text-base leading-relaxed">
              מערכת SALIMA-WOCA היא כלי אבחון ארגוני מקיף המבוסס על שאלון מנהיגות הכולל 90 היגדים.
              המערכת מציעה שני סוגי שאלונים:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div 
                className="bg-salima-50 p-3 rounded-lg cursor-pointer hover:bg-salima-100 transition-colors border-2 border-transparent hover:border-salima-200"
                onClick={() => navigate('/survey?type=manager')}
              >
                <h3 className="font-semibold text-salima-800 mb-1">שאלון מנהלים - הערכה אישית</h3>
                <p>הערכה עצמית עם תוצאות מפורטות</p>
              </div>
              <div 
                className="bg-blue-50 p-3 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors border-2 border-transparent hover:border-blue-200"
                onClick={() => navigate('/survey?type=colleague')}
              >
                <h3 className="font-semibold text-blue-800 mb-1">שאלון עמיתים</h3>
                <p>הערכת מנהל על ידי עמית עבודה</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-black text-xs sm:text-sm px-4" style={{ fontSize: '16px' }}>
          <p>™ כל הזכויות שמורות לד״ר יוסי שרעבי</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
