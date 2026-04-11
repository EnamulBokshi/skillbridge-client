"use client";

import {
  subscribeNewsletterAction,
  unsubscribeNewsletterAction,
} from "@/action/newsletter.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NewsletterSubscriptionPanel() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [unsubscribeEmail, setUnsubscribeEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isUnsubscribing, setIsUnsubscribing] = useState(false);

  const validateEmail = (value: string) => EMAIL_REGEX.test(value.trim());

  const handleSubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedName) {
      toast.error("Name is required");
      return;
    }

    if (!normalizedEmail || !validateEmail(normalizedEmail)) {
      toast.error("Please provide a valid email address");
      return;
    }

    setIsSubscribing(true);
    const loading = toast.loading("Subscribing to newsletter...");

    const { error, message } = await subscribeNewsletterAction({
      name: normalizedName,
      email: normalizedEmail,
    });

    if (error) {
      toast.error(message || "Failed to subscribe", { id: loading });
      setIsSubscribing(false);
      return;
    }

    toast.success(message || "Subscribed successfully", { id: loading });
    setName("");
    setEmail("");
    setIsSubscribing(false);
  };

  const handleUnsubscribe = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const normalizedEmail = unsubscribeEmail.trim().toLowerCase();
    if (!normalizedEmail || !validateEmail(normalizedEmail)) {
      toast.error("Please provide a valid email address");
      return;
    }

    setIsUnsubscribing(true);
    const loading = toast.loading("Unsubscribing...");

    const { error, message } = await unsubscribeNewsletterAction({
      email: normalizedEmail,
    });

    if (error) {
      toast.error(message || "Failed to unsubscribe", { id: loading });
      setIsUnsubscribing(false);
      return;
    }

    toast.success(message || "Unsubscribed successfully", { id: loading });
    setUnsubscribeEmail("");
    setIsUnsubscribing(false);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Subscribe to Newsletter</CardTitle>
          <CardDescription>
            Get updates, study tips, and platform news in your inbox.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubscribe}>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="newsletter-name">
                Name
              </label>
              <Input
                id="newsletter-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your full name"
                maxLength={120}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="newsletter-email">
                Email
              </label>
              <Input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                maxLength={160}
              />
            </div>

            <Button className="w-full" type="submit" disabled={isSubscribing}>
              {isSubscribing ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Unsubscribe</CardTitle>
          <CardDescription>
            You can opt out at any time using your email address.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleUnsubscribe}>
            <div className="space-y-2">
              <label
                className="text-sm font-medium"
                htmlFor="newsletter-unsubscribe-email"
              >
                Email
              </label>
              <Input
                id="newsletter-unsubscribe-email"
                type="email"
                value={unsubscribeEmail}
                onChange={(event) => setUnsubscribeEmail(event.target.value)}
                placeholder="you@example.com"
                maxLength={160}
              />
            </div>

            <Button
              className="w-full"
              variant="outline"
              type="submit"
              disabled={isUnsubscribing}
            >
              {isUnsubscribing ? "Unsubscribing..." : "Unsubscribe"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
