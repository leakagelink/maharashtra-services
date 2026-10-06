import { Link } from "@tanstack/react-router";
import { Home, LayoutGrid, Search, MessageSquare, Store } from "lucide-react";
import type { ReactNode } from "react";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground font-extrabold relative">
        Q<span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-accent-gradient" />
      </span>
      <span className="text-xl font-extrabold tracking-tight text-primary">
        Quick<span className="text-brand-red">Dial</span>
      </span>
    </Link>
  );
}

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/businesses", label: "Businesses" },
  { to: "/areas", label: "Areas" },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <header className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
                activeProps={{ className: "text-primary" }}>{n.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/search" className="hidden rounded-lg p-2 text-muted-foreground hover:bg-muted md:block" aria-label="Search"><Search className="h-5 w-5" /></Link>
            <Link to="/list-your-business" className="rounded-xl bg-accent-gradient px-4 py-2 text-sm font-bold text-primary-foreground">List Your Business</Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-16 border-t bg-card">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4">
          <div className="space-y-3"><Logo /><p className="text-sm text-muted-foreground">Find Local Services. Call. Connect. Trusted professionals across Ahilyanagar (Ahmednagar), Maharashtra.</p></div>
          <div><h4 className="mb-3 font-bold">Explore</h4><ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/services">All services</Link></li><li><Link to="/businesses">Businesses</Link></li><li><Link to="/areas">Areas</Link></li></ul></div>
          <div><h4 className="mb-3 font-bold">For businesses</h4><ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/list-your-business">List your business — free</Link></li></ul></div>
          <div><h4 className="mb-3 font-bold">Popular</h4><ul className="space-y-2 text-sm text-muted-foreground">
            {["electrician", "plumber", "ac-service", "packers-movers"].map((s) => (
              <li key={s}><Link to="/services/$slug" params={{ slug: s }} className="capitalize">{s.replace("-", " ")} in Ahilyanagar</Link></li>))}</ul></div>
        </div>
        <p className="border-t py-4 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} QuickDial · Ahilyanagar</p>
      </footer>
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t bg-card md:hidden">
        {[
          { to: "/", icon: Home, label: "Home" },
          { to: "/services", icon: LayoutGrid, label: "Categories" },
          { to: "/search", icon: Search, label: "Search" },
          { to: "/businesses", icon: MessageSquare, label: "Browse" },
          { to: "/list-your-business", icon: Store, label: "List" },
        ].map((n) => (
          <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
            className="flex flex-col items-center gap-1 py-2 text-[11px] font-semibold text-muted-foreground"
            activeProps={{ className: "text-primary" }}>
            <n.icon className="h-5 w-5" />{n.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
