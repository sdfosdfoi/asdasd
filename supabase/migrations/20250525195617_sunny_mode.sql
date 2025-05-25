/*
  # Core functionality database schema
  
  1. New Tables
    - users (расширение встроенной таблицы auth.users)
    - listings (объявления)
    - messages (сообщения)
    - conversations (диалоги)
    - reviews (отзывы)
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Расширение таблицы пользователей
CREATE TABLE public.user_profiles (
  id uuid REFERENCES auth.users(id) PRIMARY KEY,
  name text NOT NULL,
  avatar_url text,
  company_name text,
  tax_id text,
  phone text,
  type text NOT NULL CHECK (type IN ('individual', 'entityBY', 'entityRF')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Объявления
CREATE TABLE public.listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  type text NOT NULL CHECK (type IN ('buy', 'sell')),
  category text NOT NULL CHECK (category IN ('equipment', 'parts')),
  title text NOT NULL,
  description text,
  equipment_type text,
  brand text,
  model text,
  year int,
  condition text,
  payment_terms text,
  location jsonb NOT NULL,
  delivery boolean DEFAULT false,
  inspection boolean DEFAULT false,
  price jsonb NOT NULL,
  media jsonb NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'sold', 'archived')),
  views int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

-- Диалоги
CREATE TABLE public.conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid REFERENCES public.listings(id) NOT NULL,
  buyer_id uuid REFERENCES auth.users(id) NOT NULL,
  seller_id uuid REFERENCES auth.users(id) NOT NULL,
  status text DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  deal_confirmed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

-- Сообщения
CREATE TABLE public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES public.conversations(id) NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  content text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Отзывы
CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES public.conversations(id) NOT NULL,
  reviewer_id uuid REFERENCES auth.users(id) NOT NULL,
  seller_id uuid REFERENCES auth.users(id) NOT NULL,
  rating int NOT NULL CHECK (rating BETWEEN 1 AND 5),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Политики безопасности

-- User Profiles
CREATE POLICY "Users can read all profiles"
  ON public.user_profiles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Listings
CREATE POLICY "Anyone can read active listings"
  ON public.listings
  FOR SELECT
  TO authenticated
  USING (status = 'active');

CREATE POLICY "Users can create listings"
  ON public.listings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own listings"
  ON public.listings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Conversations
CREATE POLICY "Users can read own conversations"
  ON public.conversations
  FOR SELECT
  TO authenticated
  USING (auth.uid() IN (buyer_id, seller_id));

CREATE POLICY "Users can create conversations"
  ON public.conversations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = buyer_id);

-- Messages
CREATE POLICY "Users can read messages in their conversations"
  ON public.messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.conversations c
      WHERE c.id = conversation_id
      AND auth.uid() IN (c.buyer_id, c.seller_id)
    )
  );

CREATE POLICY "Users can send messages in their conversations"
  ON public.messages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.conversations c
      WHERE c.id = conversation_id
      AND auth.uid() IN (c.buyer_id, c.seller_id)
    )
  );

-- Reviews
CREATE POLICY "Anyone can read reviews"
  ON public.reviews
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create reviews for completed deals"
  ON public.reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.conversations c
      WHERE c.id = conversation_id
      AND c.deal_confirmed = true
      AND auth.uid() = c.buyer_id
      AND NOT EXISTS (
        SELECT 1 FROM public.reviews r
        WHERE r.conversation_id = conversation_id
      )
    )
  );