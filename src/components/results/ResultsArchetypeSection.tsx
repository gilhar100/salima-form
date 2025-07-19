
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ArchetypeData {
  name: string;
  color: string;
  description: string;
}

const archetypes: Record<string, ArchetypeData> = {
  "מנהל ההזדמנות": {
    name: "מנהל ההזדמנות",
    color: "#3B82F6",
    description: "מאופיין בחשיבה רחבה, יוזמה ותגובה מהירה לשינויים. רואה את המפה הארגונית ומתמרן בה בגמישות ובחזון. יודע לזהות מגמות, לקרוא את הסביבה ולהוביל תהליכים גם בתנאים של חוסר ודאות."
  },
  "המנהל המעצים": {
    name: "המנהל המעצים",
    color: "#10B981",
    description: "פועל מתוך חיבור לערכים ולתחושת שליחות. משדר אותנטיות, יוצר מרחב בטוח לצוות, ונותן משמעות לעשייה היומיומית. טיפוס שמעודד מעורבות, אמון וצמיחה אנושית אמיתית."
  },
  "המנהל הסקרן": {
    name: "המנהל הסקרן",
    color: "#F59E0B",
    description: "לומד כל הזמן, שואל שאלות ומעודד חדשנות. מעורר השראה דרך ההתלהבות מהעתיד ומהאפשרי. מנהיג שמקדם שינוי באמצעות ידע, רעיונות ודמיון יצירתי, וגורם לסביבה שלו לרצות להתפתח."
  }
};

interface ResultsArchetypeSectionProps {
  dominantArchetype: string | null | undefined;
}

const ResultsArchetypeSection: React.FC<ResultsArchetypeSectionProps> = ({
  dominantArchetype
}) => {
  // Set initial archetype - use dominant or default to first one
  const initialArchetype = dominantArchetype && archetypes[dominantArchetype] 
    ? dominantArchetype 
    : "מנהל ההזדמנות";
  
  const [selectedArchetype, setSelectedArchetype] = useState(initialArchetype);
  const currentArchetype = archetypes[selectedArchetype];

  if (!dominantArchetype) {
    return null;
  }

  return (
    <div className="mb-6" dir="rtl">
      {/* Colored Header Block */}
      <div 
        className="w-full rounded-xl p-6 text-center mb-4 shadow-lg"
        style={{ backgroundColor: currentArchetype.color }}
      >
        <h2 className="text-white font-bold text-2xl mb-2">
          {currentArchetype.name}
        </h2>
        <p className="text-white/90 text-sm">
          הארכיטיפ הדומיננטי שלך
        </p>
      </div>

      {/* Toggle Tabs */}
      <div className="flex justify-center mb-4">
        <div className="bg-gray-100 rounded-lg p-1 flex gap-1">
          {Object.keys(archetypes).map((archetype) => (
            <Button
              key={archetype}
              variant={selectedArchetype === archetype ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedArchetype(archetype)}
              className={`text-sm px-4 py-2 transition-all duration-200 ${
                selectedArchetype === archetype 
                  ? "bg-white shadow-sm font-medium" 
                  : "hover:bg-white/50"
              }`}
            >
              {archetype}
            </Button>
          ))}
        </div>
      </div>

      {/* Description Card */}
      <Card className="bg-white shadow-sm">
        <CardContent className="p-6">
          <p className="text-gray-700 leading-relaxed text-base text-right">
            {currentArchetype.description}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsArchetypeSection;
