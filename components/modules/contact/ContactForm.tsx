"use client";

import { createContactAction } from "@/action/contact.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactFormProps = {
  className?: string;
  embedded?: boolean;
};

export default function ContactForm({ className, embedded = false }: ContactFormProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const leftParallaxY = useTransform(scrollYProgress, [0, 0.5, 1], [18, 0, -18]);
  const rightParallaxY = useTransform(scrollYProgress, [0, 0.5, 1], [-18, 0, 18]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedSubject = subject.trim();
    const normalizedMessage = message.trim();

    if (!normalizedName) return toast.error("Name is required");
    if (!normalizedEmail) return toast.error("Email is required");
    if (!EMAIL_REGEX.test(normalizedEmail)) return toast.error("Please provide a valid email address");
    if (!normalizedSubject) return toast.error("Subject is required");
    if (normalizedMessage.length < 10) {
      return toast.error("Message must be at least 10 characters long");
    }

    setIsSubmitting(true);
    const loading = toast.loading("Sending your message...");

    const { error, message: responseMessage } = await createContactAction({
      name: normalizedName,
      email: normalizedEmail,
      subject: normalizedSubject,
      message: normalizedMessage,
    });

    if (error) {
      toast.error(responseMessage || "Failed to submit contact form", { id: loading });
      setIsSubmitting(false);
      return;
    }

    toast.success(responseMessage || "Contact form submitted successfully", { id: loading });
    resetForm();
    setIsSubmitting(false);
  };

  return (
    <section
      ref={sectionRef}
      className={cn(
        embedded ? "w-full" : "px-4 sm:px-6 py-4 mt-10 lg:px-8",
        className,
      )}
    >
      <div className={cn(embedded ? "w-full" : "mx-auto max-w-6xl")}>
        <Card className="overflow-hidden border border-border/60 bg-card/50 p-4 shadow-[0_28px_70px_-35px_rgba(15,23,42,0.45)] backdrop-blur-2xl supports-backdrop-filter:bg-card/45">
          <CardContent className="p-0">
            <div className="grid items-stretch lg:grid-cols-2 lg:min-h-152">
              <motion.div
                initial={prefersReducedMotion ? false : { x: 120, opacity: 0 }}
                whileInView={prefersReducedMotion ? undefined : { x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ type: "spring", stiffness: 92, damping: 16, mass: 0.9 }}
                style={prefersReducedMotion ? undefined : { y: leftParallaxY }}
                className="relative overflow-hidden border-r border-border/50 bg-linear-to-br from-primary/10 via-background/70 to-secondary/10 p-6 backdrop-blur-md sm:p-8 dark:from-primary/20 dark:via-background/40 dark:to-secondary/20"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.18),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(6,182,212,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.35),rgba(255,255,255,0.08))] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.25),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(6,182,212,0.2),transparent_28%),linear-gradient(180deg,rgba(15,23,42,0.2),rgba(15,23,42,0.05))]" />
                <div className="relative flex h-full items-center justify-center">
                  <div className="relative w-full max-w-md rounded-[2.25rem] border border-white/60 bg-white/55 p-4 shadow-[0_25px_60px_-25px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-white/15 dark:bg-slate-900/35 sm:p-6">
                    <div className="overflow-hidden rounded-[1.5rem] bg-white/75 p-3 shadow-inner dark:bg-slate-900/55 sm:p-4">
                      <Image
                        src="/hero_section_primary.png"
                        alt="Contact us illustration"
                        width={900}
                        height={720}
                        className="h-full w-full object-contain"
                        priority={false}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={prefersReducedMotion ? false : { x: -120, opacity: 0 }}
                whileInView={prefersReducedMotion ? undefined : { x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ type: "spring", stiffness: 92, damping: 16, mass: 0.9, delay: 0.08 }}
                style={prefersReducedMotion ? undefined : { y: rightParallaxY }}
                className="flex items-center border-l border-border/50 bg-background/40 px-6 py-8 backdrop-blur-xl sm:px-10 sm:py-12 dark:bg-slate-950/45"
              >
                <div className="w-full space-y-7 text-foreground">
                  <div className="space-y-2">
                    <p className="text-sm font-medium uppercase tracking-[0.36em] text-primary">
                      Contact us
                    </p>
                    <h2 className="text-4xl font-black tracking-tight text-primary sm:text-5xl lg:text-6xl">
                      Today
                    </h2>
                    <p className="max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
                      Share your question, feedback, or support request and we&apos;ll get back to you.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Name"
                        maxLength={120}
                        className="h-12 border-border/70 bg-background/55 text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/30"
                      />
                      <Input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="E-Mail"
                        maxLength={160}
                        className="h-12 border-border/70 bg-background/55 text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/30"
                      />
                    </div>

                    <Input
                      value={subject}
                      onChange={(event) => setSubject(event.target.value)}
                      placeholder="Subject"
                      maxLength={180}
                      className="h-12 border-border/70 bg-background/55 text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/30"
                    />

                    <Textarea
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder="Message"
                      maxLength={4000}
                      className="min-h-36 border-border/70 bg-background/55 text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/30"
                    />

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs text-muted-foreground">
                        We usually reply within 24 hours.
                      </p>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="h-12 rounded-full bg-[#ff0f5b] px-10 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-lg shadow-pink-500/30 hover:bg-[#f30e56]"
                      >
                        {isSubmitting ? "Sending..." : "Sign up"}
                      </Button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
