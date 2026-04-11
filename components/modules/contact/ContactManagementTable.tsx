"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { MessageSquareReply } from "lucide-react";

import { updateContactAction } from "@/action/contact.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { IContact } from "@/types/contact.type";

interface ContactManagementTableProps {
  contacts: IContact[];
}

type FilterType = "ALL" | "PENDING" | "REPLIED";

const normalizeStatus = (status?: string | null) => {
  if (!status) return "PENDING";
  return status.toUpperCase();
};

const getStatusVariant = (
  status: string,
): "default" | "secondary" | "outline" => {
  if (status === "REPLIED" || status === "RESOLVED") return "default";
  if (status === "PENDING") return "secondary";
  return "outline";
};

export function ContactManagementTable({ contacts }: ContactManagementTableProps) {
  const [items, setItems] = useState<IContact[]>(contacts);
  const [activeFilter, setActiveFilter] = useState<FilterType>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedContact, setSelectedContact] = useState<IContact | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [nextStatus, setNextStatus] = useState("REPLIED");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const counts = useMemo(() => {
    const pending = items.filter(
      (item) => normalizeStatus(item.status) === "PENDING",
    ).length;
    const replied = items.filter((item) => {
      const status = normalizeStatus(item.status);
      return status === "REPLIED" || status === "RESOLVED";
    }).length;

    return {
      all: items.length,
      pending,
      replied,
    };
  }, [items]);

  const filteredItems = useMemo(() => {
    const trimmed = searchQuery.trim().toLowerCase();

    const baseItems = (() => {
      if (activeFilter === "ALL") return items;
      if (activeFilter === "PENDING") {
        return items.filter(
          (item) => normalizeStatus(item.status) === "PENDING",
        );
      }

      return items.filter((item) => {
        const status = normalizeStatus(item.status);
        return status === "REPLIED" || status === "RESOLVED";
      });
    })();

    if (!trimmed) return baseItems;

    return baseItems.filter((item) => {
      const haystack = [item.name, item.email, item.subject, item.message]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(trimmed);
    });
  }, [activeFilter, items, searchQuery]);

  const openReplyDialog = (contact: IContact) => {
    setSelectedContact(contact);
    setReplyMessage(contact.adminReply || "");
    setNextStatus(normalizeStatus(contact.status) === "PENDING" ? "REPLIED" : normalizeStatus(contact.status));
  };

  const closeReplyDialog = () => {
    if (isSubmitting) return;
    setSelectedContact(null);
    setReplyMessage("");
    setNextStatus("REPLIED");
  };

  const handleReplySubmit = async () => {
    if (!selectedContact) return;

    const loading = toast.loading("Updating contact...");
    setIsSubmitting(true);

    try {
      const { error } = await updateContactAction(selectedContact.id, {
        status: nextStatus,
        adminReply: replyMessage,
      });

      if (error) {
        toast.error((error as { message?: string })?.message || "Failed to update contact", {
          id: loading,
        });
        return;
      }

      setItems((prev) =>
        prev.map((item) =>
          item.id === selectedContact.id
            ? {
                ...item,
                status: nextStatus,
                adminReply: replyMessage,
                repliedAt: new Date().toISOString(),
              }
            : item,
        ),
      );

      toast.success("Contact updated successfully", { id: loading });
      closeReplyDialog();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update contact", { id: loading });
    } finally {
      setIsSubmitting(false);
      toast.dismiss(loading);
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="contact-search">Search inbox</Label>
          <Input
            id="contact-search"
            placeholder="Search by name, email, subject, or message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={activeFilter === "ALL" ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => setActiveFilter("ALL")}
          >
            All ({counts.all})
          </Button>
          <Button
            variant={activeFilter === "PENDING" ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => setActiveFilter("PENDING")}
          >
            Pending ({counts.pending})
          </Button>
          <Button
            variant={activeFilter === "REPLIED" ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => setActiveFilter("REPLIED")}
          >
            Replied ({counts.replied})
          </Button>
        </div>

        <div className="rounded-xl border border-white/10 bg-background/55 p-3 shadow-sm backdrop-blur-md md:p-4">
          {searchQuery.trim() && (
            <p className="mb-3 text-xs text-muted-foreground">
              Showing {filteredItems.length} result{filteredItems.length === 1 ? "" : "s"} for "{searchQuery.trim()}"
            </p>
          )}
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="w-52">Sender</TableHead>
                <TableHead className="w-52">Subject</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Received</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                    No contact messages found for this filter.
                  </TableCell>
                </TableRow>
              ) : (
                filteredItems.map((contact) => {
                  const status = normalizeStatus(contact.status);

                  return (
                    <TableRow key={contact.id} className="transition-colors hover:bg-muted/25">
                      <TableCell>
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-xs text-muted-foreground">{contact.email}</p>
                      </TableCell>

                      <TableCell className="font-medium">{contact.subject}</TableCell>

                      <TableCell>
                        <p className="line-clamp-2 max-w-lg text-sm text-muted-foreground">
                          {contact.message}
                        </p>
                      </TableCell>

                      <TableCell>
                        <Badge variant={getStatusVariant(status)}>{status}</Badge>
                      </TableCell>

                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(contact.createdAt).toLocaleString()}
                      </TableCell>

                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-full"
                          onClick={() => openReplyDialog(contact)}
                        >
                          <MessageSquareReply className="mr-1 h-4 w-4" />
                          Reply
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={Boolean(selectedContact)} onOpenChange={(open) => !open && closeReplyDialog()}>
        <DialogContent className="sm:max-w-160 border-white/15 bg-background/70 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle>Reply to Contact</DialogTitle>
            <DialogDescription>
              Update the message status and send or save your admin reply.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {selectedContact && (
              <div className="rounded-lg border bg-muted/20 p-3">
                <p className="text-sm font-medium">{selectedContact.name}</p>
                <p className="text-xs text-muted-foreground">{selectedContact.email}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {selectedContact.subject}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="contact-status">Status</Label>
              <select
                id="contact-status"
                value={nextStatus}
                onChange={(e) => setNextStatus(e.target.value)}
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              >
                <option value="PENDING">Pending</option>
                <option value="REPLIED">Replied</option>
                <option value="RESOLVED">Resolved</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="admin-reply">Admin Reply</Label>
              <Textarea
                id="admin-reply"
                placeholder="Write your response for the user..."
                rows={6}
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={closeReplyDialog} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleReplySubmit} disabled={isSubmitting}>
              Save Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
