"use client";

import { subscribeNewsletterAction } from "@/action/newsletter.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MailOpen } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function HomeNewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    if (!EMAIL_REGEX.test(normalizedEmail)) {
      toast.error("Please provide a valid email address");
      return;
    }

    setIsSubmitting(true);
    const loading = toast.loading("Subscribing...");

    const { error, message } = await subscribeNewsletterAction({
      name: normalizedEmail.split("@")[0] || "Subscriber",
      email: normalizedEmail,
    });

    if (error) {
      toast.error(message || "Failed to subscribe", { id: loading });
      setIsSubmitting(false);
      return;
    }

    toast.success(message || "Subscribed successfully", { id: loading });
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <section id="newsletter" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-slate-200 bg-linear-to-r from-slate-100/80 via-slate-50 to-slate-100/60 p-6 shadow-sm md:p-10">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mx-auto flex max-w-xs flex-col items-center gap-4 text-center">
                <div className="rounded-2xl bg-slate-100 p-4 text-primary">
                  <MailOpen className="size-8" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                  When do I need to file taxes?
                </h3>
                <p className="text-slate-600">We&apos;ll tell you.</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Get notified with our newsletter!
              </h2>
              <p className="text-base text-slate-600 sm:text-lg">
                No spam. Only useful platform updates, tips, and friendly reminders.
              </p>

              <form
                onSubmit={handleSubscribe}
                className="flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Your email address"
                  maxLength={160}
                  className="h-12 bg-white"
                />
                <Button type="submit" disabled={isSubmitting} className="h-12 px-8">
                  {isSubmitting ? "Signing up..." : "Sign up"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
