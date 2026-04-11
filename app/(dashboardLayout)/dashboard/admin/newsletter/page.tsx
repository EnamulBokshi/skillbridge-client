import { getNewsletterSubscribersAction } from "@/action/newsletter.action";
import NewsletterBulkSender from "@/components/modules/newsletter/NewsletterBulkSender";

export default async function AdminNewsletterPage() {
  const { data, error, message } = await getNewsletterSubscribersAction();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Newsletter</h1>
        <p className="text-muted-foreground">
          Manage newsletter subscribers and send bulk emails to selected recipients.
        </p>
      </div>

      {error ? (
        <div className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {message || "Failed to load newsletter subscribers."}
        </div>
      ) : (
        <NewsletterBulkSender subscribers={data || []} />
      )}
    </div>
  );
}
