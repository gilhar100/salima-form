
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Brain, Users, BarChart3 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            שאלון SALIMA למנהיגות
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            כלי מתקדם להערכת יכולות מנהיגות בארגונים
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Brain className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>הערכה עצמית</CardTitle>
              <CardDescription>
                בצע הערכה עצמית של יכולות המנהיגות שלך
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/survey?type=manager')}
                className="w-full bg-salima-600 hover:bg-salima-700"
              >
                התחל שאלון מנהל
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <CardTitle>הערכת עמית</CardTitle>
              <CardDescription>
                הערך את יכולות המנהיגות של מנהל שאתה מכיר
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/survey?type=colleague')}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                התחל הערכת עמית
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <BarChart3 className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>סטטיסטיקות</CardTitle>
              <CardDescription>
                צפה בנתונים סטטיסטיים מהשאלונים
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/statistics')}
                variant="outline"
                className="w-full"
              >
                צפה בסטטיסטיקות
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-gray-500 mb-4">
            השאלון מבוסס על מחקר מתקדם בתחום המנהיגות הארגונית
          </p>
          <div className="text-black" style={{ fontSize: '16px' }}>
            ™ כל הזכויות שמורות לד״ר יוסי שרעבי
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
