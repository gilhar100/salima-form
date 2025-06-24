
import { questions } from '@/data/questions';

export const getDimensionQuestions = (dimension: string) => {
  return questions.filter(q => q.dimension === dimension);
};
