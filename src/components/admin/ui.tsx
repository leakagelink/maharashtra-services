import type { ReactNode } from "react";

export const inputCls = "mt-1 h-10 w-full rounded-lg border bg-background px-3 font-normal";
export const btnPrimary = "inline-flex items-center gap-1 rounded-xl bg-primary px-4 py-2 font-bold text-primary-foreground disabled:opacity-60";
export const btnOutline = "inline-flex items-center gap-1 rounded-xl border px-4 py-2 font-semibold";
export const iconBtn = "rounded-lg p-2 hover:bg-muted";

export function Field({ label, children, wide }: { label: string; children: ReactNode; wide?: boolean }) {
  return <label className={`block text-sm font-semibold ${wide ? "md:col-span-2" : ""}`}>{label}{children}</label>;
}
export function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm font-semibold">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4" />{label}
    </label>
  );
}
export function Panel({ children }: { children: ReactNode }) {
  return <div className="mt-4 divide-y rounded-2xl border bg-card">{children}</div>;
}
export const slugify = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
