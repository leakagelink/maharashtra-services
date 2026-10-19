import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { brandShareMeta, customerCare } from "@/lib/brand";

const d = "How to request deletion of your QuickDial data — enquiries, listing requests and admin accounts.";
export const Route = createFileRoute("/delete-account")({
  head: () => ({ meta: [...brandShareMeta, { title: "Delete Your Data — QuickDial" }, { name: "description", content: d }, { property: "og:title", content: "Delete Your Data — QuickDial" }, { property: "og:description", content: d }] }),
  component: Page,
});

function Page() {
  const mail = "mailto:hello@quickdial.in?subject=" + encodeURIComponent("QuickDial data deletion request") + "&body=" + encodeURIComponent("Name:\nMobile number used:\nWhat to delete (enquiries / listing request / account):\n");
  return (
    <LegalPage title="Delete your data" updated="19 October 2026">
      <p>Public users of QuickDial do not create accounts. If you sent an enquiry or a "List your business" request, you can ask us to delete it.</p>
      <h2>How to request deletion</h2>
      <ul>
        <li>Email <a className="font-bold text-primary" href={mail}>hello@quickdial.in</a> with the mobile number you used, or</li>
        <li>Call / WhatsApp customer care at <a className="font-bold text-primary" href={`tel:${customerCare.tel}`}>{customerCare.display}</a>.</li>
      </ul>
      <h2>What gets deleted</h2>
      <p>All enquiries and listing requests linked to your mobile number (name, phone, area, message). Administrator accounts are deleted together with their login credentials.</p>
      <h2>Timeline</h2>
      <p>Requests are processed within 30 days. We may verify your request by calling the number you provided.</p>
      <a href={mail} className="inline-flex min-h-11 items-center rounded-xl bg-primary px-5 font-bold text-primary-foreground">Request deletion by email</a>
    </LegalPage>
  );
}
