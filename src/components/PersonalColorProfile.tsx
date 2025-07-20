import React, { useState } from 'react';
import { SurveyResult } from "@/lib/types";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { dimensionColors } from './diverging-chart/constants';

interface PersonalColorProfileProps {
  result: SurveyResult;
}

const PersonalColorProfile: React.FC<PersonalColorProfileProps> = ({ result }) => {
  const isMobile = useIsMobile();
  const [selectedDimension, setSelectedDimension] = useState<string | null>(null);
  const { dimensions } = result;

  const dimensionDescriptions = {
    'S': 'היכולת לראות את התמונה הגדולה, לזהות הזדמנויות במצבים משתנים, ולפעול מתוך חזון ברור ולא רק מתוך תגובה למציאות הנוכחית. מנהלים עם ממד אסטרטגי גבוה מתמקדים באפקטיביות לטווח ארוך.',
    'A': 'גמישות מחשבתית והתנהגותית, היכולת להסתגל במהירות לשינויים, להתמודד עם אי-ודאות ולפעול ביצירתיות גם במצבי קצה. ממד זה קשור לחוסן ולקבלת שינוי כהזדמנות.',
    'L': 'גישה של צמיחה מתמשכת, פתיחות למשוב וללמידה מהצלחות וכישלונות. ממד הלמידה מצביע על סקרנות, עומק מקצועי ורצון להתפתח ולהשתפר כל הזמן.',
    'I': 'היכולת להניע אחרים באמצעות נרטיב, ערכים ודוגמה אישית. מנהלים עם השראה גבוהה יוצרים אמון, מעוררים מוטיבציה ומקרינים נוכחות מנהיגותית.',
    'M': 'קשר עמוק לערכים פנימיים, מחויבות לתרומה שמעבר לעצמי ולתחושת שליחות. ממד המשמעות מייצג מנהיגות קשובה שפועלת בהלימה למטרות ערכיות.',
    'A2': 'שקיפות, יושרה ויכולת להביא את עצמך באופן כן ומדויק גם במצבי לחץ. ממד זה עוסק בכנות, אמפתיה, ובחיבור בין העולם הפנימי שלך להתנהלותך המקצועית.'
  };

  function getExtremeNonLinearSize(score: number): number {
    const normalizedScore = Math.max(0, Math.min(5, score));
    if (normalizedScore >= 4.8) return 100;
    if (normalizedScore >= 4.5) return 85;
    if (normalizedScore >= 4.2) return 72;
    if (normalizedScore >= 3.9) return 60;
    if (normalizedScore >= 3.6) return 48;
    if (normalizedScore >= 3.3) return 36;
    if (normalizedScore >= 3.0) return 25;
    if (normalizedScore >= 2.7) return 16;
    if (normalizedScore >= 2.4) return 10;
    if (normalizedScore >= 2.1) return 6;
    return 3;
  }

  const archetypeOrder = ['S', 'A', 'L', 'I', 'M', 'A2'] as const;

  const profileData = archetypeOrder.map(dimKey => {
    const dimension = dimensions[dimKey];
    const hebrewNames = {
      'S': 'אסטרטגיה', 'A': 'אדפטיביות', 'L': 'למידה',
      'I': 'השראה', 'A2': 'אותנטיות', 'M': 'משמעות'
    };
    return {
      name: hebrewNames[dimKey],
      dimension: dimKey,
      value: getExtremeNonLinearSize(dimension.score),
      color: dimensionColors[dimKey].strong,
      originalScore: dimension.score
    };
  });

  const handlePieClick = (data: any) => {
    if (data && data.dimension) {
      setSelectedDimension(selectedDimension === data.dimension ? null : data.dimension);
    }
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setSelectedDimension(null);
  };

  const totalValue = profileData.reduce((sum, item) => sum + item.value, 0);
  let cumulativeAngle = 0;

  const dimensionAngles = profileData.map(item => {
    const startAngle = cumulativeAngle;
    const segmentSize = (item.value / totalValue) * 360;
    cumulativeAngle += segmentSize;
    return {
      dimension: item.dimension,
      startAngle,
      endAngle: cumulativeAngle,
      segmentSize,
      value: item.value
    };
  });

  const archetypeGroups = [
    { name: 'מנהל ההזדמנות', dimensions: ['S', 'A'], color: '#8B5CF6' },
    { name: 'המנהל הסקרן', dimensions: ['L', 'I'], color: '#F97316' },
    { name: 'המנהל המעצים', dimensions: ['M', 'A2'], color: '#10B981' }
  ];

  const archetypeBorderData = [];
  for (let i = 0; i < archetypeOrder.length; i += 2) {
    const dim1 = dimensionAngles.find(d => d.dimension === archetypeOrder[i]);
    const dim2 = dimensionAngles.find(d => d.dimension === archetypeOrder[i + 1]);
    const color = archetypeGroups[Math.floor(i / 2)].color;
    if (dim1 && dim2) {
      archetypeBorderData.push({
        startAngle: dim1.startAngle,
        endAngle: dim2.endAngle,
        color,
        value: dim1.value + dim2.value
      });
    }
  }

  return <div>/* chart JSX remains here */</div>;
};

export default PersonalColorProfile;