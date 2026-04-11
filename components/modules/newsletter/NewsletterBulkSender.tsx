"use client";

import { sendBulkNewsletterEmailAction } from "@/action/newsletter.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { INewsletterSubscriber } from "@/types/newsletter.type";
import { useMemo, useState } from "react";
import { toast } from "sonner";

type Props = {
  subscribers: INewsletterSubscriber[];
};

export default function NewsletterBulkSender({ subscribers }: Props) {
  const activeSubscribers = useMemo(
    () => subscribers.filter((subscriber) => subscriber.isSubscribed && !subscriber.isDeleted),
    [subscribers],
  );

  const [selectedEmails, setSelectedEmails] = useState<Set<string>>(new Set());
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const isAllSelected =
    activeSubscribers.length > 0 && selectedEmails.size === activeSubscribers.length;

  const toggleEmail = (email: string, checked: boolean) => {
    setSelectedEmails((previous) => {
      const next = new Set(previous);

      if (checked) {
        next.add(email);
      } else {
        next.delete(email);
      }

      return next;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (!checked) {
      setSelectedEmails(new Set());
      return;
    }

    setSelectedEmails(new Set(activeSubscribers.map((subscriber) => subscriber.email)));
  };

  const handleSend = async () => {
    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();
    const emails = Array.from(selectedEmails);

    if (emails.length === 0) {
      toast.error("Please select at least one subscriber");
      return;
    }

    if (!trimmedSubject) {
      toast.error("Email subject is required");
      return;
    }

    if (trimmedMessage.length < 5) {
      toast.error("Email message must be at least 5 characters");
      return;
    }

    setIsSending(true);
    const loading = toast.loading("Sending newsletter email...");

    const { error, message: responseMessage } = await sendBulkNewsletterEmailAction({
      emails,
      subject: trimmedSubject,
      message: trimmedMessage,
    });

    if (error) {
      toast.error(responseMessage || "Failed to send newsletter", { id: loading });
      setIsSending(false);
      return;
    }

    toast.success(responseMessage || "Newsletter sent successfully", { id: loading });
    setSubject("");
    setMessage("");
    setSelectedEmails(new Set());
    setIsSending(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Newsletter</CardTitle>
        <CardDescription>
          Select subscribers, compose your message, and send in one click.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="secondary">Total: {subscribers.length}</Badge>
          <Badge variant="outline">Active: {activeSubscribers.length}</Badge>
          <Badge variant="outline">Selected: {selectedEmails.size}</Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-medium">Subscribers</p>

            <div className="flex items-center gap-2">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={(checked) => handleSelectAll(Boolean(checked))}
                aria-label="Select all subscribers"
              />
              <span className="text-sm text-muted-foreground">Select all active</span>
            </div>
          </div>

          <div className="max-h-80 overflow-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Select</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {subscribers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      No newsletter subscribers found.
                    </TableCell>
                  </TableRow>
                ) : (
                  subscribers.map((subscriber) => {
                    const isActive = subscriber.isSubscribed && !subscriber.isDeleted;
                    const isSelected = selectedEmails.has(subscriber.email);

                    return (
                      <TableRow key={subscriber.id}>
                        <TableCell>
                          <Checkbox
                            disabled={!isActive}
                            checked={isSelected}
                            onCheckedChange={(checked) =>
                              toggleEmail(subscriber.email, Boolean(checked))
                            }
                            aria-label={`Select ${subscriber.email}`}
                          />
                        </TableCell>
                        <TableCell>{subscriber.name}</TableCell>
                        <TableCell>{subscriber.email}</TableCell>
                        <TableCell>
                          {isActive ? (
                            <Badge>Subscribed</Badge>
                          ) : (
                            <Badge variant="outline">Unavailable</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="newsletter-subject">
              Subject
            </label>
            <Input
              id="newsletter-subject"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              placeholder="Weekly updates from SkillBridge"
              maxLength={180}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="newsletter-message">
              Message
            </label>
            <Textarea
              id="newsletter-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="min-h-44"
              placeholder="Write your newsletter content here..."
              maxLength={10000}
            />
          </div>

          <div className="flex justify-end">
            <Button type="button" onClick={handleSend} disabled={isSending}>
              {isSending ? "Sending..." : "Send Newsletter"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
