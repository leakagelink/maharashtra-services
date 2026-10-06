CREATE TABLE public.enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_slug text NOT NULL,
  business_name text NOT NULL,
  kind text NOT NULL DEFAULT 'enquiry',
  name text NOT NULL,
  phone text NOT NULL,
  area text,
  message text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT name_len CHECK (char_length(name) BETWEEN 1 AND 100),
  CONSTRAINT phone_len CHECK (char_length(phone) BETWEEN 8 AND 15),
  CONSTRAINT msg_len CHECK (message IS NULL OR char_length(message) <= 1000),
  CONSTRAINT kind_ok CHECK (kind IN ('enquiry','quote','booking'))
);
GRANT INSERT ON public.enquiries TO anon, authenticated;
GRANT ALL ON public.enquiries TO service_role;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit an enquiry" ON public.enquiries FOR INSERT TO anon, authenticated WITH CHECK (true);