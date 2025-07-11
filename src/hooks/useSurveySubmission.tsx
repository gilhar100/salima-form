
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Answer, UserInfo, ColleagueEvaluatorInfo, SurveyResult } from "@/lib/types";
import { calculateSurveyResults } from "@/lib/calculations";
import { saveSurveyToDatabase, saveColleagueSurveyToDatabase, saveArchetypeAnswersToDatabase } from "@/lib/survey-service";
import { useToast } from "@/hooks/use-toast";

export const useSurveySubmission = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitManagerSurvey = async (
    answers: Answer[],
    userInfo: UserInfo
  ) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Split answers into core (1-90) and archetype (91-105) questions
      const coreAnswers = answers.filter(a => a.questionId <= 90);
      const archetypeAnswers = answers.filter(a => a.questionId >= 91 && a.questionId <= 105);
      
      // Calculate results only from core questions (1-90)
      const results = calculateSurveyResults(coreAnswers, userInfo);
      
      // Attach group_number as int if exists
      results.group_number = userInfo.groupNumber ? parseInt(userInfo.groupNumber) : undefined;
      
      // Save to localStorage first
      localStorage.setItem('salimaResults', JSON.stringify(results));
      localStorage.setItem('salimaAnswers', JSON.stringify(coreAnswers));
      localStorage.setItem('archetypeAnswers', JSON.stringify(archetypeAnswers));
      
      // Save core survey results to database
      const savedRecord = await saveSurveyToDatabase(results, coreAnswers, true, false);
      
      // Save archetype answers if any
      if (archetypeAnswers.length > 0) {
        await saveArchetypeAnswersToDatabase(archetypeAnswers, userInfo);
      }
      
      // Save survey ID for insights retrieval
      if (savedRecord && savedRecord.id) {
        localStorage.setItem('salimaSurveyId', savedRecord.id);
      }
      
      toast({
        title: "השאלון הושלם בהצלחה!",
        description: "הנתונים נשמרו במסד הנתונים. מעבר לדף התוצאות...",
      });
      
      setTimeout(() => {
        navigate('/results');
      }, 1000);
      
    } catch (error) {
      console.error('Error submitting manager survey:', error);
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה בשמירת הנתונים. אנא נסה שוב.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  const submitColleagueSurvey = async (
    answers: Answer[],
    colleagueInfo: ColleagueEvaluatorInfo
  ) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const coreAnswers = answers.filter(a => a.questionId <= 90);
      
      const fakeUserInfo: UserInfo = {
        name: colleagueInfo.evaluatorName,
        email: colleagueInfo.evaluatorEmail
      };
      
      const results = calculateSurveyResults(coreAnswers, fakeUserInfo);
      
      const colleagueSubmission = {
        slq: results.slq,
        dimensions: {
          S: results.dimensions.S.score,
          L: results.dimensions.L.score,
          I: results.dimensions.I.score,
          M: results.dimensions.M.score,
          A: results.dimensions.A.score,
          A2: results.dimensions.A2.score,
        },
        evaluatorInfo: colleagueInfo,
        date: new Date().toLocaleDateString('he-IL'),
      };
      
      localStorage.setItem('colleagueSubmission', JSON.stringify(colleagueSubmission));
      
      await saveColleagueSurveyToDatabase(colleagueSubmission, coreAnswers, true, false);
      
      toast({
        title: "השאלון הושלם בהצלחה!",
        description: "הנתונים נשמרו במסד הנתונים. תודה על ההערכה!",
      });
      
      navigate('/colleague-completion');
      
    } catch (error) {
      console.error('Error submitting colleague survey:', error);
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה בשמירת הנתונים. אנא נסה שוב.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    submitManagerSurvey,
    submitColleagueSurvey
  };
};
