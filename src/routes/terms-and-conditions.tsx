import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { brandShareMeta, customerCare } from "@/lib/brand";

const d = "Terms and Conditions for using QuickDial Ahilyanagar local services directory.";
export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({ meta: [...brandShareMeta, { title: "Terms & Conditions — QuickDial" }, { name: "description", content: d }, { property: "og:title", content: "Terms & Conditions — QuickDial" }, { property: "og:description", content: d }] }),
  component: Page,
});

function Page() {
  return (
    <LegalPage title="Terms & Conditions" updated="19 October 2026">
      <p>By using QuickDial (website and Android app) you agree to these terms.</p>
      <h2>1. What QuickDial is</h2>
      <p>QuickDial is a directory that lists local service businesses and lets you call, WhatsApp or send an enquiry to them. We are not a party to any agreement between you and a business, and we do not provide the services ourselves.</p>
      <h2>2. Listings</h2>
      <p>Listing details are provided by businesses or our team and may change. Please confirm prices, timings and qualifications directly with the business before hiring.</p>
      <h2>3. Acceptable use</h2>
      <ul><li>Provide accurate information in forms.</li><li>Do not send spam, abusive or false enquiries.</li><li>Do not scrape, copy or misuse the directory.</li></ul>
      <h2>4. Liability</h2>
      <p>To the extent allowed by law, QuickDial is not liable for the quality, safety or outcome of services provided by listed businesses.</p>
      <h2>5. Privacy</h2>
      <p>See our <a className="font-bold text-primary" href="/privacy-policy">Privacy Policy</a>.</p>
      <h2>6. Governing law</h2>
      <p>These terms are governed by the laws of India.</p>
      <h2>7. Contact</h2>
      <p><a className="font-bold text-primary" href="mailto:hello@quickdial.in">hello@quickdial.in</a> · <a className="font-bold text-primary" href={`tel:${customerCare.tel}`}>{customerCare.display}</a></p>
    </LegalPage>
  );
}
