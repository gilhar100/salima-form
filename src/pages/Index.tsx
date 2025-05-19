
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-50 p-4">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-salima-800">SALIMA-WOCA</h1>
        <h2 className="text-2xl font-semibold mb-6 text-salima-600">מערכת אבחון מנהיגות ארגונית</h2>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">ברוכים הבאים למערכת האבחון הארגוני</CardTitle>
            <CardDescription>
              כלי להערכת יכולות מנהיגות ופיתוח אישי וארגוני
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <p className="mb-4">
              מערכת SALIMA-WOCA היא כלי אבחון ארגוני מקיף המבוסס על שאלון מנהיגות הכולל 90 היגדים,
              המסווגים לשישה ממדים מרכזיים:
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
              <div className="p-3 bg-salima-50 rounded-lg border border-salima-100">
                <strong className="text-salima-700">S</strong> - אסטרטג
              </div>
              <div className="p-3 bg-salima-50 rounded-lg border border-salima-100">
                <strong className="text-salima-700">L</strong> - לומד
              </div>
              <div className="p-3 bg-salima-50 rounded-lg border border-salima-100">
                <strong className="text-salima-700">I</strong> - השראה
              </div>
              <div className="p-3 bg-salima-50 rounded-lg border border-salima-100">
                <strong className="text-salima-700">M</strong> - משמעות
              </div>
              <div className="p-3 bg-salima-50 rounded-lg border border-salima-100">
                <strong className="text-salima-700">A</strong> - אדפטיבי
              </div>
              <div className="p-3 bg-salima-50 rounded-lg border border-salima-100">
                <strong className="text-salima-700">A2</strong> - אותנטיות
              </div>
            </div>
            
            <p>
              לאחר השלמת השאלון, תקבל/י דוח מפורט עם ניתוח של הפרופיל האישי שלך, כולל גרף רדאר המציג את החוזקות והתחומים לשיפור.
            </p>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <Button 
              className="bg-salima-600 hover:bg-salima-700 text-lg px-8"
              onClick={() => navigate('/survey')}
            >
              התחל את השאלון
            </Button>
          </CardFooter>
        </Card>
        
        <div className="text-gray-600 text-sm">
          <p>מערכת SALIMA-WOCA © כל הזכויות שמורות</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
