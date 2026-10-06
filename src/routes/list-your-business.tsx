import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart3, MessageSquare, PhoneIncoming, Star } from "lucide-react";

export const Route = createFileRoute("/list-your-business")({
  head: () => ({
    meta: [
      { title: "List Your Business Free — QuickDial Ahilyanagar" },
      { name: "description", content: "Get your Ahilyanagar business on QuickDial and receive calls, WhatsApp messages and enquiries from local customers." },
      { property: "og:title", content: "List Your Business Free — QuickDial" },
      { property: "og:description", content: "Reach local customers across Ahilyanagar." },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-4xl font-extrabold">Grow your business with <span className="text-primary">Quick</span><span className="text-brand-red">Dial</span></h1>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">Customers in Ahilyanagar search QuickDial every day. Create a free profile and start receiving leads.</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {[{ i: PhoneIncoming, t: "Direct calls & WhatsApp" }, { i: MessageSquare, t: "Enquiries, quotes & bookings" }, { i: Star, t: "Collect customer reviews" }, { i: BarChart3, t: "See profile views & leads" }].map((x) => (
          <div key={x.t} className="flex items-center gap-3 rounded-2xl border bg-card p-5"><x.i className="h-7 w-7 text-brand-orange" /><span className="font-bold">{x.t}</span></div>
        ))}
      </div>
      <div className="mt-10 rounded-2xl border bg-secondary p-6">
        <p className="font-bold">Business sign-up is coming next.</p>
        <p className="mt-1 text-sm text-muted-foreground">Business accounts, dashboards and the admin panel are the next phase of QuickDial.</p>
        <Link to="/" className="mt-4 inline-block rounded-xl bg-primary px-5 py-2.5 font-bold text-primary-foreground">Back to home</Link>
      </div>
    </div>
  ),
});
