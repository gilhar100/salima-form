
import React, { useState } from 'react';
import { SurveyResult } from "@/lib/types";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface PersonalColorProfileProps {
  result: SurveyResult;
}

const PersonalColorProfile: React.FC<PersonalColorProfileProps> = ({
  result
}) => {
  const isMobile = useIsMobile();
  const [selectedDimension, setSelectedDimension] = useState<string | null>(null);
  const { dimensions } = result;

  // Updated SALIMA color palette
  const dimensionColors = {
    'S': {
      strongest: '#B30000',
      strong: '#FD0100',
      medium: '#FF4D4D',
      weak: '#FF9999',
      weakest: '#FFE6E6'
    },
    'L': {
      strongest: '#0000B3',
      strong: '#333ED4',
      medium: '#6666FF',
      weak: '#9999FF',
      weakest: '#E6E6FF'
    },
    'I': {
      strongest: '#CC4400',
      strong: '#F76915',
      medium: '#FF8533',
      weak: '#FFAA66',
      weakest: '#FFE6CC'
    },
    'M': {
      strongest: '#8A3399',
      strong: '#BF4ED6',
      medium: '#CC66E0',
      weak: '#DD99E6',
      weakest: '#F5E6FF'
    },
    'A': {
      strongest: '#1F6B1F',
      strong: '#2FA236',
      medium: '#5CB85C',
      weak: '#90EE90',
      weakest: '#E6FFE6'
    },
    'A2': {
      strongest: '#B8B800',
      strong: '#EEDE04',
      medium: '#F0E833',
      weak: '#F5F566',
      weakest: '#FFFACD'
    }
  };

  // Dimension descriptions in Hebrew
  const dimensionDescriptions = {
    'S': 'היכולת לראות את התמונה הגדולה, לזהות הזדמנויות במצבים משתנים, ולפעול מתוך חזון ברור ולא רק מתוך תגובה למציאות הנוכחית. מנהלים עם ממד אסטרטגי גבוה מתמקדים באפקטיביות לטווח ארוך.',
    'A': 'גמישות מחשבתית והתנהגותית, היכולת להסתגל במהירות לשינויים, להתמודד עם אי-ודאות ולפעול ביצירתיות גם במצבי קצה. ממד זה קשור לחוסן ולקבלת שינוי כהזדמנות.',
    'L': 'גישה של צמיחה מתמשכת, פתיחות למשוב וללמידה מהצלחות וכישלונות. ממד הלמידה מצביע על סקרנות, עומק מקצועי ורצון להתפתח ולהשתפר כל הזמן.',
    'I': 'היכולת להניע אחרים באמצעות נרטיב, ערכים ודוגמה אישית. מנהלים עם השראה גבוהה יוצרים אמון, מעוררים מוטיבציה ומקרינים נוכחות מנהיגותית.',
    'M': 'קשר עמוק לערכים פנימיים, מחויבות לתרומה שמעבר לעצמי ולתחושת שליחות. ממד המשמעות מייצג מנהיגות קשובה שפועלת בהלימה למטרות ערכיות.',
    'A2': 'שקיפות, יושרה ויכולת להביא את עצמך באופן כן ומדויק גם במצבי לחץ. ממד זה עוסק בכנות, אמפתיה, ובחיבור בין העולם הפנימי שלך להתנהלותך המקצועית.'
  };

  // פונקציה לקבלת עוצמת צבע בהתאם לציון
  function getIntensityColor(score: number, baseColors: any) {
    const normalizedScore = Math.max(0, Math.min(5, score)) / 5;
    if (normalizedScore >= 0.9) return baseColors.strongest;
    if (normalizedScore >= 0.75) return baseColors.strong;
    if (normalizedScore >= 0.6) return baseColors.medium;
    if (normalizedScore >= 0.4) return baseColors.weak;
    return baseColors.weakest;
  }

  // פונקציה לסקיילה לא ליניארית
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

  // הכנת הנתונים לתצוגה בגלגל הצבעים
  const profileData = [{
    name: 'אסטרטגיה',
    dimension: 'S',
    value: getExtremeNonLinearSize(dimensions.S.score),
    color: getIntensityColor(dimensions.S.score, dimensionColors.S),
    originalScore: dimensions.S.score
  }, {
    name: 'למידה',
    dimension: 'L',
    value: getExtremeNonLinearSize(dimensions.L.score),
    color: getIntensityColor(dimensions.L.score, dimensionColors.L),
    originalScore: dimensions.L.score
  }, {
    name: 'השראה',
    dimension: 'I',
    value: getExtremeNonLinearSize(dimensions.I.score),
    color: getIntensityColor(dimensions.I.score, dimensionColors.I),
    originalScore: dimensions.I.score
  }, {
    name: 'משמעות',
    dimension: 'M',
    value: getExtremeNonLinearSize(dimensions.M.score),
    color: getIntensityColor(dimensions.M.score, dimensionColors.M),
    originalScore: dimensions.M.score
  }, {
    name: 'אדפטיביות',
    dimension: 'A',
    value: getExtremeNonLinearSize(dimensions.A.score),
    color: getIntensityColor(dimensions.A.score, dimensionColors.A),
    originalScore: dimensions.A.score
  }, {
    name: 'אותנטיות',
    dimension: 'A2',
    value: getExtremeNonLinearSize(dimensions.A2.score),
    color: getIntensityColor(dimensions.A2.score, dimensionColors.A2),
    originalScore: dimensions.A2.score
  }];

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

  return (
    <Card className="w-full">
      <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
        <CardTitle className="text-center text-black text-xl sm:text-2xl">
          טביעת צבע אישית
        </CardTitle>
        <p className="text-center text-black text-sm sm:text-base">הפרופיל הצבעוני הייחודי שלך במנהיגות</p>
      </CardHeader>
      <CardContent className="flex flex-col items-center px-4 sm:px-6" onClick={handleClickOutside}>
        <div className="w-full h-64 sm:h-80 lg:h-96">
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
                formatter={(value, name, props) => [name, '']} 
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
        </div>
        
        {/* Tooltip/Description Box */}
        {selectedDimension && (
          <div className="mt-4 p-4 bg-white border-2 rounded-lg shadow-lg max-w-2xl w-full" 
               style={{ borderColor: profileData.find(d => d.dimension === selectedDimension)?.color }}>
            <h3 className="font-bold text-lg mb-3 text-center" 
                style={{ color: profileData.find(d => d.dimension === selectedDimension)?.color }}>
              {profileData.find(d => d.dimension === selectedDimension)?.name}
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-gray-700 text-right" dir="rtl">
              {dimensionDescriptions[selectedDimension as keyof typeof dimensionDescriptions]}
            </p>
          </div>
        )}
        
        {/* מקרא צבעים עם נראות משופרת */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 mt-3 sm:mt-4 w-full max-w-2xl">
          {profileData.map((dimension, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 p-2 sm:p-3 rounded-lg border-2 shadow-sm cursor-pointer hover:shadow-md transition-shadow" 
              style={{
                backgroundColor: 'white',
                borderColor: dimension.color
              }}
              onClick={() => handlePieClick(dimension)}
            >
              <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border-2 border-gray-300 shadow-md flex-shrink-0" 
                   style={{ backgroundColor: dimension.color }} />
              <div className="flex-1 min-w-0">
                <p className="text-black font-medium truncate text-xs sm:text-sm">
                  {dimension.name}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-black text-center mt-3 sm:mt-4 max-w-lg text-sm sm:text-base px-2">
          גודל הפרק ועוצמת הצבע משקפים את חוזק הממד בפרופיל המנהיגות שלך
          <br />
          <span className="text-xs text-gray-600 mt-1 block">לחץ על פרק או על שם הממד למידע נוסף</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalColorProfile;
