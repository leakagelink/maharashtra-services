CREATE TABLE public.site_settings (
  key text PRIMARY KEY,
  value text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads settings" ON public.site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins insert settings" ON public.site_settings FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins update settings" ON public.site_settings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins delete settings" ON public.site_settings FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.business_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name text NOT NULL CHECK (char_length(business_name) BETWEEN 2 AND 120),
  owner_name text NOT NULL CHECK (char_length(owner_name) BETWEEN 2 AND 80),
  phone text NOT NULL CHECK (phone ~ '^[0-9+ ]{10,15}$'),
  category text NOT NULL DEFAULT '' CHECK (char_length(category) <= 80),
  area text NOT NULL DEFAULT '' CHECK (char_length(area) <= 80),
  message text NOT NULL DEFAULT '' CHECK (char_length(message) <= 1000),
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','approved','rejected')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.business_requests TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.business_requests TO authenticated;
GRANT ALL ON public.business_requests TO service_role;
ALTER TABLE public.business_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone submits request" ON public.business_requests FOR INSERT TO anon, authenticated WITH CHECK (status = 'new');
CREATE POLICY "Admins read requests" ON public.business_requests FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins update requests" ON public.business_requests FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins delete requests" ON public.business_requests FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

ALTER TABLE public.enquiries ADD COLUMN status text NOT NULL DEFAULT 'new';
ALTER TABLE public.enquiries ADD COLUMN admin_note text NOT NULL DEFAULT '';

CREATE TABLE public.activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  user_email text,
  action text NOT NULL,
  entity text NOT NULL,
  label text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, DELETE ON public.activity_log TO authenticated;
GRANT ALL ON public.activity_log TO service_role;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read log" ON public.activity_log FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins clear log" ON public.activity_log FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE OR REPLACE FUNCTION public.log_admin_change()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE r jsonb; lbl text;
BEGIN
  IF auth.uid() IS NULL OR NOT public.has_role(auth.uid(),'admin') THEN
    RETURN COALESCE(NEW, OLD);
  END IF;
  r := to_jsonb(COALESCE(NEW, OLD));
  lbl := COALESCE(r->>'name', r->>'business_name', r->>'key', r->>'id', '');
  INSERT INTO public.activity_log (user_id, user_email, action, entity, label)
  VALUES (auth.uid(), auth.jwt()->>'email', lower(TG_OP), TG_TABLE_NAME, lbl);
  RETURN COALESCE(NEW, OLD);
END $$;

CREATE TRIGGER log_businesses AFTER INSERT OR UPDATE OR DELETE ON public.businesses FOR EACH ROW EXECUTE FUNCTION public.log_admin_change();
CREATE TRIGGER log_categories AFTER INSERT OR UPDATE OR DELETE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.log_admin_change();
CREATE TRIGGER log_areas AFTER INSERT OR UPDATE OR DELETE ON public.areas FOR EACH ROW EXECUTE FUNCTION public.log_admin_change();
CREATE TRIGGER log_enquiries AFTER UPDATE OR DELETE ON public.enquiries FOR EACH ROW EXECUTE FUNCTION public.log_admin_change();
CREATE TRIGGER log_settings AFTER INSERT OR UPDATE OR DELETE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.log_admin_change();
CREATE TRIGGER log_requests AFTER UPDATE OR DELETE ON public.business_requests FOR EACH ROW EXECUTE FUNCTION public.log_admin_change();