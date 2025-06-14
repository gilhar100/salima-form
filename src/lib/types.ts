// סוגי הממדים בשאלון
export type Dimension = 'S' | 'L' | 'I' | 'M' | 'A' | 'A2';

// סוג השאלון
export type SurveyType = 'manager' | 'colleague';

// מבנה שאלה בשאלון
export interface Question {
  id: number;
  text: string;
  dimension: Dimension;
  isReversed: boolean;
  colleagueText?: string; // טקסט מותאם לשאלון עמיתים
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
  group_number?: number; // Add group_number property
}

// מידע על המשתמש - שאלון מנהלים
export interface UserInfo {
  groupNumber?: string; // Updated: Make groupNumber attribute available
  name: string;
  email: string;
  organization?: string;
  department?: string;
  position?: string;
}

// מידע על המעריך בשאלון עמיתים
export interface ColleagueEvaluatorInfo {
  evaluatorName: string;
  evaluatorEmail: string;
  evaluatorPosition?: string;
  evaluatorDepartment?: string;
  organization?: string;
  managerName: string;
  managerPosition?: string;
  managerDepartment?: string;
}

// מבנה התוצאה עבור שאלון עמיתים
export interface ColleagueSubmissionResult {
  slq: number;
  dimensions: {
    S: number;
    L: number;
    I: number;
    M: number;
    A: number;
    A2: number;
  };
  evaluatorInfo: ColleagueEvaluatorInfo;
  date: string;
}
