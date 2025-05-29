
// פונקציה לקבלת עוצמת צבע בהתאם לציון
export const getColorIntensity = (score: number, baseColors: any) => {
  const normalizedScore = Math.max(0, Math.min(5, score)) / 5;
  
  if (normalizedScore >= 0.9) return baseColors.strongest;
  if (normalizedScore >= 0.75) return baseColors.strong;
  if (normalizedScore >= 0.55) return baseColors.medium;
  if (normalizedScore >= 0.35) return baseColors.weak;
  return baseColors.weakest;
};
