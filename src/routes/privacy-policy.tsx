import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { brandShareMeta, customerCare } from "@/lib/brand";

const d = "Privacy Policy for QuickDial Ahilyanagar — what data we collect, why, and how to request deletion.";
export const Route = createFileRoute("/privacy-policy")({
  head: () => ({ meta: [...brandShareMeta, { title: "Privacy Policy — QuickDial" }, { name: "description", content: d }, { property: "og:title", content: "Privacy Policy — QuickDial" }, { property: "og:description", content: d }] }),
  component: Page,
});

function Page() {
  return (
    <LegalPage title="Privacy Policy" updated="19 October 2026">
      <p>QuickDial ("we", "us") operates the QuickDial Ahilyanagar website (quickdialan.com) and Android app, a directory that helps people find and contact local service businesses in Ahilyanagar, Maharashtra.</p>
      <h2>1. Information we collect</h2>
      <ul>
        <li><b>Enquiry forms:</b> when you send an enquiry, quote or booking request to a business, we collect your name, mobile number, area (optional) and message, plus the business you contacted.</li>
        <li><b>"List your business" requests:</b> business name, owner name, mobile number, category, area and optional message.</li>
        <li><b>Administrator accounts:</b> email address and password (stored securely by our authentication provider). Public users do not need an account.</li>
        <li><b>Technical data:</b> our hosting provider may process IP address, device/browser type and request logs to deliver and secure the service.</li>
      </ul>
      <p>We do not collect precise location, contacts, photos, or payment information. We do not use advertising SDKs or sell personal data.</p>
      <h2>2. How we use it</h2>
      <ul><li>To pass your enquiry to the business and contact you about it.</li><li>To review and publish business listings.</li><li>To secure and operate the service.</li></ul>
      <h2>3. Calls and WhatsApp</h2>
      <p>Tapping Call or WhatsApp opens your phone dialer or the WhatsApp app. Those communications are handled by your carrier or WhatsApp under their own policies.</p>
      <h2>4. Sharing and processors</h2>
      <p>Data is stored with our cloud hosting and database provider. Enquiries may be shared with the business you contacted. We do not share data with advertisers.</p>
      <h2>5. Retention and security</h2>
      <p>Enquiries and listing requests are kept as long as needed to serve them, then deleted on request. Data is transmitted over HTTPS and access is restricted to authorised administrators.</p>
      <h2>6. Your rights and deletion</h2>
      <p>You can ask us to access, correct or delete your data — see <a className="font-bold text-primary" href="/delete-account">Delete your data</a>.</p>
      <h2>7. Children</h2>
      <p>The service is not directed at children under 13.</p>
      <h2>8. Contact</h2>
      <p>Email <a className="font-bold text-primary" href="mailto:hello@quickdial.in">hello@quickdial.in</a> or call <a className="font-bold text-primary" href={`tel:${customerCare.tel}`}>{customerCare.display}</a>.</p>
    </LegalPage>
  );
}
