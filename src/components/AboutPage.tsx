
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface AboutPageProps {
  onContinue: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onContinue }) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex justify-center py-4 sm:py-6 px-4">
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/97bb30f6-a7bc-4ce4-a840-c7e1bd4b4c3f.png" 
              alt="ד״ר יוסי שרעבי" 
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover shadow-lg"
            />
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold text-salima-800 mb-6">
            אודות
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6 text-right">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-salima-800 mb-4">
              מי אנחנו?
            </h2>
            <div className="space-y-4 text-sm sm:text-base leading-relaxed">
              <p>
                אנחנו OPPORTUNITY – חברת פיתוח ארגוני בהובלת ד"ר יוסי שרעבי, עו״ד, מרצה וחוקר מוביל בתחומי המנהיגות, האסטרטגיה והתרבות הארגונית. ד״ר שרעבי כיהן בעבר כמנכ״ל משרד התרבות והספורט ומילא שורת תפקידי ניהול בכירים במגזר הציבורי והחברתי.
              </p>
              <p>
                אנחנו מאמינים שארגונים לא נועדו רק לשרוד – אלא לגדול, להתחדש ולהשפיע. מטרתנו היא ללוות ארגונים במעברים קריטיים, להוציא אותם מתקיעות תודעתית ולסייע להם לנוע לעבר טרנספורמציה עמוקה וברת קיימא.
              </p>
              <p>
                במהלך השנים פיתחנו את מודל SALIMA–WOCA – כלי אבחון ייחודי ופורץ דרך שפיתח ד״ר שרעבי, ומאפשר לנו למפות את ה-DNA הארגוני, לזהות חסמים סמויים ולבנות תשתית לפיתוח מנהיגות אפקטיבית ותרבות ארגונית מתקדמת. המודל נמצא בשימוש בלעדי של חברת OPPORTUNITY, ומיושם בהצלחה בגופים ציבוריים, פרטיים וחברתיים.
              </p>
              <p className="font-medium">
                אנחנו לא רק מאבחנים – אנחנו שותפים למסע.
              </p>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-salima-800 mb-4">
              תנאים והבהרות
            </h2>
            <ul className="space-y-2 text-sm sm:text-base leading-relaxed list-disc list-inside">
              <li>השאלון הוא כלי מקצועי פנימי שנועד לצרכים אבחוניים בלבד.</li>
              <li>אין לעשות בו שימוש מסחרי, חינוכי או מחקרי ללא קבלת רשות כתובה מראש מחברת OPPORTUNITY.</li>
              <li>כל הזכויות על השאלון, התכנים הנלווים, מודל SALIMA–WOCA והניתוחים הנגזרים ממנו – שמורות לד״ר יוסי שרעבי ולחברת OPPORTUNITY.</li>
              <li>המשך מילוי השאלון מהווה אישור להסכמתך לתנאים אלו.</li>
            </ul>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <Button 
            onClick={onContinue}
            className={`bg-salima-600 hover:bg-salima-700 ${isMobile ? 'w-full' : 'w-auto'}`}
          >
            המשך לשאלון
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AboutPage;
