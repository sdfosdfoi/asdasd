/*
  # Create initial admin user
  
  1. New Data
    - Creates admin user with specified credentials
    - Sets up admin role and permissions
*/

-- Create admin user
INSERT INTO auth.users (
  email,
  encrypted_password,
  email_confirmed_at,
  role
) VALUES (
  'jojez10c@gmail.com',
  crypt('Postal123654', gen_salt('bf')),
  now(),
  'admin'
) ON CONFLICT (email) DO NOTHING;

-- Set RLS policy for admin access
CREATE POLICY "Admin users have full access"
  ON public.users
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');