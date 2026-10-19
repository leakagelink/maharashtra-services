import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { areas, type Business } from "@/lib/data";

const schema = z.object({
  name: z.string().trim().min(1, "Enter your name").max(100),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  area: z.string().max(60),
  message: z.string().trim().max(1000),
  kind: z.enum(["enquiry", "quote", "booking"]),
});

export function EnquiryForm({ b }: { b: Business }) {
  const [form, setForm] = useState({ name: "", phone: "", area: b.area, message: "", kind: "enquiry" as const as "enquiry" | "quote" | "booking" });
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [err, setErr] = useState("");
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const p = schema.safeParse(form);
    if (!p.success) return setErr(p.error.issues[0]?.message ?? "Check the form");
    setErr(""); setStatus("sending");
    const { error } = await supabase.from("enquiries").insert({
      business_slug: b.slug, business_name: b.name, kind: p.data.kind, name: p.data.name,
      phone: p.data.phone, area: p.data.area || null, message: p.data.message || null,
    });
    if (error) { setStatus("idle"); return setErr("Could not send. Please try again."); }
    setStatus("done");
  };
  if (status === "done") return (
    <div className="rounded-2xl border bg-secondary p-6 text-center">
      <p className="text-lg font-bold text-primary">Request sent to {b.name}</p>
      <p className="mt-1 text-sm text-muted-foreground">You can also call them directly for a faster response.</p>
    </div>
  );
  const input = "h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none focus:border-primary";
  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {(["enquiry", "quote", "booking"] as const).map((k) => (
          <button type="button" key={k} onClick={() => setForm({ ...form, kind: k })}
            className={`rounded-xl border py-2 text-sm font-bold capitalize ${form.kind === k ? "border-primary bg-secondary text-primary" : "text-muted-foreground"}`}>
            {k === "quote" ? "Get quote" : k === "booking" ? "Book" : "Enquire"}
          </button>
        ))}
      </div>
      <input className={input} placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input className={input} placeholder="Mobile number" inputMode="numeric" maxLength={10} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })} />
      <select className={input} value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })}>
        {areas.map((a) => <option key={a}>{a}</option>)}
      </select>
      <textarea className="min-h-24 w-full rounded-xl border bg-background p-3 text-sm outline-none focus:border-primary" placeholder="Describe what you need (optional)"
        maxLength={1000} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
      {err && <p className="text-sm font-semibold text-destructive">{err}</p>}
      <p className="text-xs text-muted-foreground">Your details go to this business and QuickDial. See our <a href="/privacy-policy" className="font-semibold text-primary">Privacy Policy</a>.</p>
      <button disabled={status === "sending"} className="h-12 w-full rounded-xl bg-primary font-bold text-primary-foreground disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Send request"}
      </button>
    </form>
  );
}
