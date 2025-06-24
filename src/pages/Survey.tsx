
import { useSearchParams } from "react-router-dom";
import { SurveyType } from "@/lib/types";
import UserInfoForm from "@/components/UserInfoForm";
import ColleagueInfoForm from "@/components/ColleagueInfoForm";
import ResearchConsentForm from "@/components/ResearchConsentForm";
import SurveyHeader from "@/components/SurveyHeader";
import SurveyCard from "@/components/SurveyCard";
import { useSurveyLogic } from "@/hooks/useSurveyLogic";

const Survey = () => {
  const [searchParams] = useSearchParams();
  const surveyType: SurveyType = (searchParams.get('type') as SurveyType) || 'manager';
  
  const {
    consentGiven,
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
    handleConsentResponse,
    handleUserInfoSubmit,
    handleColleagueInfoSubmit
  } = useSurveyLogic(surveyType);
  
  // אם לא ניתנה הסכמה למחקר
  if (!consentGiven) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1">
          <ResearchConsentForm onConsent={handleConsentResponse} />
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
  );
};

export default Survey;
