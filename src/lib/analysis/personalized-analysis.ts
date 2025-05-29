
import { questions } from "@/data/questions";
import { getAdjustedValue } from "@/lib/calculations";
import { getSpecificInsight } from './specific-insights';

// פונקציה לניתוח מפורט של תשובות
export const analyzeSpecificAnswers = (dimension: string, answersForDimension: { questionId: number; value: number }[]): string => {
  console.log(`Analyzing dimension ${dimension} with ${answersForDimension.length} answers:`, answersForDimension);
  
  if (answersForDimension.length === 0) {
    return "לא זוהו תשובות רלוונטיות לממד זה. אנא ודא שהשאלון הושלם במלואו.";
  }

  // מיון התשובות לפי ציון מותאם (לאחר התאמה לשאלות הפוכות)
  const processedAnswers = answersForDimension
    .map(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      const adjustedValue = getAdjustedValue(answer.value, question?.isReversed || false);
      
      console.log(`Question ${answer.questionId}: original=${answer.value}, adjusted=${adjustedValue}, reversed=${question?.isReversed}`);
      
      return {
        questionId: answer.questionId,
        text: question?.text || `שאלה ${answer.questionId}`,
        originalValue: answer.value,
        adjustedValue,
        isReversed: question?.isReversed || false
      };
    })
    .sort((a, b) => b.adjustedValue - a.adjustedValue);

  let analysis = "";

  // חלוקה לקטגוריות על בסיס הציון המותאם
  const strongAreas = processedAnswers.filter(a => a.adjustedValue >= 4);
  const moderateAreas = processedAnswers.filter(a => a.adjustedValue >= 3 && a.adjustedValue < 4);
  const developmentAreas = processedAnswers.filter(a => a.adjustedValue < 3);

  console.log(`Strong: ${strongAreas.length}, Moderate: ${moderateAreas.length}, Development: ${developmentAreas.length}`);

  // ניתוח התחומים החזקים
  if (strongAreas.length > 0) {
    analysis += "**🌟 תחומי חוזקה:**\n";
    strongAreas.forEach((area) => {
      const insight = getSpecificInsight(area.text, dimension, area.adjustedValue, 'strength');
      analysis += `• ${insight}\n`;
    });
    analysis += "\n";
  }

  // ניתוח התחומים הבינוניים
  if (moderateAreas.length > 0) {
    analysis += "**⚖️ תחומים בינוניים:**\n";
    moderateAreas.forEach((area) => {
      const insight = getSpecificInsight(area.text, dimension, area.adjustedValue, 'moderate');
      analysis += `• ${insight}\n`;
    });
    analysis += "\n";
  }

  // ניתוח תחומי פיתוח
  if (developmentAreas.length > 0) {
    analysis += "**🎯 תחומים לשיפור:**\n";
    developmentAreas.forEach((area) => {
      const insight = getSpecificInsight(area.text, dimension, area.adjustedValue, 'development');
      analysis += `• ${insight}\n`;
    });
  }

  return analysis.trim();
};

// הפונקציה המרכזית לקבלת ניתוח מותאם אישית
export const getPersonalizedAnalysis = (dimension: string, answersForDimension: { questionId: number; value: number }[]) => {
  console.log(`Getting personalized analysis for dimension ${dimension}:`, answersForDimension);
  return analyzeSpecificAnswers(dimension, answersForDimension);
};
