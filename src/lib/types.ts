
// סוגי הממדים בשאלון
export type Dimension = 'S' | 'L' | 'I' | 'M' | 'A' | 'A2';

// מבנה שאלה בשאלון
export interface Question {
  id: number;
  text: string;
  dimension: Dimension;
  isReversed: boolean;
}

// תשובה של משתמש
export interface Answer {
  questionId: number;
  value: number;
}

// מבנה התוצאה המחושבת לכל ממד
export interface DimensionResult {
  dimension: Dimension;
  score: number;
  questions: number[];
  title: string;
  description: string;
}

// מבנה התוצאה הכוללת של השאלון
export interface SurveyResult {
  dimensions: {
    S: DimensionResult;
    L: DimensionResult;
    I: DimensionResult;
    M: DimensionResult;
    A: DimensionResult;
    A2: DimensionResult;
  };
  slq: number;
  userInfo: UserInfo;
  date: string;
}

// מידע על המשתמש
export interface UserInfo {
  name: string;
  email: string;
  position?: string;
  department?: string;
  organization?: string;
}
