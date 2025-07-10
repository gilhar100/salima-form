
import { Users, Lightbulb, Crown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ManagementStyleSectionProps {
  dominantArchetype: string | null;
}

const ManagementStyleSection: React.FC<ManagementStyleSectionProps> = ({ dominantArchetype }) => {
  const getArchetypeInfo = (archetype: string | null) => {
    switch (archetype) {
      case "המנהל הסקרן":
        return {
          name: "המנהל הסקרן",
          description: "המנהל הסקרן פועל מתוך סקרנות וחדוות גילוי. הוא מרבה לשאול שאלות, לשחק עם רעיונות חדשים, ולהפוך כל חוויה להזדמנות ללמידה. זהו מנהיג שמעורר השראה דרך חשיבה פתוחה ואינטואיטיבית, ומעודד את סביבתו לחקור את הלא נודע.",
          icon: Crown,
          color: "text-yellow-600",
          bgColor: "bg-yellow-50"
        };
      case "המנהל המעצים":
        return {
          name: "המנהל המעצים",
          description: "המנהל המעצים רואה את האנשים סביבו כשותפים למסע. הוא פועל מתוך חיבור אישי, מבקש להעניק משמעות גם לפעולות יומיומיות, ומוביל דרך אותנטיות. עבורו, מנהיגות היא לא שליטה אלא השפעה מתוך אמון.",
          icon: Users,
          color: "text-green-600",
          bgColor: "bg-green-50"
        };
      case "מנהל ההזדמנות":
        return {
          name: "מנהל ההזדמנות",
          description: "מנהל ההזדמנות ניחן ביכולת לראות רחוק גם בזמנים של חוסר ודאות. הוא משלב חשיבה אסטרטגית עם גמישות תפקודית, ומצליח להפוך שינויים למהות ולחזון. זהו מנהיג שיודע להשהות תגובה כדי לזהות מגמה עמוקה יותר, ולהוביל קדימה מתוך תבונה.",
          icon: Lightbulb,
          color: "text-blue-600",
          bgColor: "bg-blue-50"
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
      <CardContent className="px-4 sm:px-6 py-6 sm:py-8 text-center">
        <div className="space-y-4 sm:space-y-6">
          {/* Centered Icon */}
          <div className="flex justify-center">
            <IconComponent className={`w-10 h-10 ${archetypeInfo.color}`} />
          </div>
          
          {/* Title */}
          <h2 className="text-black font-bold" style={{ fontSize: '24px' }}>
            סגנון ניהול
          </h2>
          
          {/* Archetype Name */}
          <h3 className="text-black font-semibold" style={{ fontSize: '22px' }}>
            {archetypeInfo.name}
          </h3>
          
          {/* Description */}
          <p className="text-black leading-relaxed" style={{ fontSize: '16px', lineHeight: '1.6' }}>
            {archetypeInfo.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ManagementStyleSection;
