import { supabase } from "@/integrations/supabase/client";
import { SurveyResult, ColleagueSubmissionResult, Answer, UserInfo } from "./types";

// Helper function to convert raw answers array to object - now handles questions 1-105
const convertRawAnswersToObject = (rawAnswers: Answer[]): Record<string, number | null> => {
  const rawAnswersObject: Record<string, number | null> = {};
  // עכשיו נטפל בשאלות 1-105 (כולל שאלות האבטיפוסים)
  for (let i = 1; i <= 105; i++) {
    const answer = rawAnswers.find(a => a.questionId === i);
    rawAnswersObject[`q${i}`] = answer ? answer.value : null;
  }
  return rawAnswersObject;
};

// New function to save archetype answers to archetype_logic table  
export const saveArchetypeAnswersToDatabase = async (
  archetypeAnswers: Answer[],
  userInfo: UserInfo
) => {
  try {
    console.log('שמירת תשובות ארכיטיפ במסד הנתונים:', archetypeAnswers);
    
    // For each archetype answer, we could save it to a separate responses table
    // or update the existing archetype_logic entries with user responses
    // For now, we'll log the archetype responses - this could be extended
    // to save to a new table like "archetype_responses" if needed
    
    console.log('Archetype answers received for user:', userInfo.name);
    console.log('Archetype answers data:', archetypeAnswers);
    
    // TODO: If you want to store individual user responses to archetype questions,
    // create a new table "archetype_responses" and save the data there
    
    return { success: true, message: 'Archetype answers processed' };
  } catch (error) {
    console.error('שגיאה בשמירת תשובות ארכיטיפ:', error);
    throw error;
  }
};

export const saveSurveyToDatabase = async (
  results: SurveyResult,
  rawAnswers: Answer[],
  consentForResearch: boolean = false,
  isAnonymous: boolean = true
) => {
  try {
    console.log('שמירת תוצאות שאלון במסד הנתונים:', results);
    
    // Prepare raw answers as individual columns (only questions 1-90 for core survey)
    const rawAnswersObject: Record<string, number | null> = {};
    for (let i = 1; i <= 90; i++) {
      const answer = rawAnswers.find(a => a.questionId === i);
      rawAnswersObject[`q${i}`] = answer ? answer.value : null;
    }
    
    // Convert Answer[] to number[] for database compatibility
    const answersArray = rawAnswers.map(answer => answer.value);
    
    const surveyResponse = {
      // Basic info
      user_name: results.userInfo.name,
      user_email: results.userInfo.email,
      organization: results.userInfo.organization || null,
      department: results.userInfo.department || null,
      position: results.userInfo.position || null,
      group_number: results.group_number || null,
      
      // Scores - mapping dimension_s to strategy for database compatibility
      slq_score: results.slq,
      strategy: results.dimensions.S.score,
      dimension_l: results.dimensions.L.score,
      dimension_i: results.dimensions.I.score,
      dimension_m: results.dimensions.M.score,
      dimension_a: results.dimensions.A.score,
      dimension_a2: results.dimensions.A2.score,
      dimension_s: results.dimensions.S.score,
      
      // Consent and anonymity
      consent_for_research: consentForResearch,
      is_anonymous: isAnonymous,
      survey_type: 'manager',
      
      // Raw answers as individual columns and array
      ...rawAnswersObject,
      answers: answersArray
    };

    const { data, error } = await supabase
      .from('survey_responses')
      .insert(surveyResponse)
      .select('id')
      .single();

    if (error) {
      console.error('שגיאה בשמירת תוצאות השאלון:', error);
      throw error;
    }

    console.log('תוצאות השאלון נשמרו בהצלחה עם ID:', data.id);
    return data;
  } catch (error) {
    console.error('שגיאה בשמירת נתוני השאלון:', error);
    throw error;
  }
};

export const saveColleagueSurveyToDatabase = async (
  submission: ColleagueSubmissionResult,
  rawAnswers: Answer[],
  consentForResearch: boolean = false,
  isAnonymous: boolean = true
) => {
  try {
    console.log('שמירת הערכת עמית במסד הנתונים:', submission);
    
    // Prepare raw answers as individual columns (only questions 1-90 for core survey)
    const rawAnswersObject: Record<string, number | null> = {};
    for (let i = 1; i <= 90; i++) {
      const answer = rawAnswers.find(a => a.questionId === i);
      rawAnswersObject[`q${i}`] = answer ? answer.value : null;
    }

    // Convert Answer[] to number[] for database compatibility
    const answersArray = rawAnswers.map(answer => answer.value);

    const colleagueResponse = {
      // Manager info
      manager_name: submission.evaluatorInfo.managerName,
      manager_position: submission.evaluatorInfo.managerPosition || null,
      manager_department: submission.evaluatorInfo.managerDepartment || null,
      
      // Evaluator info
      evaluator_name: submission.evaluatorInfo.evaluatorName || null,
      evaluator_email: submission.evaluatorInfo.evaluatorEmail || null,
      evaluator_position: submission.evaluatorInfo.evaluatorPosition || null,
      evaluator_department: submission.evaluatorInfo.evaluatorDepartment || null,
      organization: submission.evaluatorInfo.organization || null,
      
      // Group ID - convert string to integer
      group_id: submission.evaluatorInfo.groupId ? parseInt(submission.evaluatorInfo.groupId) : null,
      
      // Scores
      slq_score: submission.slq,
      dimension_s: submission.dimensions.S,
      dimension_l: submission.dimensions.L,
      dimension_i: submission.dimensions.I,
      dimension_m: submission.dimensions.M,
      dimension_a: submission.dimensions.A,
      dimension_a2: submission.dimensions.A2,
      
      // Consent and anonymity
      consent_for_research: consentForResearch,
      is_anonymous: isAnonymous,
      
      // Raw answers as individual columns and array
      ...rawAnswersObject,
      answers: answersArray
    };

    const { data, error } = await supabase
      .from('colleague_survey_responses')
      .insert(colleagueResponse)
      .select('id')
      .single();

    if (error) {
      console.error('שגיאה בשמירת הערכת עמית:', error);
      throw error;
    }

    console.log('הערכת עמית נשמרה בהצלחה עם ID:', data.id);
    return data;
  } catch (error) {
    console.error('שגיאה בשמירת הערכת עמית:', error);
    throw error;
  }
};

// Function to get survey results with insights from database
export const getSurveyWithInsights = async (surveyId: string) => {
  try {
    const { data, error } = await supabase
      .from('survey_responses')
      .select('*')
      .eq('id', surveyId)
      .single();

    if (error) {
      console.error('Error fetching survey insights:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error getting survey with insights:', error);
    throw error;
  }
};

export const getSurveyStatistics = async () => {
  try {
    const { data, error } = await supabase
      .from('survey_responses')
      .select('id, slq_score, dimension_s, dimension_l, dimension_i, dimension_m, dimension_a, dimension_a2, created_at, consent_for_research, is_anonymous, user_email, user_name, organization, department, position, strategy, survey_type')
      .eq('consent_for_research', true);

    if (error) {
      console.error('שגיאה בטעינת סטטיסטיקות:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('שגיאה בטעינת סטטיסטיקות:', error);
    throw error;
  }
};

export const getManagerComparisonData = async (managerName: string, managerEmail?: string) => {
  try {
    // Get manager's self-assessments
    let managerQuery = supabase
      .from('survey_responses')
      .select('slq_score, dimension_s, dimension_l, dimension_i, dimension_m, dimension_a, dimension_a2, user_name, created_at')
      .eq('user_name', managerName);

    if (managerEmail) {
      managerQuery = managerQuery.eq('user_email', managerEmail);
    }

    const { data: managerData, error: managerError } = await managerQuery;

    if (managerError) {
      console.error('שגיאה בטעינת נתוני מנהל:', managerError);
      throw managerError;
    }

    // Get colleague assessments
    let colleagueQuery = supabase
      .from('colleague_survey_responses')
      .select('slq_score, dimension_s, dimension_l, dimension_i, dimension_m, dimension_a, dimension_a2, manager_name, evaluator_name, created_at')
      .eq('manager_name', managerName);

    const { data: colleagueData, error: colleagueError } = await colleagueQuery;

    if (colleagueError) {
      console.error('שגיאה בטעינת נתוני עמיתים:', colleagueError);
      throw colleagueError;
    }

    return {
      managerData: managerData || [],
      colleagueData: colleagueData || []
    };
  } catch (error) {
    console.error('שגיאה בטעינת נתוני השוואה:', error);
    throw error;
  }
};
