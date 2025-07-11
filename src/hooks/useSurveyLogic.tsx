
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Answer, UserInfo, ColleagueEvaluatorInfo, SurveyType } from "@/lib/types";
import { questions } from "@/data/questions";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSurveySubmission } from "./useSurveySubmission";

export const useSurveyLogic = (surveyType: SurveyType) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { isSubmitting, submitManagerSurvey, submitColleagueSurvey } = useSurveySubmission();
  
  const [aboutViewed, setAboutViewed] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [colleagueInfo, setColleagueInfo] = useState<ColleagueEvaluatorInfo | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [questionsPerPage] = useState(isMobile ? 3 : 5);
  
  // Check if survey type is valid
  useEffect(() => {
    if (!['manager', 'colleague'].includes(surveyType)) {
      navigate('/');
    }
  }, [surveyType, navigate]);
  
  // Calculate progress and current questions
  const totalSteps = Math.ceil(questions.length / questionsPerPage);
  const hasInfo = surveyType === 'manager' ? userInfo : colleagueInfo;
  const progress = (hasInfo && aboutViewed) ? ((currentStep) / totalSteps) * 100 : 0;
  const currentQuestions = (hasInfo && aboutViewed) 
    ? questions.slice(currentStep * questionsPerPage, (currentStep + 1) * questionsPerPage)
    : [];
  
  const getAnswerValue = (questionId: number): number | null => {
    const answer = answers.find(a => a.questionId === questionId);
    return answer ? answer.value : null;
  };
  
  const handleAnswerChange = (questionId: number, value: number) => {
    setAnswers(prev => {
      const existingIndex = prev.findIndex(a => a.questionId === questionId);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = { questionId, value };
        return updated;
      }
      return [...prev, { questionId, value }];
    });
  };
  
  const handleNext = async () => {
    const nextStep = currentStep + 1;
    
    if (nextStep < totalSteps) {
      setCurrentStep(nextStep);
      window.scrollTo(0, 0);
    } else {
      // Submit survey
      if (surveyType === 'manager' && userInfo) {
        await submitManagerSurvey(answers, userInfo);
      } else if (surveyType === 'colleague' && colleagueInfo) {
        await submitColleagueSurvey(answers, colleagueInfo);
      }
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const canProceed = () => {
    if (!hasInfo || !aboutViewed) return false;
    return currentQuestions.every(q => getAnswerValue(q.id) !== null);
  };
  
  const handleAboutViewed = () => {
    setAboutViewed(true);
    toast({
      title: "תודה על הקריאה",
      description: "כעת תוכל להמשיך למילוי השאלון",
    });
  };
  
  const handleUserInfoSubmit = (info: UserInfo) => {
    setUserInfo(info);
    toast({
      title: "פרטים נרשמו בהצלחה",
      description: "כעת תוכל להתחיל במילוי השאלון",
    });
  };

  const handleColleagueInfoSubmit = (info: ColleagueEvaluatorInfo) => {
    setColleagueInfo(info);
    toast({
      title: "פרטים נרשמו בהצלחה",
      description: "כעת תוכל להתחיל בהערכת המנהל",
    });
  };

  return {
    aboutViewed,
    userInfo,
    colleagueInfo,
    currentStep,
    answers,
    isSubmitting,
    totalSteps,
    hasInfo,
    progress,
    currentQuestions,
    getAnswerValue,
    handleAnswerChange,
    handleNext,
    handlePrevious,
    canProceed,
    handleAboutViewed,
    handleUserInfoSubmit,
    handleColleagueInfoSubmit
  };
};
