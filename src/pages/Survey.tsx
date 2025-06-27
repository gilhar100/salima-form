
import { useSearchParams } from "react-router-dom";
import { SurveyType } from "@/lib/types";
import UserInfoForm from "@/components/UserInfoForm";
import ColleagueInfoForm from "@/components/ColleagueInfoForm";
import AboutPage from "@/components/AboutPage";
import SurveyHeader from "@/components/SurveyHeader";
import SurveyCard from "@/components/SurveyCard";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useSurveyLogic } from "@/hooks/useSurveyLogic";

const Survey = () => {
  const [searchParams] = useSearchParams();
  const surveyType: SurveyType = (searchParams.get('type') as SurveyType) || 'manager';
  
  const {
    aboutViewed,
    userInfo,
    colleagueInfo,
    currentStep,
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
  } = useSurveyLogic(surveyType);
  
  // אם לא נצפה עמוד האודות
  if (!aboutViewed) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1">
          <AboutPage onContinue={handleAboutViewed} />
        </div>
        <div className="text-center p-4 text-black" style={{ fontSize: '16px' }}>
          ™ כל הזכויות שמורות לד״ר יוסי שרעבי
        </div>
      </div>
    );
  }

  // אם לא הוזנו פרטי המשתמש/עמית
  if (!hasInfo) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1">
          {surveyType === 'manager' ? (
            <UserInfoForm onSubmit={handleUserInfoSubmit} />
          ) : (
            <ColleagueInfoForm onSubmit={handleColleagueInfoSubmit} />
          )}
        </div>
        <div className="text-center p-4 text-black" style={{ fontSize: '16px' }}>
          ™ כל הזכויות שמורות לד״ר יוסי שרעבי
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="flex-1">
          <div className="container py-4 max-w-3xl mx-auto px-4">
            <SurveyHeader
              surveyType={surveyType}
              colleagueInfo={colleagueInfo}
              progress={progress}
              currentStep={currentStep}
              totalSteps={totalSteps}
            />
            
            <SurveyCard
              currentQuestions={currentQuestions}
              currentStep={currentStep}
              totalSteps={totalSteps}
              surveyType={surveyType}
              getAnswerValue={getAnswerValue}
              handleAnswerChange={handleAnswerChange}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              canProceed={canProceed}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
        <div className="text-center p-4 text-black" style={{ fontSize: '16px' }}>
          ™ כל הזכויות שמורות לד״ר יוסי שרעבי
        </div>
      </div>
      
      <LoadingOverlay 
        isVisible={isSubmitting} 
        message="אנחנו מעבדים את הנתונים שלך… כמה רגעים וסיימנו!" 
      />
    </>
  );
};

export default Survey;
