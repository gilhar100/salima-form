
import React, { useState } from 'react';
import { Users, Lightbulb, Crown, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
      icon: Crown,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      lightBg: "#FFF3E0"
    },
    {
      name: "מנהל ההזדמנות",
      description: "ניחן בגישה יוזמת, רואה את המציאות כמפת הזדמנויות משתנה, ומנווט בה תוך תכנון קדימה וגמישות. סגנון זה משלב בין חשיבה אסטרטגית ויכולת התאמה מהירה לשינויים.",
      icon: Lightbulb,
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

  // Find the dominant archetype or default to first one
  const dominantIndex = archetypes.findIndex(arch => arch.name === dominantArchetype);
  const [currentIndex, setCurrentIndex] = useState(dominantIndex !== -1 ? dominantIndex : 0);
  const [showCarousel, setShowCarousel] = useState(false);

  const currentArchetype = archetypes[currentIndex];

  const navigateArchetype = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentIndex((prev) => (prev === 0 ? archetypes.length - 1 : prev - 1));
    } else {
      setCurrentIndex((prev) => (prev === archetypes.length - 1 ? 0 : prev + 1));
    }
  };

  const selectArchetype = (index: number) => {
    setCurrentIndex(index);
  };

  if (!dominantArchetype) {
    console.log('ResultsDominantArchetype - No dominant archetype data, component will not render');
    return null;
  }

  const IconComponent = currentArchetype.icon;
  const isDominant = currentArchetype.name === dominantArchetype;

  return (
    <Card 
      className={`mb-3 sm:mb-4 lg:mb-6 border-2 shadow-lg rounded-xl transition-all duration-300 ${
        isDominant ? 'border-gray-300' : 'border-gray-200'
      }`} 
      style={{ backgroundColor: currentArchetype.lightBg }}
      dir="rtl"
    >
      <CardContent className="px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <div className="space-y-3 sm:space-y-4 lg:space-y-6">
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
          
          {/* Carousel Navigation */}
          {showCarousel && (
            <div className="flex items-center justify-center gap-4 my-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateArchetype('next')}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <div className="flex gap-2">
                {archetypes.map((arch, index) => (
                  <button
                    key={arch.name}
                    onClick={() => selectArchetype(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentIndex 
                        ? 'bg-blue-600 scale-110' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateArchetype('prev')}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          {/* Description */}
          <p className="text-black leading-relaxed text-right text-sm sm:text-base lg:text-lg" style={{ lineHeight: '1.6' }}>
            {currentArchetype.description}
          </p>
          
          {/* Toggle Link */}
          <div className="text-center">
            <button
              onClick={() => setShowCarousel(!showCarousel)}
              className="text-blue-600 hover:text-blue-800 underline text-sm sm:text-base transition-colors"
            >
              {showCarousel ? 'הסתר סגנונות ניהול אחרים' : 'לחץ כאן כדי לראות את סגנונות הניהול השונים'}
            </button>
          </div>
          
          {/* Clarification Paragraph */}
          <p className="text-gray-700 leading-relaxed text-right text-xs sm:text-sm lg:text-base" style={{ lineHeight: '1.6' }}>
            חשוב להדגיש: סגנון ניהולי זה אינו מעיד בהכרח על התחומים שבהם קיבלת את הציון הגבוה ביותר. הוא משקף את השילוב הSgנוני הבולט בפרופיל שלך — הדרך שבה אתה נוטה להנהיג, לחשוב ולהשפיע.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsDominantArchetype;
