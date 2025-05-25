
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
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-salima-800">SALIMA-WOCA</h1>
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6 text-salima-600 px-2">מערכת אבחון מנהיגות ארגונית</h2>
        
        <Card className="mb-6 sm:mb-8 shadow-lg">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-lg sm:text-xl">ברוכים הבאים למערכת האבחון הארגוני</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              כלי להערכת יכולות מנהיגות ופיתוח אישי וארגוני
            </CardDescription>
          </CardHeader>
          
          <CardContent className="px-4 sm:px-6">
            <p className="mb-4 text-sm sm:text-base leading-relaxed">
              מערכת SALIMA-WOCA היא כלי אבחון ארגוני מקיף המבוסס על שאלון מנהיגות הכולל 90 היגדים.
            </p>
            
            <p className="text-sm sm:text-base leading-relaxed">
              לאחר השלמת השאלון, תוצאות השאלון יועברו למערכת לצורך ניתוח.
            </p>
          </CardContent>
          
          <CardFooter className="flex justify-center px-4 sm:px-6">
            <Button 
              className={`bg-salima-600 hover:bg-salima-700 text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3 ${isMobile ? 'w-full' : 'w-auto'}`}
              onClick={() => navigate('/survey')}
            >
              התחל את השאלון
            </Button>
          </CardFooter>
        </Card>
        
        <div className="text-gray-600 text-xs sm:text-sm px-4">
          <p>מערכת SALIMA-WOCA © כל הזכויות שמורות</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
