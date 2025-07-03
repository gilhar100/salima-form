
-- Add group_id column to colleague_survey_responses table
ALTER TABLE public.colleague_survey_responses 
ADD COLUMN group_id integer;
