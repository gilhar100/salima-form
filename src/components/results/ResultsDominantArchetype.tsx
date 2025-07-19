
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
      textColor: "text-blue-600"
    },
    {
      name: "המנהל המעצים",
      description: "פועל מתוך חיבור לערכים ולתחושת שליחות. משדר אותנטיות, יוצר מרחב בטוח לצוות, ונותן משמעות לעשייה היומיומית. טיפוס שמעודד מעורבות, אמון וצמיחה אנושית אמיתית.",
      icon: Users,
      color: "#10B981",
      textColor: "text-green-600"
    },
    {
      name: "המנהל הסקרן",
      description: "לומד כל הזמן, שואל שאלות ומעודד חדשנות. מעורר השראה דרך ההתלהבות מהעתיד ומהאפשרי. מנהיג שמקדם שינוי באמצעות ידע, רעיונות ודמיון יצירתי, וגורם לסביבה שלו לרצות להתפתח.",
      icon: Crown,
      color: "#F59E0B",
      textColor: "text-orange-600"
    }
  ];

  // Find the dominant archetype or default to first one
  const dominantIndex = archetypes.findIndex(arch => arch.name === dominantArchetype);
  const [currentIndex, setCurrentIndex] = useState(dominantIndex !== -1 ? dominantIndex : 0);

  const currentArchetype = archetypes[currentIndex];
  const isDominant = currentArchetype.name === dominantArchetype;

  // Always render the component, even if no dominant archetype is set
  console.log('ResultsDominantArchetype - Component will render with archetype:', dominantArchetype);

  return (
    <div className="mb-6" dir="rtl">
      {/* Dominant Archetype Header Block */}
      <div 
        className="w-full rounded-xl p-6 mb-4 text-center"
        style={{ backgroundColor: currentArchetype.color }}
      >
        <h2 className="text-white font-bold text-2xl mb-2">
          {currentArchetype.name}
        </h2>
        {isDominant && (
          <p className="text-white/90 text-sm">
            הארכיטיפ הדומיננטי שלך
          </p>
        )}
      </div>

      {/* Toggle Tabs */}
      <div className="flex justify-center mb-4">
        <div className="bg-gray-100 rounded-lg p-1 flex gap-1">
          {archetypes.map((archetype, index) => (
            <button
              key={archetype.name}
              onClick={() => setCurrentIndex(index)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                currentIndex === index
                  ? 'bg-white shadow-sm ' + archetype.textColor
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {archetype.name}
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <Card>
        <CardContent className="p-4">
          <p className="text-gray-700 leading-relaxed text-right">
            {currentArchetype.description}
          </p>
          
          {isDominant && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 text-right">
                💡 זהו הארכיטיפ הדומיננטי שלך על בסיס התוצאות שלך בשאלון
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsDominantArchetype;
