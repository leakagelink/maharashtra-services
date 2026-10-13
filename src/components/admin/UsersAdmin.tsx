import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { KeyRound, Plus, Shield, ShieldOff, Trash2 } from "lucide-react";
import { createUser, deleteUser, listUsers, updateUser } from "@/lib/admin.functions";
import { Check, Field, Panel, btnOutline, btnPrimary, iconBtn, inputCls } from "./ui";

export function UsersAdmin() {
  const list = useQuery({ queryKey: ["admin-users"], queryFn: () => listUsers() });
  const create = useServerFn(createUser);
  const update = useServerFn(updateUser);
  const del = useServerFn(deleteUser);
  const [draft, setDraft] = useState<{ email: string; password: string; admin: boolean } | null>(null);

  const run = async (p: Promise<unknown>, msg: string) => {
    try { await p; toast.success(msg); list.refetch(); } catch (e) { toast.error((e as Error).message); }
  };

  return (
    <div>
      <button onClick={() => setDraft({ email: "", password: "", admin: false })} className={btnPrimary}><Plus className="h-4 w-4" />Add user</button>
      {draft && (
        <form onSubmit={(e) => { e.preventDefault(); run(create({ data: draft }), "User added").then(() => setDraft(null)); }} className="mt-4 grid gap-3 rounded-2xl border bg-card p-5 md:grid-cols-2">
          <Field label="Email"><input type="email" required value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} className={inputCls} /></Field>
          <Field label="Password"><input type="text" required minLength={6} value={draft.password} onChange={(e) => setDraft({ ...draft, password: e.target.value })} className={inputCls} /></Field>
          <Check label="Admin access" checked={draft.admin} onChange={(v) => setDraft({ ...draft, admin: v })} />
          <div className="flex gap-2 md:col-span-2"><button className={btnPrimary}>Save</button><button type="button" onClick={() => setDraft(null)} className={btnOutline}>Cancel</button></div>
        </form>
      )}
      <Panel>
        {list.isLoading && <p className="p-6 text-muted-foreground">Loading…</p>}
        {list.error && <p className="p-6 text-destructive">{(list.error as Error).message}</p>}
        {list.data?.map((u) => (
          <div key={u.id} className="flex items-center gap-2 p-3">
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold">{u.email} {u.isAdmin && <span className="rounded bg-primary px-2 py-0.5 text-xs text-primary-foreground">admin</span>}</p>
              <p className="text-xs text-muted-foreground">Joined {new Date(u.created_at).toLocaleDateString("en-IN")}{u.confirmed ? "" : " · email not confirmed"}</p>
            </div>
            <button aria-label="Change password" title="Change password" onClick={() => { const p = prompt("Naya password (6+ characters)"); if (p) run(update({ data: { id: u.id, password: p } }), "Password changed"); }} className={iconBtn}><KeyRound className="h-4 w-4" /></button>
            <button aria-label={u.isAdmin ? "Remove admin" : "Make admin"} title={u.isAdmin ? "Remove admin" : "Make admin"} onClick={() => run(update({ data: { id: u.id, admin: !u.isAdmin } }), "Role updated")} className={iconBtn}>{u.isAdmin ? <ShieldOff className="h-4 w-4" /> : <Shield className="h-4 w-4" />}</button>
            <button aria-label={`Delete ${u.email}`} onClick={() => { if (confirm(`${u.email} delete karein?`)) run(del({ data: { id: u.id } }), "User deleted"); }} className={`${iconBtn} text-destructive`}><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </Panel>
    </div>
  );
}
