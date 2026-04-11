import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

const helpTopics = [
  {
    title: 'Booking and Scheduling',
    description:
      'Find available tutors, choose a slot that works for you, and manage upcoming sessions from your dashboard.',
  },
  {
    title: 'Payments and Refunds',
    description:
      'Understand payment methods, invoices, and how refunds are handled when sessions are canceled within policy.',
  },
  {
    title: 'Account and Profile',
    description:
      'Update your profile details, complete registration, and manage your learning preferences securely.',
  },
  {
    title: 'Technical Support',
    description:
      'Troubleshoot login issues, browser problems, and session access if you are unable to join a class.',
  },
]

export default function HelpCenterPage() {
  return (
    <div className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="space-y-3">
          <p className="text-sm font-medium text-primary">Support</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Help Center</h1>
          <p className="max-w-3xl text-muted-foreground">
            Browse common support topics for students and tutors. If you still need
            assistance, our support team is available through the contact page.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {helpTopics.map((topic) => (
            <Card key={topic.title} className="border-border/70 bg-card/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl">{topic.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{topic.description}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="flex flex-col gap-2 p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Need direct help from our team? Send a message and we will respond as quickly as possible.
            </p>
            <Link href="/contact" className="text-sm font-semibold text-primary hover:underline">
              Contact Support
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
