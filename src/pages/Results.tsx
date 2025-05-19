
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SurveyResult } from "@/lib/types";
import ResultsRadar from "@/components/ResultsRadar";
import ResultsDetailCard from "@/components/ResultsDetailCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<SurveyResult | null>(null);
  
  useEffect(() => {
    // טעינת התוצאות מ-localStorage
    const savedResults = localStorage.getItem('salimaResults');
    
    if (savedResults) {
      setResults(JSON.parse(savedResults));
    } else {
      // אם אין תוצאות, מעבר בחזרה לשאלון
      navigate('/survey');
    }
  }, [navigate]);
  
  if (!results) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">טוען תוצאות...</p>
      </div>
    );
  }
  
  // פונקציה להדפסת התוצאות
  const handlePrint = () => {
    window.print();
  };
  
  // פונקציה לשליחת התוצאות במייל (לדוגמה בלבד)
  const handleSendEmail = () => {
    alert(`התוצאות נשלחו לכתובת: ${results.userInfo.email}`);
    // כאן יש לממש את הלוגיקה של שליחת מייל
  };
  
  // פונקציה להתחלת שאלון חדש
  const handleNewSurvey = () => {
    localStorage.removeItem('salimaResults');
    navigate('/survey');
  };

  return (
    <div className="container max-w-4xl mx-auto py-6 print:py-0">
      <div className="mb-8 text-center print:mb-4">
        <h1 className="text-3xl font-bold text-salima-800 mb-2">תוצאות שאלון מנהיגות SALIMA-WOCA</h1>
        <p className="text-gray-600">
          שם: {results.userInfo.name} | תאריך: {new Date(results.date).toLocaleDateString('he-IL')}
        </p>
        {results.userInfo.organization && (
          <p className="text-gray-600">
            ארגון: {results.userInfo.organization}
            {results.userInfo.department && ` | מחלקה: ${results.userInfo.department}`}
            {results.userInfo.position && ` | תפקיד: ${results.userInfo.position}`}
          </p>
        )}
      </div>
      
      <div className="print:hidden">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">סקירה כללית</TabsTrigger>
            <TabsTrigger value="detailed">פירוט ממדים</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-4">
            <ResultsRadar result={results} />
            
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>פרשנות כללית</CardTitle>
                  <CardDescription>תובנות מרכזיות מהשאלון</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <p className="mb-4">
                    ציון ה-SLQ הכללי שלך הוא <strong>{results.slq}</strong> מתוך 5, המייצג את הממוצע של ששת הממדים המרכיבים את פרופיל המנהיגות שלך.
                  </p>
                  
                  {results.slq >= 4 ? (
                    <p>
                      הציון שלך מצביע על רמה גבוהה של מנהיגות בששת ממדי SALIMA-WOCA. אתה מפגין יכולות טובות בחשיבה אסטרטגית, למידה מתמדת, יצירת השראה, יצירת משמעות, אדפטיביות ואותנטיות. המשך לחזק ממדים אלו.
                    </p>
                  ) : results.slq >= 3 ? (
                    <p>
                      הציון שלך מצביע על רמה בינונית-טובה של מנהיגות. ישנם מספר ממדים חזקים בפרופיל שלך, וכדאי לבחון אילו ממדים נמצאים ברמה נמוכה יותר ולעבוד על חיזוקם.
                    </p>
                  ) : (
                    <p>
                      הציון שלך מצביע על צורך בפיתוח כישורי מנהיגות בחלק מהממדים. מומלץ לבחון את הממדים בעלי הציון הנמוך ולהתמקד בפיתוחם.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="detailed" className="mt-4 space-y-4">
            {Object.values(results.dimensions).map((dimension) => (
              <ResultsDetailCard key={dimension.dimension} dimension={dimension} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
      
      {/* תצוגת הדפסה */}
      <div className="hidden print:block mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-bold mb-4">סקירה כללית</h2>
            <ResultsRadar result={results} />
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4">פרשנות כללית</h2>
            <p className="mb-4">
              ציון ה-SLQ הכללי שלך הוא <strong>{results.slq}</strong> מתוך 5, המייצג את הממוצע של ששת הממדים המרכיבים את פרופיל המנהיגות שלך.
            </p>
            
            {results.slq >= 4 ? (
              <p>
                הציון שלך מצביע על רמה גבוהה של מנהיגות בששת ממדי SALIMA-WOCA. אתה מפגין יכולות טובות בחשיבה אסטרטגית, למידה מתמדת, יצירת השראה, יצירת משמעות, אדפטיביות ואותנטיות. המשך לחזק ממדים אלו.
              </p>
            ) : results.slq >= 3 ? (
              <p>
                הציון שלך מצביע על רמה בינונית-טובה של מנהיגות. ישנם מספר ממדים חזקים בפרופיל שלך, וכדאי לבחון אילו ממדים נמצאים ברמה נמוכה יותר ולעבוד על חיזוקם.
              </p>
            ) : (
              <p>
                הציון שלך מצביע על צורך בפיתוח כישורי מנהיגות בחלק מהממדים. מומלץ לבחון את הממדים בעלי הציון הנמוך ולהתמקד בפיתוחם.
              </p>
            )}
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <h2 className="text-xl font-bold mb-4">פירוט הממדים</h2>
        <div className="space-y-4">
          {Object.values(results.dimensions).map((dimension) => (
            <ResultsDetailCard key={dimension.dimension} dimension={dimension} />
          ))}
        </div>
      </div>
      
      <div className="mt-8 flex flex-wrap gap-3 justify-center print:hidden">
        <Button onClick={handlePrint} variant="outline">
          הדפס תוצאות
        </Button>
        <Button onClick={handleSendEmail} variant="outline">
          שלח במייל
        </Button>
        <Button onClick={handleNewSurvey} className="bg-salima-600 hover:bg-salima-700">
          התחל שאלון חדש
        </Button>
      </div>
    </div>
  );
};

export default Results;
