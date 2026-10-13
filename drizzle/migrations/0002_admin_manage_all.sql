CREATE TABLE public.areas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  sort_order integer NOT NULL DEFAULT 100,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.areas TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.areas TO authenticated;
GRANT ALL ON public.areas TO service_role;
ALTER TABLE public.areas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads areas" ON public.areas FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins insert areas" ON public.areas FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins update areas" ON public.areas FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins delete areas" ON public.areas FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.businesses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  category text NOT NULL,
  area text NOT NULL,
  phone text NOT NULL DEFAULT '',
  rating numeric NOT NULL DEFAULT 4.5,
  reviews integer NOT NULL DEFAULT 0,
  years integer NOT NULL DEFAULT 1,
  verified boolean NOT NULL DEFAULT false,
  featured boolean NOT NULL DEFAULT false,
  open_now boolean NOT NULL DEFAULT true,
  home_visit boolean NOT NULL DEFAULT false,
  whatsapp boolean NOT NULL DEFAULT true,
  distance_km numeric NOT NULL DEFAULT 1,
  price_from integer NOT NULL DEFAULT 0,
  services text[] NOT NULL DEFAULT '{}',
  hours text NOT NULL DEFAULT '9:00 AM – 8:00 PM',
  about text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.businesses TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.businesses TO authenticated;
GRANT ALL ON public.businesses TO service_role;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads businesses" ON public.businesses FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins insert businesses" ON public.businesses FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins update businesses" ON public.businesses FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins delete businesses" ON public.businesses FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

GRANT SELECT, UPDATE, DELETE ON public.enquiries TO authenticated;
CREATE POLICY "Admins read enquiries" ON public.enquiries FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins update enquiries" ON public.enquiries FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins delete enquiries" ON public.enquiries FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));