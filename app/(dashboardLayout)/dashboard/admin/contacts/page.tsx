import { getContactsAction } from "@/action/contact.action";
import { ContactManagementTable } from "@/components/modules/contact/ContactManagementTable";
import { IContact } from "@/types/contact.type";

const extractContacts = (payload: unknown): IContact[] => {
  if (Array.isArray(payload)) {
    return payload as IContact[];
  }

  if (
    payload &&
    typeof payload === "object" &&
    "data" in payload &&
    Array.isArray((payload as { data?: unknown }).data)
  ) {
    return (payload as { data: IContact[] }).data;
  }

  return [];
};

export default async function AdminContactsPage() {
  const { data, error, message } = await getContactsAction();
  const contacts = extractContacts(data);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contact Inbox</h1>
        <p className="text-muted-foreground">
          Monitor and manage contact requests submitted from the public contact form.
        </p>
      </div>

      {error ? (
        <div className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {message || "Failed to load contact messages."}
        </div>
      ) : (
        <ContactManagementTable contacts={contacts} />
      )}
    </div>
  );
}
