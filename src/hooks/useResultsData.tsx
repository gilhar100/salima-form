const calculateArchetypeIfNeeded = async (surveyId: string) => {
  try {
    console.log('🔍 ARCHETYPE: Checking if archetype calculation is needed for survey:', surveyId);
    
    const { data: surveyData, error: fetchError } = await supabase
      .from('survey_responses')
      .select('*')
      .eq('id', surveyId)
      .single();

    if (fetchError) {
      console.error('❌ ARCHETYPE: Error fetching survey data:', fetchError);
      return;
    }

    console.log('📊 ARCHETYPE: Survey data retrieved, dominant_archetype =', surveyData.dominant_archetype);

    if (!surveyData.dominant_archetype) {
      console.log('🚀 ARCHETYPE: Dominant archetype is empty, starting calculation...');
      
      const getQuestionValue = (questionKey: string) => {
        return surveyData[questionKey] || null;
      };

      const payload = {
        strategy: surveyData.strategy,
        adaptive: surveyData.dimension_adaptive,           // ✅ FIXED
        authenticity: surveyData.dimension_authentic,      // ✅ FIXED
        meaning: surveyData.dimension_m,
        learning: surveyData.dimension_l,
        inspiration: surveyData.dimension_i,
        q_91: getQuestionValue('q91'),
        q_92: getQuestionValue('q92'),
        q_93: getQuestionValue('q93'),
        q_94: getQuestionValue('q94'),
        q_95: getQuestionValue('q95'),
        q_96: getQuestionValue('q96'),
        q_97: getQuestionValue('q97'),
        q_98: getQuestionValue('q98'),
        q_99: getQuestionValue('q99'),
        q_100: getQuestionValue('q100'),
        q_101: getQuestionValue('q101'),
        q_102: getQuestionValue('q102'),
        q_103: getQuestionValue('q103'),
        q_104: getQuestionValue('q104'),
        q_105: getQuestionValue('q105')
      };

      console.log('📤 ARCHETYPE: About to call edge function with payload:', payload);

      const response = await fetch('https://lhmrghebdtcbhmgtbqfe.functions.supabase.co/calculate-archetype', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      console.log('📥 ARCHETYPE: Edge function response status:', response.status);
      console.log('📥 ARCHETYPE: Edge function response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ ARCHETYPE: Edge function error response:', errorText);
        throw new Error(`Edge function call failed: ${response.status} - ${errorText}`);
      }

      const archetypeData: ArchetypeCalculationResponse = await response.json();
      console.log('✅ ARCHETYPE: Edge function response data:', archetypeData);

      const { error: updateError } = await supabase
        .from('survey_responses')
        .update({
          dominant_archetype: archetypeData.dominant_archetype,
          archetype_1_score: archetypeData.archetype_1,
          archetype_2_score: archetypeData.archetype_2,
          archetype_3_score: archetypeData.archetype_3
        })
        .eq('id', surveyId);

      if (updateError) {
        console.error('Error updating survey with archetype data:', updateError);
        throw updateError;
      }

      console.log('✅ ARCHETYPE: Successfully updated survey with archetype data');

      setInsights(prev => ({
        ...prev,
        dominant_archetype: archetypeData.dominant_archetype
      }));

      toast({
        title: "חישוב ארכיטיפ הושלם",
        description: "הסגנון הניהולי הדומיננטי חושב בהצלחה"
      });
    } else {
      console.log('🟢 ARCHETYPE: Dominant archetype already exists:', surveyData.dominant_archetype);
    }
  } catch (error) {
    console.error('Error calculating archetype:', error);
    toast({
      title: "שגיאה בחישוב הארכיטיפ",
      description: "אירעה שגיאה בחישוב הסגנון הניהולי הדומיננטי",
      variant: "destructive"
    });
  }
};