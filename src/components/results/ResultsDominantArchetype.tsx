
import React, { useState } from 'react';
import { Users, Lightbulb, Crown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ResultsDominantArchetypeProps {
  dominantArchetype: string | null | undefined;
}

const ResultsDominantArchetype: React.FC<ResultsDominantArchetypeProps> = ({
  dominantArchetype
}) => {
  console.log('ResultsDominantArchetype - dominantArchetype received:', dominantArchetype);

  const archetypes = [
    {
      name: "מנהל ההזדמנות",
      description: "מאופיין בחשיבה רחבה, יוזמה ותגובה מהירה לשינויים. רואה את המפה הארגונית ומתמרן בה בגמישות ובחזון. יודע לזהות מגמות, לקרוא את הסביבה ולהוביל תהליכים גם בתנאים של חוסר ודאות.",
      icon: Lightbulb,
      color: "#3B82F6",
      bgColor: "bg-blue-500"
    },
    {
      name: "המנהל המעצים",
      description: "פועל מתוך חיבור לערכים ולתחושת שליחות. משדר אותנטיות, יוצר מרחב בטוח לצוות, ונותן משמעות לעשייה היומיומית. טיפוס שמעודד מעורבות, אמון וצמיחה אנושית אמיתית.",
      icon: Users,
      color: "#10B981",
      bgColor: "bg-emerald-500"
    },
    {
      name: "המנהל הסקרן",
      description: "לומד כל הזמן, שואל שאלות ומעודד חדשנות. מעורר השראה דרך ההתלהבות מהעתיד ומהאפשרי. מנהיג שמקדם שינוי באמצעות ידע, רעיונות ודמיון יצירתי, וגורם לסביבה שלו לרצות להתפתח.",
      icon: Crown,
      color: "#F59E0B",
      bgColor: "bg-amber-500"
    }
  ];

  // Find the dominant archetype or default to first one
  const dominantIndex = archetypes.findIndex(arch => arch.name === dominantArchetype);
  const [currentIndex, setCurrentIndex] = useState(dominantIndex !== -1 ? dominantIndex : 0);

  const currentArchetype = archetypes[currentIndex];

  if (!dominantArchetype) {
    console.log('ResultsDominantArchetype - No dominant archetype data, component will not render');
    return null;
  }

  const IconComponent = currentArchetype.icon;

  return (
    <div className="mb-6 space-y-4" dir="rtl">
      {/* Main colored block */}
      <div 
        className="w-full rounded-xl p-6 text-center shadow-lg"
        style={{ backgroundColor: currentArchetype.color }}
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <IconComponent className="w-8 h-8 text-white" />
          <h2 className="text-white font-bold text-2xl lg:text-3xl">
            {currentArchetype.name}
          </h2>
        </div>
        <p className="text-white/90 text-sm lg:text-base">
          הארכיטיפ הדומיננטי שלך
        </p>
      </div>

      {/* Toggle tabs */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-lg bg-gray-100 p-1">
          {archetypes.map((archetype, index) => (
            <button
              key={archetype.name}
              onClick={() => setCurrentIndex(index)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                currentIndex === index
                  ? 'text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={{
                backgroundColor: currentIndex === index ? archetype.color : 'transparent'
              }}
            >
              {archetype.name}
            </button>
          ))}
        </div>
      </div>

      {/* Description paragraph */}
      <Card className="border-2 shadow-sm">
        <CardContent className="p-6">
          <p className="text-black leading-relaxed text-right text-base lg:text-lg" style={{ lineHeight: '1.7' }}>
            {currentArchetype.description}
          </p>
          
          {/* Clarification note */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-gray-600 leading-relaxed text-right text-sm lg:text-base" style={{ lineHeight: '1.6' }}>
              חשוב להדגיש: סגנון ניהולי זה אינו מעיד בהכרח על התחומים שבהם קיבלת את הציון הגבוה ביותר. הוא משקף את השילוב הסגנוני הבולט בפרופיל שלך — הדרך שבה אתה נוטה להנהיג, לחשוב ולהשפיע.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsDominantArchetype;
