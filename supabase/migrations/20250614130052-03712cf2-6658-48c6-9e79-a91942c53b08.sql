
-- 1. Add group_number to survey_responses table (integer, required)
ALTER TABLE public.survey_responses
ADD COLUMN IF NOT EXISTS group_number integer;

-- Optional: If you want to require group_number to be NOT NULL for new rows, uncomment:
-- ALTER TABLE public.survey_responses ALTER COLUMN group_number SET NOT NULL;
