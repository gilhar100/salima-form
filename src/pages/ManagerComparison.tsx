
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getManagerComparisonData } from "@/lib/survey-service";
import ManagerComparisonChart from "@/components/ManagerComparisonChart";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Loader2, Search } from "lucide-react";

const ManagerComparison = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [searchParams] = useSearchParams();
  
  const [managerName, setManagerName] = useState(searchParams.get('manager') || '');
  const [managerEmail, setManagerEmail] = useState('');
  const [managerData, setManagerData] = useState([]);
  const [colleagueData, setColleagueData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!managerName.trim()) {
      toast({
        title: "שגיאה",
        description: "נא להזין שם מנהל לחיפוש",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const data = await getManagerComparisonData(managerName.trim(), managerEmail.trim() || undefined);
      setManagerData(data.managerData);
      setColleagueData(data.colleagueData);
      setHasSearched(true);

      if (data.managerData.length === 0 && data.colleagueData.length === 0) {
        toast({
          title: "לא נמצאו נתונים",
          description: `לא נמצאו נתונים עבור המנהל ${managerName}`,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('שגיאה בחיפוש נתונים:', error);
      toast({
        title: "שגיאה בחיפוש",
        description: "אירעה שגיאה בעת חיפוש הנתונים",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchParams.get('manager')) {
      handleSearch();
    }
  }, []);

  return (
    <div className="container max-w-6xl mx-auto py-4 px-4">
      <div className="mb-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-salima-800 mb-2">
          השוואת דירוגים - מנהל מול עמיתים
        </h1>
        <p className="text-sm sm:text-base text-gray-600 px-2">
          חפש מנהל ספציפי להשוואה בין הדירוג העצמי לדירוג העמיתים
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">חיפוש מנהל</CardTitle>
          <CardDescription>
            הזן שם המנהל (חובה) ואימייל (אופציונלי) לחיפוש מדויק יותר
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="managerName">שם המנהל *</Label>
              <Input
                id="managerName"
                value={managerName}
                onChange={(e) => setManagerName(e.target.value)}
                placeholder="הזן שם מנהל"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="managerEmail">אימייל המנהל (אופציונלי)</Label>
              <Input
                id="managerEmail"
                type="email"
                value={managerEmail}
                onChange={(e) => setManagerEmail(e.target.value)}
                placeholder="הזן אימייל מנהל"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
          </div>
          <Button 
            onClick={handleSearch} 
            disabled={loading || !managerName.trim()}
            className="w-full sm:w-auto"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                מחפש...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                חפש
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {hasSearched && (managerData.length > 0 || colleagueData.length > 0) && (
        <ManagerComparisonChart
          managerData={managerData}
          colleagueData={colleagueData}
          managerName={managerName}
        />
      )}

      {hasSearched && managerData.length === 0 && colleagueData.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <h3 className="text-lg font-semibold mb-2">לא נמצאו נתונים</h3>
            <p className="text-gray-600 mb-4">
              לא נמצאו נתונים עבור המנהל "{managerName}". 
              ייתכן שהמנהל עדיין לא מילא שאלון או שלא נאספו הערכות עמיתים.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => navigate('/survey?type=manager')}>
                מלא שאלון מנהל
              </Button>
              <Button variant="outline" onClick={() => navigate('/survey?type=colleague')}>
                הערך מנהל
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mt-6 text-center">
        <div className={`flex gap-3 justify-center ${isMobile ? 'flex-col' : 'flex-row'}`}>
          <Button 
            variant="outline" 
            onClick={() => navigate('/statistics')}
            className={isMobile ? 'w-full' : 'w-auto'}
          >
            סטטיסטיקות כלליות
          </Button>
          <Button 
            onClick={() => navigate('/')} 
            className={`bg-salima-600 hover:bg-salima-700 ${isMobile ? 'w-full' : 'w-auto'}`}
          >
            חזור לעמוד הבית
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ManagerComparison;
