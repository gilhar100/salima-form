import { supabase } from "@/integrations/supabase/client";
import { SurveyResult, ColleagueSubmissionResult, Answer } from "./types";

// Helper function to convert raw answers array to object
const convertRawAnswersToObject = (rawAnswers: Answer[]): Record<string, number | null> => {
  const rawAnswersObject: Record<string, number | null> = {};
  for (let i = 1; i <= 90; i++) {
    const answer = rawAnswers.find(a => a.questionId === i);
    rawAnswersObject[`q${i}`] = answer ? answer.value : null;
  }
  return rawAnswersObject;
};

export const saveSurveyToDatabase = async (
  results: SurveyResult,
  rawAnswers: Answer[],
  consentForResearch: boolean = false,
  isAnonymous: boolean = true
) => {
  try {
    console.log('שמירת תוצאות שאלון במסד הנתונים:', results);
    
    // Prepare raw answers as individual columns
    const rawAnswersObject = convertRawAnswersToObject(rawAnswers);
    
    const surveyResponse = {
      // Basic info
      user_name: results.userInfo.name,
      user_email: results.userInfo.email,
      organization: results.userInfo.organization || null,
      department: results.userInfo.department || null,
      position: results.userInfo.position || null,
      group_number: results.group_number || null,
      
      // Scores
      slq_score: results.slq,
      dimension_s: results.dimensions.S.score,
      dimension_l: results.dimensions.L.score,
      dimension_i: results.dimensions.I.score,
      dimension_m: results.dimensions.M.score,
      dimension_a: results.dimensions.A.score,
      dimension_a2: results.dimensions.A2.score,
      
      // Consent and anonymity
      consent_for_research: consentForResearch,
      is_anonymous: isAnonymous,
      survey_type: 'manager',
      
      // Raw answers as individual columns and array
      ...rawAnswersObject,
      answers: rawAnswers
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
    return data; // Return the saved record with ID
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
    
    // Prepare raw answers as individual columns
    const rawAnswersObject: Record<string, number | null> = {};
    for (let i = 1; i <= 90; i++) {
      const answer = rawAnswers.find(a => a.questionId === i);
      rawAnswersObject[`q${i}`] = answer ? answer.value : null;
    }

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
      answers: rawAnswers
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
