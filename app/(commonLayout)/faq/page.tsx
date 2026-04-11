import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'How do I book a tutoring session?',
    answer:
      'Go to Sessions or Tutors, choose a suitable tutor and time slot, then complete your booking from the checkout flow.',
  },
  {
    question: 'Can I reschedule or cancel a booking?',
    answer:
      'Yes. You can manage upcoming bookings from your dashboard. Refund eligibility depends on the cancellation window and policy.',
  },
  {
    question: 'How are tutors verified on SkillBridge?',
    answer:
      'Tutors complete profile verification and platform review checks before appearing in public listings.',
  },
  {
    question: 'How do I become a tutor?',
    answer:
      'Sign up, complete registration, add your subject expertise, and submit your profile for review through the tutor onboarding steps.',
  },
  {
    question: 'Where can I get direct support?',
    answer:
      'If your issue is not covered here, use the Contact page and our team will respond as soon as possible.',
  },
]

export default function FaqPage() {
  return (
    <div className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="space-y-3">
          <p className="text-sm font-medium text-primary">Support</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked Questions</h1>
          <p className="text-muted-foreground">
            Quick answers to common questions from students and tutors.
          </p>
        </header>

        <Accordion type="single" collapsible className="rounded-xl border border-border/70 bg-card/70 px-5 py-2 backdrop-blur-sm">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`faq-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
