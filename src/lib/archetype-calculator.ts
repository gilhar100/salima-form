
import { Answer } from "./types";

// Archetype definitions with their SALIMA parameters
const ARCHETYPES = {
  "המנהל הסקרן": {
    parameters: ["Learning", "Inspiration"],
    questions: [93, 96, 98, 100, 105] // Questions 93, 96, 98, 100, 105
  },
  "מנהל ההזדמנות": {
    parameters: ["Strategy", "Adaptive"],
    questions: [91, 94, 97, 101, 103] // Questions 91, 94, 97, 101, 103
  },
  "המנהל המעצים": {
    parameters: ["Authenticity", "Meaning"],
    questions: [92, 95, 99, 102, 104] // Questions 92, 95, 99, 102, 104
  }
};

// Parameter to question mapping (from the existing SALIMA logic)
const PARAMETER_QUESTIONS = {
  "Strategy": [1, 7, 13, 19, 25, 31, 37, 43, 49, 55, 61, 67, 73, 79, 85],
  "Learning": [2, 8, 14, 20, 26, 32, 38, 44, 50, 56, 62, 68, 74, 80, 86],
  "Inspiration": [3, 9, 15, 21, 27, 33, 39, 45, 51, 57, 63, 69, 75, 81, 87],
  "Meaning": [4, 10, 16, 22, 28, 34, 40, 46, 52, 58, 64, 70, 76, 82, 88],
  "Authenticity": [5, 11, 17, 23, 29, 35, 41, 47, 53, 59, 65, 71, 77, 83, 89],
  "Adaptive": [6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90]
};

// Questions that need to be reversed (from the existing logic)
const REVERSED_QUESTIONS = [1, 3, 7, 9, 13, 15, 19, 21, 25, 27, 31, 33, 37, 39, 43, 45, 49, 51, 55, 57, 61, 63, 67, 69, 73, 75, 79, 81, 85, 87];

// Calculate effective score (considering reversed questions)
const calculateEffectiveScore = (questionId: number, value: number): number => {
  return REVERSED_QUESTIONS.includes(questionId) ? (6 - value) : value;
};

// Calculate average score for a parameter
const calculateParameterScore = (parameter: string, answers: Answer[]): number => {
  const questionIds = PARAMETER_QUESTIONS[parameter as keyof typeof PARAMETER_QUESTIONS] || [];
  const relevantAnswers = answers.filter(answer => questionIds.includes(answer.questionId));
  
  if (relevantAnswers.length === 0) {
    console.warn(`No answers found for parameter: ${parameter}`);
    return 0;
  }
  
  const totalScore = relevantAnswers.reduce((sum, answer) => {
    return sum + calculateEffectiveScore(answer.questionId, answer.value);
  }, 0);
  
  return totalScore / relevantAnswers.length;
};

// Calculate average score for archetype-specific questions
const calculateArchetypeQuestionsScore = (archetypeQuestions: number[], answers: Answer[]): number => {
  const relevantAnswers = answers.filter(answer => archetypeQuestions.includes(answer.questionId));
  
  if (relevantAnswers.length === 0) {
    console.warn(`No archetype questions answered`);
    return 0;
  }
  
  const totalScore = relevantAnswers.reduce((sum, answer) => {
    return sum + answer.value; // Archetype questions are not reversed
  }, 0);
  
  return totalScore / relevantAnswers.length;
};

// Calculate dominant archetype
export const calculateDominantArchetype = (allAnswers: Answer[]): string => {
  console.log('Calculating dominant archetype with answers:', allAnswers.length);
  
  if (allAnswers.length === 0) {
    console.warn('No answers provided for archetype calculation');
    return "המנהל הסקרן"; // Default fallback
  }
  
  let highestScore = -1;
  let dominantArchetype = "המנהל הסקרן";
  
  Object.entries(ARCHETYPES).forEach(([archetypeName, archetypeData]) => {
    console.log(`Calculating score for archetype: ${archetypeName}`);
    
    // Calculate parameter scores (70% weight)
    const parameter1Score = calculateParameterScore(archetypeData.parameters[0], allAnswers);
    const parameter2Score = calculateParameterScore(archetypeData.parameters[1], allAnswers);
    const averageParameterScore = (parameter1Score + parameter2Score) / 2;
    
    console.log(`Parameter scores for ${archetypeName}: ${archetypeData.parameters[0]}=${parameter1Score}, ${archetypeData.parameters[1]}=${parameter2Score}, average=${averageParameterScore}`);
    
    // Calculate archetype-specific questions score (30% weight)
    const archetypeQuestionsScore = calculateArchetypeQuestionsScore(archetypeData.questions, allAnswers);
    
    console.log(`Archetype questions score for ${archetypeName}: ${archetypeQuestionsScore}`);
    
    // Combined score: 70% parameters + 30% archetype questions
    const combinedScore = (averageParameterScore * 0.7) + (archetypeQuestionsScore * 0.3);
    
    console.log(`Combined score for ${archetypeName}: ${combinedScore}`);
    
    if (combinedScore > highestScore) {
      highestScore = combinedScore;
      dominantArchetype = archetypeName;
    }
  });
  
  console.log(`Dominant archetype determined: ${dominantArchetype} with score: ${highestScore}`);
  return dominantArchetype;
};
