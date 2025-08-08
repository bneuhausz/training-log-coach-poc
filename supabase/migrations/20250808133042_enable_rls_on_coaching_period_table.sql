ALTER TABLE public.coaching_period ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own coaching periods"
ON public.coaching_period
FOR SELECT
USING (
  (select auth.uid()) in (coach_id, athlete_id)
);