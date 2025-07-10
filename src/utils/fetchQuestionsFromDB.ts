
import { supabase } from "@/integrations/supabase/client";

export const fetchQuestionsFromSalimaLogic = async () => {
  try {
    const { data, error } = await supabase
      .from('salima_q_logic')
      .select('*')
      .order('order', { ascending: true });
    
    if (error) {
      console.error('Error fetching questions:', error);
      return [];
    }
    
    console.log('Questions from salima_q_logic:');
    data?.forEach(q => {
      console.log(`ID: ${q.id}, Order: ${q.order}, Text: ${q.text}`);
    });
    
    return data || [];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

export const fetchArchetypeQuestions = async () => {
  try {
    const { data, error } = await supabase
      .from('archetype_logic')
      .select('*')
      .order('question_number', { ascending: true });
    
    if (error) {
      console.error('Error fetching archetype questions:', error);
      return [];
    }
    
    console.log('Questions from archetype_logic:');
    data?.forEach(q => {
      console.log(`Question Number: ${q.question_number}, Text: ${q.question_text}`);
    });
    
    return data || [];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};
