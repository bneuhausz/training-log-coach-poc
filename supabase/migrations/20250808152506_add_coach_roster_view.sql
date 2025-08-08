CREATE OR REPLACE VIEW public.coach_roster AS
SELECT
  p.id,
  p.display_name,
  ca.coach_id
FROM
  public.coach_athlete AS ca
JOIN
  public.profile AS p ON ca.athlete_id = p.id;
