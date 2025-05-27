
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useIsMobile } from "@/hooks/use-mobile";

interface ResearchConsentFormProps {
  onConsent: (consented: boolean) => void;
}

const ResearchConsentForm: React.FC<ResearchConsentFormProps> = ({ onConsent }) => {
  const [agreed, setAgreed] = useState(false);
  const isMobile = useIsMobile();

  const handleSubmit = () => {
    onConsent(agreed);
  };

  return (
    <div className="flex justify-center py-4 sm:py-6 px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-xl sm:text-2xl font-bold text-salima-800">
            שאלון מנהיגות SALIMA-WOCA
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            בקשת הסכמה לשימוש בנתונים למחקר
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4 sm:space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-3 text-salima-800">
              מטרת המחקר
            </h3>
            <p className="text-sm sm:text-base leading-relaxed mb-4">
              כדי לשפר את כלי המנהיגות ולספק תובנות סטטיסטיות טובות יותר לארגונים, 
              אנו מבקשים את הסכמתך לשימוש בתוצאות השאלון למטרות מחקר.
            </p>
            
            <h4 className="font-semibold mb-2">הבטחות הפרטיות שלנו:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
              <li>הנתונים ישמרו באופן אנונימי לחלוטין</li>
              <li>לא יכללו מידע מזהה אישי</li>
              <li>הנתונים ישמרו מוצפנים ובטוחים</li>
              <li>ישמשו אך ורק למטרות מחקר ושיפור הכלי</li>
              <li>לא יועברו לגורמים חיצוניים</li>
            </ul>
          </div>
          
          <div className="flex items-start space-x-3 space-x-reverse">
            <Checkbox
              id="research-consent"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked === true)}
              className="mt-1"
            />
            <label 
              htmlFor="research-consent" 
              className="text-sm sm:text-base leading-relaxed cursor-pointer"
            >
              אני מסכים/ה לשימוש בתוצאות השאלון שלי למטרות מחקר, 
              בהבנה שהנתונים יישמרו באופן אנונימי ובטוח כמתואר לעיל.
            </label>
          </div>
          
          {!agreed && (
            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>שים לב:</strong> ללא הסכמה לשימוש בנתונים למחקר, לא ניתן יהיה להמשיך במילוי השאלון.
              </p>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex flex-col gap-3">
          <Button 
            onClick={handleSubmit}
            disabled={!agreed}
            className={`bg-salima-600 hover:bg-salima-700 ${isMobile ? 'w-full' : 'w-auto'}`}
          >
            {agreed ? "המשך לשאלון" : "יש לסמן הסכמה כדי להמשיך"}
          </Button>
          
          {!agreed && (
            <p className="text-xs sm:text-sm text-gray-500 text-center">
              לא ניתן להמשיך ללא הסכמה לשימוש בנתונים למחקר
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResearchConsentForm;
