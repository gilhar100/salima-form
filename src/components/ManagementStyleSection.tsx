
import { Users, Lightbulb, Crown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ManagementStyleSectionProps {
  dominantArchetype: string | null;
}

const ManagementStyleSection: React.FC<ManagementStyleSectionProps> = ({ dominantArchetype }) => {
  const getArchetypeInfo = (archetype: string | null) => {
    switch (archetype) {
      case "מנהל ההזדמנות":
        return {
          name: "מנהל ההזדמנות",
          description: "ניחן בגישה יוזמת, רואה את המציאות כמפת הזדמנויות משתנה, ומנווט בה תוך תכנון קדימה וגמישות. סגנון זה משלב בין חשיבה אסטרטגית ויכולת התאמה מהירה לשינויים.",
          icon: Lightbulb,
          color: "text-blue-800",
          bgColor: "bg-blue-50"
        };
      case "המנהל המעצים":
        return {
          name: "המנהל המעצים",
          description: "מונע ממשמעות, מחובר לערכים פנימיים ויודע להוביל באותנטיות. משלב הקשבה, שקיפות וראיית האחר כדי ליצור מרחב מצמיח סביבו.",
          icon: Users,
          color: "text-green-700",
          bgColor: "bg-green-50"
        };
      case "המנהל הסקרן":
        return {
          name: "המנהל הסקרן",
          description: "מונע מתוך סקרנות טבעית, אהבת למידה והשראה. סגנון זה מתאפיין בפתיחות, חקירה מתמדת ויכולת לסחוף אחרים דרך דוגמה אישית ונרטיב משמעותי.",
          icon: Crown,
          color: "text-orange-600",
          bgColor: "bg-orange-50"
        };
      default:
        return null;
    }
  };

  const archetypeInfo = getArchetypeInfo(dominantArchetype);

  if (!archetypeInfo) {
    return null;
  }

  const IconComponent = archetypeInfo.icon;

  return (
    <Card className={`mb-4 sm:mb-6 ${archetypeInfo.bgColor} border-2 border-gray-200 shadow-lg rounded-xl`} dir="rtl">
      <CardContent className="px-4 sm:px-6 py-6 sm:py-8">
        <div className="space-y-4 sm:space-y-6">
          {/* Title */}
          <h2 className="text-black font-bold text-right" style={{ fontSize: '24px' }}>
            סגנון ניהולי דומיננטי
          </h2>
          
          {/* Archetype Name with Icon */}
          <div className="flex items-center justify-end gap-3">
            <h3 className="text-black font-bold text-right" style={{ fontSize: '22px' }}>
              {archetypeInfo.name}
            </h3>
            <IconComponent className={`w-6 h-6 ${archetypeInfo.color}`} />
          </div>
          
          {/* Description */}
          <p className="text-black leading-relaxed text-right" style={{ fontSize: '18px', lineHeight: '1.6' }}>
            {archetypeInfo.description}
          </p>
          
          {/* Clarification Paragraph */}
          <p className="text-gray-700 leading-relaxed text-right" style={{ fontSize: '18px', lineHeight: '1.6' }}>
            חשוב להדגיש: סגנון ניהולי זה אינו מעיד בהכרח על התחומים שבהם קיבלת את הציון הגבוה ביותר. הוא משקף את השילוב הסגנוני הבולט בפרופיל שלך — הדרך שבה אתה נוטה להנהיג, לחשוב ולהשפיע.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ManagementStyleSection;
