import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { BusinessRow, CategoryRow } from "@/lib/data";

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["SUPABASE_ANON_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const fetchCategories = createServerFn({ method: "GET" }).handler(async (): Promise<CategoryRow[]> => {
  const { data, error } = await publicClient().from("categories").select("slug,name,icon,keywords").order("sort_order").order("name");
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const fetchSiteData = createServerFn({ method: "GET" }).handler(async () => {
  const sb = publicClient();
  const [c, b, a, s] = await Promise.all([
    sb.from("categories").select("slug,name,icon,keywords").order("sort_order").order("name"),
    sb.from("businesses").select("*").order("featured", { ascending: false }).order("name"),
    sb.from("areas").select("name").order("sort_order").order("name"),
    sb.from("site_settings").select("key,value"),
  ]);
  if (c.error || b.error || a.error) throw new Error((c.error ?? b.error ?? a.error)!.message);
  return {
    categories: (c.data ?? []) as CategoryRow[],
    businesses: (b.data ?? []) as unknown as BusinessRow[],
    areas: (a.data ?? []).map((r) => r.name),
    settings: s.error ? [] : (s.data ?? []),
  };
});
