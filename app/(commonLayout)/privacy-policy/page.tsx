import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const sections = [
  {
    title: 'Information We Collect',
    content:
      'We collect account details, profile information, and session-related activity needed to provide tutoring services and improve platform quality.',
  },
  {
    title: 'How We Use Information',
    content:
      'Your data is used to deliver learning sessions, personalize recommendations, process payments, and provide customer support.',
  },
  {
    title: 'Data Sharing and Security',
    content:
      'SkillBridge does not sell personal data. We share limited information with trusted providers only when necessary to operate services securely.',
  },
  {
    title: 'Your Privacy Choices',
    content:
      'You can update profile information, manage communication preferences, and request account updates through support channels.',
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-3">
          <p className="text-sm font-medium text-primary">Legal</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">Last updated: April 11, 2026</p>
          <p className="text-muted-foreground">
            This policy explains how SkillBridge collects, uses, and protects your
            information when you use our platform.
          </p>
        </header>

        <section className="space-y-4">
          {sections.map((section) => (
            <Card key={section.title} className="border-border/70 bg-card/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{section.content}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </div>
  )
}
