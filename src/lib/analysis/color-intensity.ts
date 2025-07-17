
// פונקציה לקבלת צבע קבוע - Updated to use fixed colors
export const getColorIntensity = (score: number, baseColors: any) => {
  // Always return the fixed strong color, ignoring score
  return baseColors.strong;
};
