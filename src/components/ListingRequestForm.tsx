import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { areas, categories } from "@/lib/data";

const schema = z.object({
  business_name: z.string().trim().min(2, "Business ka naam daalein").max(120),
  owner_name: z.string().trim().min(2, "Apna naam daalein").max(80),
  phone: z.string().trim().regex(/^[0-9+ ]{10,15}$/, "Sahi mobile number daalein"),
  category: z.string().max(80),
  area: z.string().max(80),
  message: z.string().trim().max(1000),
});

const cls = "mt-1 h-11 w-full rounded-lg border bg-background px-3 text-base";

export function ListingRequestForm() {
  const [f, setF] = useState({ business_name: "", owner_name: "", phone: "", category: "", area: "", message: "" });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(f);
    if (!r.success) { toast.error(r.error.issues[0]?.message ?? "Form check karein"); return; }
    setBusy(true);
    const { error } = await supabase.from("business_requests").insert(r.data);
    setBusy(false);
    if (error) { toast.error("Request nahi bhej paaye, dobara try karein"); return; }
    setDone(true);
  };

  if (done) return <p className="font-bold text-success">Request mil gayi! Hamari team jaldi aapse sampark karegi.</p>;

  return (
    <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
      <p className="font-bold sm:col-span-2">Apna business free mein list karwayein</p>
      <label className="text-sm font-semibold">Business name<input className={cls} value={f.business_name} onChange={set("business_name")} maxLength={120} /></label>
      <label className="text-sm font-semibold">Your name<input className={cls} value={f.owner_name} onChange={set("owner_name")} maxLength={80} /></label>
      <label className="text-sm font-semibold">Mobile number<input className={cls} inputMode="tel" value={f.phone} onChange={set("phone")} maxLength={15} /></label>
      <label className="text-sm font-semibold">Category
        <select className={cls} value={f.category} onChange={set("category")}><option value="">Select</option>{categories.map((c) => <option key={c.slug} value={c.name}>{c.name}</option>)}</select>
      </label>
      <label className="text-sm font-semibold">Area
        <select className={cls} value={f.area} onChange={set("area")}><option value="">Select</option>{areas.map((a) => <option key={a} value={a}>{a}</option>)}</select>
      </label>
      <label className="text-sm font-semibold sm:col-span-2">Message (optional)<textarea className="mt-1 w-full rounded-lg border bg-background p-3 text-base" rows={3} value={f.message} onChange={set("message")} maxLength={1000} /></label>
      <p className="text-xs text-muted-foreground sm:col-span-2">Submit karke aap hamari <a href="/privacy-policy" className="font-semibold text-primary">Privacy Policy</a> se sahmat hain.</p>
      <button disabled={busy} className="h-11 rounded-xl bg-primary px-5 font-bold text-primary-foreground disabled:opacity-60 sm:col-span-2">{busy ? "Bhej rahe hain…" : "Submit request"}</button>
    </form>
  );
}
