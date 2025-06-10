
import { SurveyResult, ColleagueSubmissionResult, Answer } from "@/lib/types";
import { supabase } from "@/integrations/supabase/client";

// פונקציה ליצירת אובייקט עם כל השאלות q1-q90
const createQuestionFields = (answers: Answer[]) => {
  const questionFields: { [key: string]: number | null } = {};
  
  // Initialize all questions to null
  for (let i = 1; i <= 90; i++) {
    questionFields[`q${i}`] = null;
  }
  
  // Fill in the actual answers (raw values without reverse scoring)
  answers.forEach(answer => {
    questionFields[`q${answer.questionId}`] = answer.value;
  });
  
  return questionFields;
};

// פונקציה לשמירת תוצאות שאלון מנהלים במסד הנתונים
export async function saveSurveyToDatabase(
  results: SurveyResult, 
  answers: Answer[],
  consentForResearch: boolean, 
  isAnonymous: boolean = true
): Promise<void> {
  try {
    console.log('מתחיל שמירת נתוני מנהל:', results);
    console.log('תשובות גולמיות:', answers);
    
    // Create question fields object
    const questionFields = createQuestionFields(answers);
    
    const surveyData = {
      user_email: isAnonymous ? null : results.userInfo.email,
      user_name: isAnonymous ? null : results.userInfo.name,
      organization: isAnonymous ? null : results.userInfo.organization,
      department: isAnonymous ? null : results.userInfo.department,
      position: isAnonymous ? null : results.userInfo.position,
      slq_score: results.slq,
      dimension_s: results.dimensions.S.score,
      dimension_l: results.dimensions.L.score,
      dimension_i: results.dimensions.I.score,
      dimension_m: results.dimensions.M.score,
      dimension_a: results.dimensions.A.score,
      dimension_a2: results.dimensions.A2.score,
      strategy: results.slq, // נשמור את ה-SLQ גם בשדה strategy לתאימות לאחור
      consent_for_research: consentForResearch,
      is_anonymous: isAnonymous,
      survey_type: 'manager',
      answers: answers.map(a => a.value), // Array of raw values for backward compatibility
      ...questionFields // Add all q1-q90 fields
    };

    console.log('נתונים לשמירה:', surveyData);

    const { data, error } = await supabase
      .from('survey_responses')
      .insert([surveyData])
      .select();

    if (error) {
      console.error('שגיאה בשמירת הנתונים:', error);
      throw error;
    }

    console.log('נתוני שאלון המנהלים נשמרו בהצלחה:', data);
  } catch (error) {
    console.error('שגיאה בשמירת תוצאות שאלון המנהלים:', error);
    throw error;
  }
}

// פונקציה לשמירת תוצאות שאלון עמיתים במסד הנתונים
export async function saveColleagueSurveyToDatabase(
  results: ColleagueSubmissionResult,
  answers: Answer[],
  consentForResearch: boolean, 
  isAnonymous: boolean = true
): Promise<void> {
  try {
    console.log('מתחיל שמירת נתוני עמיתים:', results);
    console.log('תשובות גולמיות עמיתים:', answers);
    
    // Create question fields object
    const questionFields = createQuestionFields(answers);
    
    const colleagueSurveyData = {
      manager_name: results.evaluatorInfo.managerName,
      manager_position: isAnonymous ? null : results.evaluatorInfo.managerPosition,
      manager_department: isAnonymous ? null : results.evaluatorInfo.managerDepartment,
      evaluator_name: isAnonymous ? null : results.evaluatorInfo.evaluatorName,
      evaluator_email: isAnonymous ? null : results.evaluatorInfo.evaluatorEmail,
      evaluator_position: isAnonymous ? null : results.evaluatorInfo.evaluatorPosition,
      evaluator_department: isAnonymous ? null : results.evaluatorInfo.evaluatorDepartment,
      organization: isAnonymous ? null : results.evaluatorInfo.organization,
      slq_score: results.slq,
      dimension_s: results.dimensions.S,
      dimension_l: results.dimensions.L,
      dimension_i: results.dimensions.I,
      dimension_m: results.dimensions.M,
      dimension_a: results.dimensions.A,
      dimension_a2: results.dimensions.A2,
      consent_for_research: consentForResearch,
      is_anonymous: isAnonymous,
      answers: answers.map(a => a.value), // Array of raw values for backward compatibility
      ...questionFields // Add all q1-q90 fields
    };

    console.log('נתוני עמיתים לשמירה:', colleagueSurveyData);

    const { data, error } = await supabase
      .from('colleague_survey_responses')
      .insert([colleagueSurveyData])
      .select();

    if (error) {
      console.error('שגיאה בשמירת נתוני שאלון עמיתים:', error);
      throw error;
    }

    console.log('נתוני שאלון העמיתים נשמרו בהצלחה:', data);
  } catch (error) {
    console.error('שגיאה בשמירת תוצאות שאלון עמיתים:', error);
    throw error;
  }
}

// פונקציה לקבלת סטטיסטיקות כלליות עם אפשרות סינון לפי סוג שאלון
export async function getSurveyStatistics(surveyType?: 'manager' | 'colleague') {
  try {
    let query = supabase
      .from('survey_responses')
      .select('*')
      .eq('consent_for_research', true);

    if (surveyType) {
      query = query.eq('survey_type', surveyType);
    }

    const { data, error } = await query;

    if (error) {
      console.error('שגיאה בטעינת הסטטיסטיקות:', error);
      throw error;
    }

    // ודא שכל הנתונים כוללים את כל השדות הנדרשים עם ערכי ברירת מחדל
    const normalizedData = (data || []).map(record => ({
      ...record,
      dimension_s: record.dimension_s ?? 0,
      dimension_l: record.dimension_l ?? 0,
      dimension_i: record.dimension_i ?? 0,
      dimension_m: record.dimension_m ?? 0,
      dimension_a: record.dimension_a ?? 0,
      dimension_a2: record.dimension_a2 ?? 0,
      slq_score: record.slq_score ?? 0
    }));

    return normalizedData;
  } catch (error) {
    console.error('שגיאה בקבלת הסטטיסטיקות:', error);
    throw error;
  }
}

// פונקציה לקבלת נתוני עמיתים עם אפשרות סינון לפי שם מנהל
export async function getColleagueSurveyData(managerName?: string) {
  try {
    let query = supabase
      .from('colleague_survey_responses')
      .select('*')
      .eq('consent_for_research', true);

    if (managerName) {
      query = query.eq('manager_name', managerName);
    }

    const { data, error } = await query;

    if (error) {
      console.error('שגיאה בטעינת נתוני עמיתים:', error);
      throw error;
    }

    // ודא שכל הנתונים כוללים את כל השדות הנדרשים עם ערכי ברירת מחדל
    const normalizedData = (data || []).map(record => ({
      ...record,
      dimension_s: record.dimension_s ?? 0,
      dimension_l: record.dimension_l ?? 0,
      dimension_i: record.dimension_i ?? 0,
      dimension_m: record.dimension_m ?? 0,
      dimension_a: record.dimension_a ?? 0,
      dimension_a2: record.dimension_a2 ?? 0,
      slq_score: record.slq_score ?? 0
    }));

    return normalizedData;
  } catch (error) {
    console.error('שגיאה בקבלת נתוני עמיתים:', error);
    throw error;
  }
}

// פונקציה להשוואה בין נתוני מנהל לנתוני עמיתים
export async function getManagerComparisonData(managerName: string, managerEmail?: string) {
  try {
    // קבלת נתוני המנהל
    let managerQuery = supabase
      .from('survey_responses')
      .select('*')
      .eq('survey_type', 'manager')
      .eq('consent_for_research', true);

    if (managerEmail) {
      managerQuery = managerQuery.eq('user_email', managerEmail);
    } else if (managerName) {
      managerQuery = managerQuery.eq('user_name', managerName);
    }

    const { data: managerData, error: managerError } = await managerQuery;

    if (managerError) {
      console.error('שגיאה בטעינת נתוני המנהל:', managerError);
      throw managerError;
    }

    // קבלת נתוני העמיתים
    const { data: colleagueData, error: colleagueError } = await supabase
      .from('colleague_survey_responses')
      .select('*')
      .eq('manager_name', managerName)
      .eq('consent_for_research', true);

    if (colleagueError) {
      console.error('שגיאה בטעינת נתוני העמיתים:', colleagueError);
      throw colleagueError;
    }

    // נרמול הנתונים
    const normalizedManagerData = (managerData || []).map(record => ({
      ...record,
      dimension_s: record.dimension_s ?? 0,
      dimension_l: record.dimension_l ?? 0,
      dimension_i: record.dimension_i ?? 0,
      dimension_m: record.dimension_m ?? 0,
      dimension_a: record.dimension_a ?? 0,
      dimension_a2: record.dimension_a2 ?? 0
    }));

    const normalizedColleagueData = (colleagueData || []).map(record => ({
      ...record,
      dimension_s: record.dimension_s ?? 0,
      dimension_l: record.dimension_l ?? 0,
      dimension_i: record.dimension_i ?? 0,
      dimension_m: record.dimension_m ?? 0,
      dimension_a: record.dimension_a ?? 0,
      dimension_a2: record.dimension_a2 ?? 0
    }));

    return {
      managerData: normalizedManagerData,
      colleagueData: normalizedColleagueData
    };
  } catch (error) {
    console.error('שגיאה בקבלת נתוני השוואה:', error);
    throw error;
  }
}
