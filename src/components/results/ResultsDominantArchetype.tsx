import React, { useState, useEffect } from 'react';
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
      name: "המנהל הסקרן",
      description: "מונע מתוך סקרנות טבעית, אהבת למידה והשראה. סגנון זה מתאפיין בפתיחות, חקירה מתמדת ויכולת לסחוף אחרים דרך דוגמה אישית ונרטיב משמעותי.",
      icon: Lightbulb,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      lightBg: "#FFF3E0"
    },
    {
      name: "מנהל ההזדמנות",
      description: "ניחן בגישה יוזמת, רואה את המציאות כמפת הזדמנויות משתנה, ומנווט בה תוך תכנון קדימה וגמישות. סגנון זה משלב בין חשיבה אסטרטגית ויכולת התאמה מהירה לשינויים.",
      icon: Crown,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      lightBg: "#F3E5F5"
    },
    {
      name: "המנהל המעצים",
      description: "מונע ממשמעות, מחובר לערכים פנימיים ויודע להוביל באותנטיות. משלב הקשבה, שקיפות וראיית האחר כדי ליצור מרחב מצמיח סביבו.",
      icon: Users,
      color: "text-green-700",
      bgColor: "bg-green-50",
      lightBg: "#E8F5E9"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (dominantArchetype) {
      const index = archetypes.findIndex(arch => arch.name === dominantArchetype);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
  }, [dominantArchetype]);

  if (!dominantArchetype) {
    console.log('ResultsDominantArchetype - No dominant archetype data, component will not render');
    return null;
  }

  const currentArchetype = archetypes[currentIndex];
  const IconComponent = currentArchetype.icon;
  const isDominant = currentArchetype.name === dominantArchetype;

  const cycleArchetype = () => {
    setCurrentIndex((prev) => (prev === archetypes.length - 1 ? 0 : prev + 1));
  };

  return (
    <Card 
      className={`mb-3 sm:mb-4 lg:mb-6 border-2 shadow-lg rounded-xl transition-all duration-300 ${
        isDominant ? 'border-gray-300' : 'border-gray-200'
      } relative`} 
      style={{ backgroundColor: currentArchetype.lightBg }}
      dir="rtl"
    >
      <CardContent className="px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Subtle toggle link in top-right corner */}
        <button
          onClick={cycleArchetype}
          className="absolute top-4 right-4 text-sm text-gray-600 hover:opacity-80 transition-opacity cursor-pointer"
          style={{ direction: 'rtl' }}
        >
          לחץ כאן כדי לראות את סגנונות הניהול השונים
        </button>

        <div className="space-y-3 sm:space-y-4 lg:space-y-6 mt-6">
          {/* Title */}
          <h2 className="text-black font-bold text-right text-lg sm:text-xl lg:text-2xl">
            סגנון ניהולי דומיננטי
          </h2>
          
          {/* Archetype Name with Icon - Ensure proper RTL alignment */}
          <div className="flex items-center gap-2 sm:gap-3" style={{ direction: 'rtl', justifyContent: 'flex-start' }}>
            <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 ${currentArchetype.color}`} />
            <h3 className="text-black font-bold text-right text-base sm:text-lg lg:text-xl">
              {currentArchetype.name}
            </h3>
            {isDominant && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                דומיננטי
              </span>
            )}
          </div>
          
          {/* Description */}
          <p className="text-black leading-relaxed text-right text-sm sm:text-base lg:text-lg" style={{ lineHeight: '1.6' }}>
            {currentArchetype.description}
          </p>
          
          {/* Clarification Paragraph */}
          <p className="text-gray-700 leading-relaxed text-right text-xs sm:text-sm lg:text-base" style={{ lineHeight: '1.6' }}>
            חשוב להדגיש: סגנון ניהולי זה אינו מעיד בהכרח על התחומים שבהם קיבלת את הציון הגבוה ביותר. הוא משקף את השילוב הסגנוני הבולט בפרופיל שלך — הדרך שבה אתה נוטה להנהיג, לחשוב ולהשפיע.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsDominantArchetype;