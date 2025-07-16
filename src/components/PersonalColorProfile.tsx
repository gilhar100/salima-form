
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

  // Updated SALIMA color palette with new color assignments
  const dimensionColors = {
    'S': { // Strategy - Red
      strongest: '#B71C1C',
      strong: '#D32F2F',
      medium: '#F44336',
      weak: '#EF5350',
      weakest: '#FFCDD2'
    },
    'A': { // Adaptive - Blue
      strongest: '#0D47A1',
      strong: '#1976D2',
      medium: '#2196F3',
      weak: '#42A5F5',
      weakest: '#BBDEFB'
    },
    'L': { // Learning - Yellow
      strongest: '#F57F17',
      strong: '#FBC02D',
      medium: '#FFEB3B',
      weak: '#FFEE58',
      weakest: '#FFF9C4'
    },
    'I': { // Inspiration - Pink
      strongest: '#AD1457',
      strong: '#C2185B',
      medium: '#E91E63',
      weak: '#EC407A',
      weakest: '#F8BBD9'
    },
    'A2': { // Authentic - Turquoise
      strongest: '#00695C',
      strong: '#00796B',
      medium: '#009688',
      weak: '#26A69A',
      weakest: '#B2DFDB'
    },
    'M': { // Meaning - Brown
      strongest: '#3E2723',
      strong: '#5D4037',
      medium: '#795548',
      weak: '#8D6E63',
      weakest: '#D7CCC8'
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

  // Archetype group definitions
  const archetypeGroups = {
    opportunity: {
      name: 'מנהל ההזדמנות',
      dimensions: ['S', 'A'],
      borderColor: '#9C27B0' // Purple
    },
    curious: {
      name: 'המנהל הסקרן',
      dimensions: ['L', 'I'],
      borderColor: '#FF9800' // Orange
    },
    empowering: {
      name: 'המנהל המעצים',
      dimensions: ['A2', 'M'],
      borderColor: '#4CAF50' // Green
    }
  };

  // הכנת הנתונים לתצוגה בגלגל הצבעים - ordered for adjacency
  const profileData = [
    // Strategy + Adaptive (מנהל ההזדמנות)
    {
      name: 'אסטרטגיה',
      dimension: 'S',
      value: getExtremeNonLinearSize(dimensions.S.score),
      color: getIntensityColor(dimensions.S.score, dimensionColors.S),
      originalScore: dimensions.S.score,
      archetype: 'opportunity'
    },
    {
      name: 'אדפטיביות',
      dimension: 'A',
      value: getExtremeNonLinearSize(dimensions.A.score),
      color: getIntensityColor(dimensions.A.score, dimensionColors.A),
      originalScore: dimensions.A.score,
      archetype: 'opportunity'
    },
    // Learning + Inspiration (המנהל הסקרן)
    {
      name: 'למידה',
      dimension: 'L',
      value: getExtremeNonLinearSize(dimensions.L.score),
      color: getIntensityColor(dimensions.L.score, dimensionColors.L),
      originalScore: dimensions.L.score,
      archetype: 'curious'
    },
    {
      name: 'השראה',
      dimension: 'I',
      value: getExtremeNonLinearSize(dimensions.I.score),
      color: getIntensityColor(dimensions.I.score, dimensionColors.I),
      originalScore: dimensions.I.score,
      archetype: 'curious'
    },
    // Authentic + Meaning (המנהל המעצים)
    {
      name: 'אותנטיות',
      dimension: 'A2',
      value: getExtremeNonLinearSize(dimensions.A2.score),
      color: getIntensityColor(dimensions.A2.score, dimensionColors.A2),
      originalScore: dimensions.A2.score,
      archetype: 'empowering'
    },
    {
      name: 'משמעות',
      dimension: 'M',
      value: getExtremeNonLinearSize(dimensions.M.score),
      color: getIntensityColor(dimensions.M.score, dimensionColors.M),
      originalScore: dimensions.M.score,
      archetype: 'empowering'
    }
  ];

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
          
          {/* Archetype Group Borders Overlay */}
          <svg 
            className="absolute inset-0 pointer-events-none"
            width="100%" 
            height="100%"
            style={{ zIndex: 10 }}
          >
            <defs>
              {/* Gradient borders for archetype groups */}
              <linearGradient id="opportunityBorder" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={archetypeGroups.opportunity.borderColor} stopOpacity="0.8" />
                <stop offset="100%" stopColor={archetypeGroups.opportunity.borderColor} stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="curiousBorder" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={archetypeGroups.curious.borderColor} stopOpacity="0.8" />
                <stop offset="100%" stopColor={archetypeGroups.curious.borderColor} stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="empoweringBorder" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={archetypeGroups.empowering.borderColor} stopOpacity="0.8" />
                <stop offset="100%" stopColor={archetypeGroups.empowering.borderColor} stopOpacity="0.8" />
              </linearGradient>
            </defs>
            
            {/* Archetype group borders - positioned as arcs around pairs */}
            {(() => {
              const centerX = '50%';
              const centerY = '50%';
              const outerRadius = isMobile ? 85 : 95; // Slightly larger than pie chart
              const strokeWidth = 4;
              
              // Calculate arc paths for each archetype group
              const groups = [
                { 
                  id: 'opportunity', 
                  startAngle: 0, 
                  endAngle: 120, // First two segments (S + A)
                  color: 'url(#opportunityBorder)'
                },
                { 
                  id: 'curious', 
                  startAngle: 120, 
                  endAngle: 240, // Next two segments (L + I)
                  color: 'url(#curiousBorder)'
                },
                { 
                  id: 'empowering', 
                  startAngle: 240, 
                  endAngle: 360, // Last two segments (A2 + M)
                  color: 'url(#empoweringBorder)'
                }
              ];
              
              return groups.map(group => {
                const startAngleRad = (group.startAngle - 90) * Math.PI / 180;
                const endAngleRad = (group.endAngle - 90) * Math.PI / 180;
                
                const x1 = 50 + outerRadius * Math.cos(startAngleRad);
                const y1 = 50 + outerRadius * Math.sin(startAngleRad);
                const x2 = 50 + outerRadius * Math.cos(endAngleRad);
                const y2 = 50 + outerRadius * Math.sin(endAngleRad);
                
                const largeArcFlag = group.endAngle - group.startAngle > 180 ? 1 : 0;
                
                return (
                  <path
                    key={group.id}
                    d={`M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`}
                    fill="none"
                    stroke={group.color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    opacity="0.9"
                  />
                );
              });
            })()}
          </svg>
        </div>
        
        {/* Tooltip/Description Box */}
        {selectedDimension && (
          <div className="mt-4 p-4 bg-white border-2 rounded-lg shadow-lg max-w-2xl w-full" 
               style={{ borderColor: profileData.find(d => d.dimension === selectedDimension)?.color }}>
            <h3 className="font-bold text-lg mb-3 text-center text-black">
              {profileData.find(d => d.dimension === selectedDimension)?.name}
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-black text-right" dir="rtl">
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
