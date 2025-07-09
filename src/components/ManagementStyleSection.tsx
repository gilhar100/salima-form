
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
          color: "text-yellow-600"
        };
      case "המנהל המעצים":
        return {
          name: "המנהל המעצים",
          description: "המנהל המעצים רואה את האנשים סביבו כשותפים למסע. הוא פועל מתוך חיבור אישי, מבקש להעניק משמעות גם לפעולות יומיומיות, ומוביל דרך אותנטיות. עבורו, מנהיגות היא לא שליטה אלא השפעה מתוך אמון.",
          icon: Users,
          color: "text-green-600"
        };
      case "מנהל ההזדמנות":
        return {
          name: "מנהל ההזדמנות",
          description: "מנהל ההזדמנות ניחן ביכולת לראות רחוק גם בזמנים של חוסר ודאות. הוא משלב חשיבה אסטרטגית עם גמישות תפקודית, ומצליח להפוך שינויים למהות ולחזון. זהו מנהיג שיודע להשהות תגובה כדי לזהות מגמה עמוקה יותר, ולהוביל קדימה מתוך תבונה.",
          icon: Lightbulb,
          color: "text-blue-600"
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
    <Card className="mb-4 sm:mb-6 bg-white border-2 border-gray-200">
      <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
        <CardTitle className="flex items-center justify-between" dir="rtl">
          <span className="text-black" style={{ fontSize: '24px' }}>
            סגנון ניהול
          </span>
          <IconComponent className={`w-6 h-6 sm:w-8 sm:h-8 ${archetypeInfo.color}`} />
        </CardTitle>
      </CardHeader>
      
      <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6" dir="rtl">
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-black" style={{ fontSize: '20px', fontWeight: 'bold' }}>
            {archetypeInfo.name}
          </h3>
          <p className="text-black leading-relaxed" style={{ fontSize: '16px' }}>
            {archetypeInfo.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ManagementStyleSection;
