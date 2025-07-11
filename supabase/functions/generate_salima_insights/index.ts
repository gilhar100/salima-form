import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SurveyRecord {
  id: string;
  dimension_s?: number;
  dimension_a?: number;
  dimension_l?: number;
  dimension_i?: number;
  dimension_m?: number;
  dimension_a2?: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { record }: { record: SurveyRecord } = await req.json();
    console.log('Processing SALIMA insights for record:', record.id);

    // Determine dominant archetype based on highest scoring dimension
    const dimensionScores = {
      S: record.dimension_s || 0,
      A: record.dimension_a || 0,
      L: record.dimension_l || 0,
      I: record.dimension_i || 0,
      M: record.dimension_m || 0,
      A2: record.dimension_a2 || 0
    };

    // Find the dimension with the highest score
    const highestDimension = Object.entries(dimensionScores).reduce((max, [key, score]) => 
      score > max.score ? { dimension: key, score } : max,
      { dimension: 'S', score: 0 }
    );

    // Map dimensions to archetype names
    const archetypeMap: Record<string, string> = {
      'S': 'מנהל ההזדמנות',
      'A': 'מנהל ההזדמנות', 
      'L': 'המנהל הסקרן',
      'I': 'המנהל הסקרן',
      'M': 'המנהל המעצים',
      'A2': 'המנהל המעצים'
    };

    const dominantArchetype = archetypeMap[highestDimension.dimension] || 'מנהל ההזדמנות';
    console.log(`Determined dominant archetype: ${dominantArchetype} based on highest dimension: ${highestDimension.dimension} (score: ${highestDimension.score})`);

    // Update the record with dominant archetype only
    const { error: updateError } = await supabase
      .from('survey_responses')
      .update({
        dominant_archetype: dominantArchetype
      })
      .eq('id', record.id);

    if (updateError) {
      console.error('Failed to update survey record:', updateError);
      throw new Error(`Failed to update record: ${updateError.message}`);
    }

    console.log('Successfully updated survey record with dominant archetype');

    return new Response(
      JSON.stringify({
        success: true,
        dominant_archetype: dominantArchetype,
        record_id: record.id
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error generating SALIMA insights:', error);
    return new Response(
      JSON.stringify({
        error: error.message,
        success: false
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});