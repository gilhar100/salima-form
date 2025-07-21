import React, { useState, useEffect } from 'react';
import { Users, Lightbulb, Crown, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ResultsDominantArchetypeProps {
  dominantArchetype: string | null | undefined;
}

const ArchetypeLetters = ({ archetype }: { archetype: string }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const highlightMap: Record<string, number[]> = {
    'מנהל ההזדמנות': [0, 1], // S, A (first A)
    'המנהל הסקרן': [2, 3],   // L, I
    'המנהל המעצים': [4, 5],  // M, A (second A)
  };

  const colorMap: Record<number, string> = {
    0: 'text-purple-600',
    1: 'text-purple-600',
    2: 'text-orange-600',
    3: 'text-orange-600',
    4: 'text-green-700',
    5: 'text-green-700',
  };

  const parameterExplanations: Record<number, string> = {
    0: 'אסטרטגיה - היכולת לראות את התמונה הגדולה ולתכנן לטווח ארוך',
    1: 'אדפטיביות - גמישות והתאמה מהירה לשינויים',
    2: 'למידה - סקרנות ורצון מתמיד להתפתח ולהשתפר',
    3: 'השראה - היכולת להניע אחרים ולהקרין נוכחות מנהיגותית',
    4: 'משמעות - קשר לערכים פנימיים ותחושת שליחות',
    5: 'אותנטיות - שקיפות ויכולת להביא את עצמך באופן כן'
  };

  const letters = ['S', 'A', 'L', 'I', 'M', 'A'];
  const highlightedIndices = highlightMap[archetype] || [];

  return (
    <div className="relative">
      <div className="flex justify-center mt-2 rtl:space-x-reverse space-x-2 animate-fade-in">
        {letters.map((letter, index) => {
          const isHighlighted = highlightedIndices.includes(index);
          const colorClass = isHighlighted ? colorMap[index] : 'text-gray-400';
          const sizeClass = isHighlighted ? 'text-xl sm:text-2xl font-bold' : 'text-sm sm:text-base';
          const isClickable = isHighlighted;

          return (
            <span
              key={`${letter}-${index}`}
              className={`transition-all duration-300 ease-in-out ${colorClass} ${sizeClass} ${isClickable ? 'cursor-pointer hover:scale-110 hover:opacity-80' : ''} ${selectedIndex === index ? 'scale-125' : ''}`}
              onClick={() => isClickable ? setSelectedIndex(selectedIndex === index ? null : index) : null}
            >
              {letter}
            </span>
          );
        })}
      </div>

      {selectedIndex !== null && (
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-10 bg-white border-2 rounded-lg shadow-lg p-4 max-w-xs w-full animate-fade-in">
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <X size={16} />
          </button>
          <div className="text-center">
            <div className={`text-lg font-bold mb-2 ${colorMap[selectedIndex]}`}>
              {letters[selectedIndex]}
            </div>
            <p className="text-sm text-gray-700 text-right" dir="rtl">
              {parameterExplanations[selectedIndex]}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const ResultsDominantArchetype: React.FC<ResultsDominantArchetypeProps> = ({
  dominantArchetype
}) => {
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
      const dominantIndex = archetypes.findIndex(arch => arch.name === dominantArchetype);
      setCurrentIndex(dominantIndex !== -1 ? dominantIndex : 0);
    }
  }, [dominantArchetype]);

  const currentArchetype = archetypes[currentIndex];
  const IconComponent = currentArchetype.icon;
  const isDominant = currentArchetype.name === dominantArchetype;

  const cycleArchetype = () => {
    setCurrentIndex((prev) => (prev === archetypes.length - 1 ? 0 : prev + 1));
  };

  if (!dominantArchetype) return null;

  return (
    <Card
      className={`mb-3 sm:mb-4 lg:mb-6 border-2 shadow-lg rounded-xl transition-all duration-300 ${isDominant ? 'border-gray-300' : 'border-gray-200'} relative`}
      style={{ backgroundColor: currentArchetype.lightBg }}
      dir="rtl"
    >
      <CardContent className="px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <button
          onClick={cycleArchetype}
          className="absolute top-4 right-4 text-sm text-gray-600 hover:opacity-80 transition-opacity cursor-pointer"
          style={{ direction: 'rtl' }}
        >
          לחץ כאן כדי לראות את סגנונות הניהול השונים
        </button>

        <div className="space-y-3 sm:space-y-4 lg:space-y-6 mt-6">
          <h2 className="text-black font-bold text-right text-lg sm:text-xl lg:text-2xl">
            סגנון ניהולי דומיננטי
          </h2>

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

          <ArchetypeLetters archetype={currentArchetype.name} />

          <p className="text-black leading-relaxed text-right text-sm sm:text-base lg:text-lg" style={{ lineHeight: '1.6' }}>
            {currentArchetype.description}
          </p>

          <p className="text-gray-700 leading-relaxed text-right text-xs sm:text-sm lg:text-base" style={{ lineHeight: '1.6' }}>
            חשוב להדגיש: סגנון ניהולי זה אינו מעיד בהכרח על התחומים שבהם קיבלת את הציון הגבוה ביותר. הוא משקף את השילוב הסגנוני הבולט בפרופיל שלך — הדרך שבה אתה נוטה להנהיג, לחשוב ולהשפיע.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsDominantArchetype;