
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface ResultsDominantArchetypeProps {
  dominantArchetype: string | null | undefined;
}

const ResultsDominantArchetype: React.FC<ResultsDominantArchetypeProps> = ({
  dominantArchetype
}) => {
  console.log('ResultsDominantArchetype rendering with dominantArchetype:', dominantArchetype);

  const archetypes = [
    {
      name: "מנהל ההזדמנות",
      color: "#0088FE",
      description: "שילוב של חשיבה אסטרטגית עם אדפטיביות גבוהה. מסוגל לראות את התמונה הגדולה ולפעול בגמישות גם כשיש שינויים ואתגרים. ניחן ביכולת להוביל תהליכים מורכבים ולזהות הזדמנויות חדשות תוך התאמה לסביבה משתנה."
    },
    {
      name: "המנהל המעצים",
      color: "#00C49F",
      description: "משלב משמעות ותחושת שליחות עם קשרים אנושיים כנים. יודע לעורר השראה בצוות דרך אותנטיות, הקשבה, והובלה מתוך ערכים. מטפח מחוברות ומוטיבציה עמוקה אצל העובדים."
    },
    {
      name: "המנהל הסקרן",
      color: "#FFBB28",
      description: "מונע על ידי למידה, השראה וסקרנות. מאמין בכוחן של שאלות, רעיונות חדשים וצמיחה אישית. יוצר תרבות של חקירה, פתיחות ומוכנות להשתנות ולחדש."
    }
  ];

  // Find the index of the dominant archetype
  const dominantIndex = archetypes.findIndex(arch => arch.name === dominantArchetype);
  
  // Set initial state to dominant archetype if found, otherwise default to first archetype
  const [currentIndex, setCurrentIndex] = useState(dominantIndex !== -1 ? dominantIndex : 0);

  // Update current index when dominantArchetype prop changes
  useEffect(() => {
    if (dominantArchetype) {
      const newDominantIndex = archetypes.findIndex(arch => arch.name === dominantArchetype);
      if (newDominantIndex !== -1) {
        setCurrentIndex(newDominantIndex);
      }
    }
  }, [dominantArchetype]);

  const currentArchetype = archetypes[currentIndex];
  const isDominant = currentArchetype.name === dominantArchetype;

  console.log('Component state:', {
    dominantIndex,
    currentIndex,
    currentArchetype: currentArchetype.name,
    isDominant,
    dominantArchetype
  });

  return (
    <div className="mb-6" dir="rtl">
      <div
        className="w-full rounded-xl p-6 mb-4 text-center"
        style={{ backgroundColor: currentArchetype.color }}
      >
        <h2 className="text-white font-bold text-2xl mb-2">
          {currentArchetype.name}
        </h2>
        {isDominant && (
          <p className="text-white/90 text-sm">
            סגנון הניהול הדומיננטי
          </p>
        )}
      </div>

      <div className="flex justify-center mb-4">
        <div className="bg-gray-100 rounded-lg p-1 flex gap-1">
          {archetypes.map((archetype, index) => (
            <button
              key={archetype.name}
              onClick={() => setCurrentIndex(index)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                currentIndex === index
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {archetype.name}
            </button>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <p className="text-gray-700 leading-relaxed text-right">
            {currentArchetype.description}
          </p>

          {isDominant && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 text-right">
                זהו הארכיטיפ הדומיננטי שלך על בסיס התוצאות
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsDominantArchetype;
