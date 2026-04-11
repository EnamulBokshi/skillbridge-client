import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const terms = [
  {
    title: 'Account Responsibility',
    content:
      'Users are responsible for maintaining accurate account information and protecting login credentials from unauthorized access.',
  },
  {
    title: 'Session Conduct',
    content:
      'Students and tutors must engage respectfully in all sessions. Harmful, abusive, or fraudulent behavior may result in account restrictions.',
  },
  {
    title: 'Payments and Cancellations',
    content:
      'Payments must be completed through approved platform channels. Cancellation and refund eligibility depends on the booking policy in effect.',
  },
  {
    title: 'Platform Availability',
    content:
      'We aim for reliable service, but temporary interruptions may occur for maintenance, upgrades, or issues beyond our control.',
  },
]

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-3">
          <p className="text-sm font-medium text-primary">Legal</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Terms of Service</h1>
          <p className="text-sm text-muted-foreground">Last updated: April 11, 2026</p>
          <p className="text-muted-foreground">
            These terms govern the use of SkillBridge services by students,
            tutors, and visitors.
          </p>
        </header>

        <section className="space-y-4">
          {terms.map((term) => (
            <Card key={term.title} className="border-border/70 bg-card/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>{term.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{term.content}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </div>
  )
}
