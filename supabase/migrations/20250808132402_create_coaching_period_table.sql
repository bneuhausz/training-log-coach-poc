create table coaching_period (
  id bigint primary key generated always as identity,
  coach_id uuid references profile(id),
  athlete_id uuid references profile(id),
  start_date date not null,
  end_date date not null
);