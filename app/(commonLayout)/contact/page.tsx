import ContactForm from "@/components/modules/contact/ContactForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Contact Us</h1>
          <p className="text-muted-foreground">
            Send us a message or reach us directly using the information below.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-3">
          <ContactForm embedded className="lg:col-span-2" />

          <Card className="border-border/70 bg-card/60 backdrop-blur-lg">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 text-sm">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 text-primary" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">support@skillbridge.app</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 text-primary" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground">+880 1XXX-XXXXXX</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 text-primary" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-muted-foreground">
                    SkillBridge HQ, Dhaka, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock3 className="mt-0.5 size-4 text-primary" />
                <div>
                  <p className="font-medium">Working Hours</p>
                  <p className="text-muted-foreground">Sun - Thu, 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
