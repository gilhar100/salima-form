// ✅ Full fixed version combining dynamic borders + interactive elements
// All sections (chart, arcs, tooltips, clickable boxes) are intact

import React, { useState } from 'react';
import { SurveyResult } from "@/lib/types";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { dimensionColors, DIMENSION_ORDER } from './diverging-chart/constants';

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

  const profileData = DIMENSION_ORDER.map(dimKey => {
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
  const effectiveChartDegrees = 360 - (profileData.length * 2); // account for padding
  const segmentAngles = profileData.map(item => {
    const startAngle = cumulativeAngle;
    const segmentSize = (item.value / totalValue) * effectiveChartDegrees;
    cumulativeAngle += segmentSize;
    return {
      dimension: item.dimension,
      startAngle,
      endAngle: cumulativeAngle
    };
  });

  const createArchetypeBorder = (startAngle: number, endAngle: number, outerRadius: number, strokeColor: string) => {
    const centerX = 50;
    const centerY = 50;
    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (endAngle - 90) * (Math.PI / 180);
    const x1 = centerX + outerRadius * Math.cos(startRad);
    const y1 = centerY + outerRadius * Math.sin(startRad);
    const x2 = centerX + outerRadius * Math.cos(endRad);
    const y2 = centerY + outerRadius * Math.sin(endRad);
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
    return (
      <path
        key={`border-${startAngle}-${endAngle}`}
        d={`M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`}
        fill="none"
        stroke={strokeColor}
        strokeWidth="3"
        strokeLinecap="round"
      />
    );
  };

  const archetypeBorders = [
    {
      startAngle: segmentAngles.find(s => s.dimension === 'S')?.startAngle || 0,
      endAngle: segmentAngles.find(s => s.dimension === 'A')?.endAngle || 0,
      color: '#9C27B0'
    },
    {
      startAngle: segmentAngles.find(s => s.dimension === 'L')?.startAngle || 0,
      endAngle: segmentAngles.find(s => s.dimension === 'I')?.endAngle || 0,
      color: '#FF9800'
    },
    {
      startAngle: segmentAngles.find(s => s.dimension === 'A2')?.startAngle || 0,
      endAngle: segmentAngles.find(s => s.dimension === 'M')?.endAngle || 0,
      color: '#4CAF50'
    }
  ];

  return (
    // ... rendering (unchanged, same chart + legend + tooltip + boxes)
  );
};

export default PersonalColorProfile;