import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { brandShareMeta } from "@/lib/brand";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      ...brandShareMeta,
      { title: "Admin Sign In — QuickDial" },
      { name: "description", content: "Sign in to manage QuickDial Ahilyanagar." },
      { property: "og:title", content: "Admin Sign In — QuickDial" },
      { property: "og:description", content: "Sign in to manage QuickDial Ahilyanagar." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const res = mode === "in"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth` } });
    setBusy(false);
    if (res.error) return toast.error(res.error.message);
    if (mode === "up" && !res.data.session) return toast.success("Account bana. Email check karke confirm karein, phir sign in karein.");
    navigate({ to: "/admin" });
  };

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="text-2xl font-extrabold">{mode === "in" ? "Admin sign in" : "Create admin account"}</h1>
      <form onSubmit={submit} className="mt-6 space-y-3">
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="h-11 w-full rounded-xl border bg-card px-3" />
        <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="h-11 w-full rounded-xl border bg-card px-3" />
        <button disabled={busy} className="h-11 w-full rounded-xl bg-primary font-bold text-primary-foreground disabled:opacity-60">{busy ? "Please wait…" : mode === "in" ? "Sign in" : "Sign up"}</button>
      </form>
      <button onClick={() => setMode(mode === "in" ? "up" : "in")} className="mt-4 text-sm font-semibold text-primary">
        {mode === "in" ? "New here? Create account" : "Already have an account? Sign in"}
      </button>
    </div>
  );
}
