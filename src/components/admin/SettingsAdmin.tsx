import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Field, btnPrimary, inputCls } from "./ui";

const fields: { key: string; label: string; long?: boolean }[] = [
  { key: "care_phone", label: "Customer care number" },
  { key: "whatsapp_phone", label: "WhatsApp number" },
  { key: "hero_title", label: "Home page heading" },
  { key: "hero_subtitle", label: "Home page sub-heading", long: true },
  { key: "popular_searches", label: "Popular searches (comma se alag)", long: true },
  { key: "announcement", label: "Notice bar (khaali chhodo to nahi dikhega)", long: true },
];

export function SettingsAdmin({ onChanged }: { onChanged: () => void }) {
  const q = useQuery({
    queryKey: ["admin-settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("key,value");
      if (error) throw error;
      return Object.fromEntries((data ?? []).map((r) => [r.key, r.value])) as Record<string, string>;
    },
  });
  const [v, setV] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  useEffect(() => { if (q.data) setV(q.data); }, [q.data]);

  const save = async () => {
    for (const k of ["care_phone", "whatsapp_phone"]) {
      if (v[k] && v[k].replace(/\D/g, "").length < 10) { toast.error("Phone number 10 digit ka hona chahiye"); return; }
    }
    setBusy(true);
    const rows = fields.map((f) => ({ key: f.key, value: (v[f.key] ?? "").trim().slice(0, 500), updated_at: new Date().toISOString() }));
    const { error } = await supabase.from("site_settings").upsert(rows);
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Settings save ho gayi"); onChanged(); q.refetch();
  };

  return (
    <div className="grid gap-4 rounded-2xl border bg-card p-4 md:grid-cols-2">
      {fields.map((f) => (
        <Field key={f.key} label={f.label} wide={f.long}>
          {f.long
            ? <textarea className="mt-1 w-full rounded-lg border bg-background p-3 font-normal" rows={2} value={v[f.key] ?? ""} onChange={(e) => setV({ ...v, [f.key]: e.target.value })} />
            : <input className={inputCls} value={v[f.key] ?? ""} onChange={(e) => setV({ ...v, [f.key]: e.target.value })} />}
        </Field>
      ))}
      <div className="md:col-span-2"><button disabled={busy} onClick={save} className={btnPrimary}>{busy ? "Saving…" : "Save settings"}</button></div>
    </div>
  );
}
