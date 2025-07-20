
import { Answer } from "./types";
import { questions } from "@/data/questions";

// Archetype calculation logic
export const calculateDominantArchetype = (answers: Answer[]): string => {
  // Calculate archetype scores based on answers
  const archetypeScores = calculateAllArchetypeScores(answers);
  
  // Find the highest scoring archetype
  const dominant = Object.entries(archetypeScores).reduce((prev, current) => 
    prev[1] > current[1] ? prev : current
  );
  
  return dominant[0];
};

export const calculateAllArchetypeScores = (answers: Answer[]): Record<string, number> => {
  // Helper function to get answer by question ID
  const getAnswer = (questionId: number): number => {
    const answer = answers.find(a => a.questionId === questionId);
    return answer ? answer.value : 0;
  };

  // Calculate dimension averages from core questions (1-90)
  const strategyScore = calculateDimensionScore(answers, 'S');
  const adaptiveScore = calculateDimensionScore(answers, 'A');
  const learningScore = calculateDimensionScore(answers, 'L');
  const inspirationScore = calculateDimensionScore(answers, 'I');
  const meaningScore = calculateDimensionScore(answers, 'M');
  const authenticityScore = calculateDimensionScore(answers, 'A2');

  // Calculate averages for archetype dimensions
  const strategyAdaptiveAvg = (strategyScore + adaptiveScore) / 2;
  const authenticityMeaningAvg = (authenticityScore + meaningScore) / 2;
  const learningInspirationAvg = (learningScore + inspirationScore) / 2;

  // Calculate archetype-specific question averages (questions 91-105)
  const opportunityAvg = (
    getAnswer(91) + getAnswer(94) + getAnswer(97) + getAnswer(101) + getAnswer(103)
  ) / 5;

  const empoweringAvg = (
    getAnswer(92) + getAnswer(95) + getAnswer(99) + getAnswer(102) + getAnswer(104)
  ) / 5;

  const curiousAvg = (
    getAnswer(93) + getAnswer(96) + getAnswer(98) + getAnswer(100) + getAnswer(105)
  ) / 5;

  // Calculate final archetype scores (70% dimension average + 30% specific questions)
  const archetype1Score = 0.7 * strategyAdaptiveAvg + 0.3 * opportunityAvg;
  const archetype2Score = 0.7 * authenticityMeaningAvg + 0.3 * empoweringAvg;
  const archetype3Score = 0.7 * learningInspirationAvg + 0.3 * curiousAvg;

  return {
    "מנהל ההזדמנות": archetype1Score,
    "המנהל המעצים": archetype2Score,
    "המנהל הסקרן": archetype3Score
  };
};

// Helper function to calculate dimension scores from answers
const calculateDimensionScore = (answers: Answer[], dimension: string): number => {
  // Filter answers by the specific dimension
  const relevantQuestionIds = questions
    .filter(q => q.dimension === dimension && q.id >= 1 && q.id <= 90)
    .map(q => q.id);
  
  const relevantAnswers = answers.filter(answer => 
    relevantQuestionIds.includes(answer.questionId)
  );
  
  if (relevantAnswers.length === 0) return 0;
  
  const sum = relevantAnswers.reduce((total, answer) => total + answer.value, 0);
  return sum / relevantAnswers.length;
};
