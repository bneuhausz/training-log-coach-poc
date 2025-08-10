WITH newly_created_users AS (
  INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    confirmation_token, recovery_token, email_change, email_change_token_new,
    raw_app_meta_data, raw_user_meta_data, created_at, updated_at
  )
  VALUES
    (
      '00000000-0000-0000-0000-000000000000', uuid_generate_v4(), 'authenticated', 'authenticated',
      'coach@test.com', crypt('coach', gen_salt('bf')), NOW(),
      '', '', '', '', '{"provider":"email","providers":["email"]}',
      '{}', NOW(), NOW()
    ),
    (
      '00000000-0000-0000-0000-000000000000', uuid_generate_v4(), 'authenticated', 'authenticated',
      'athlete1@test.com', crypt('athlete1', gen_salt('bf')), NOW(),
      '', '', '', '', '{"provider":"email","providers":["email"]}',
      '{}', NOW(), NOW()
    ),
    (
      '00000000-0000-0000-0000-000000000000', uuid_generate_v4(), 'authenticated', 'authenticated',
      'athlete2@test.com', crypt('athlete2', gen_salt('bf')), NOW(),
      '', '', '', '', '{"provider":"email","providers":["email"]}',
      '{}', NOW(), NOW()
    )
  RETURNING id, email
),

identities AS (
  INSERT INTO auth.identities (user_id, provider_id, provider, identity_data, created_at, updated_at)
  SELECT
    id,
    email,
    'email',
    jsonb_build_object('sub', id, 'email', email),
    NOW(),
    NOW()
  FROM newly_created_users
)

INSERT INTO public.coach_athlete (coach_id, athlete_id)
SELECT
  (SELECT id FROM newly_created_users WHERE email = 'coach@test.com'),
  id
FROM
  newly_created_users;
