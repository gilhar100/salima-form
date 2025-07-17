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

  const hebrewNames = {
    'S': 'אסטרטגיה',
    'A': 'אדפטיביות',
    'L': 'למידה',
    'I': 'השראה',
    'A2': 'אותנטיות',
    'M': 'משמעות'
  };

  const profileData = DIMENSION_ORDER.map((dimKey) => {
    const dimension = dimensions[dimKey];
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
    if (e.target === e.currentTarget) {
      setSelectedDimension(null);
    }
  };

  const getSegmentAngles = (startIndex: number, segmentCount: number) => {
    const baseAngle = 360 / profileData.length;
    const startAngle = baseAngle * startIndex + 1;
    const endAngle = baseAngle * (startIndex + segmentCount) - 1;
    return { startAngle, endAngle };
  };

  const archetypeBorders = [
    { ...getSegmentAngles(0, 2), color: '#9C27B0' },
    { ...getSegmentAngles(2, 2), color: '#FF9800' },
    { ...getSegmentAngles(4, 2), color: '#4CAF50' }
  ];

  const createArchetypeBorder = (startAngle: number, endAngle: number, outerRadius: number, strokeColor: string) => {
    const centerX = 50;
    const centerY = 50;
    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (endAngle - 90) * (Math.PI / 180);
    const x1 = centerX + outerRadius * Math.cos(startRad);
    const y1 = centerY + outerRadius * Math.sin(startRad);
    const x2 = centerX + outerRadius * Math.cos(endRad);
    const y2 = centerY + outerRadius * Math.sin(endRad);
    return (
      <path
        d={`M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 0 1 ${x2} ${y2}`}
        fill="none"
        stroke={strokeColor}
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.8"
      />
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
        <CardTitle className="text-center text-black text-xl sm:text-2xl">
          טביעת צבע אישית
        </CardTitle>
        <p className="text-center text-black text-sm sm:text-base">הפרופיל הצבעוני הייחודי שלך במנהיגות</p>
      </CardHeader>
      <CardContent className="flex flex-col items-center px-4 sm:px-6" onClick={handleClickOutside}>
        <div className="w-full h-64 sm:h-80 lg:h-96 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie 
                data={profileData} 
                cx="50%" 
                cy="50%" 
                outerRadius={isMobile ? "70%" : "75%"} 
                innerRadius={isMobile ? "25%" : "30%"} 
                paddingAngle={2} 
                dataKey="value"
                onClick={handlePieClick}
                style={{ cursor: 'pointer' }}
              >
                {profileData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    stroke={selectedDimension === entry.dimension ? '#333' : 'none'}
                    strokeWidth={selectedDimension === entry.dimension ? 3 : 0}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [name, '']} 
                labelFormatter={() => ''} 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  fontSize: isMobile ? '14px' : '16px'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>

          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
          >
            {archetypeBorders.map((border, index) => 
              createArchetypeBorder(
                border.startAngle, 
                border.endAngle, 
                isMobile ? 35 : 37.5,
                border.color
              )
            )}
          </svg>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalColorProfile;