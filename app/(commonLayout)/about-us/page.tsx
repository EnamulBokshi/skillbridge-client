import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function AboutUs() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-primary/10 via-background to-secondary/10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Our Story</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              About <span className="text-primary">SkillBridge</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Bridging the gap between knowledge seekers and expert educators to create 
              meaningful learning experiences that transform lives.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To democratize education by connecting students with passionate, qualified tutors 
                who can provide personalized learning experiences. We believe that everyone deserves 
                access to quality education, regardless of their location or circumstances.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Through our platform, we empower both learners and educators to achieve their goals, 
                fostering a community built on knowledge sharing, growth, and mutual success.
              </p>
            </div>

            {/* Vision */}
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold">Our Vision</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To become the world's most trusted platform for personalized education, where every 
                student can find the perfect tutor to unlock their full potential and every educator 
                can share their expertise with eager learners.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We envision a future where quality education is accessible to all, boundaries are 
                broken down, and learning becomes a lifelong journey of discovery and achievement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">Our Story</h2>
            <p className="text-lg text-muted-foreground">How SkillBridge came to be</p>
          </div>

          <div className="space-y-8">
            <div className="relative pl-8 border-l-2 border-primary/30">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary" />
              <div className="space-y-2">
                <p className="text-sm font-semibold text-primary">2020 - The Beginning</p>
                <p className="text-muted-foreground">
                  SkillBridge was founded by a group of educators and technologists who recognized 
                  the challenges students face in finding quality tutoring. We started with a simple 
                  idea: make it easy for students to connect with expert tutors.
                </p>
              </div>
            </div>

            <div className="relative pl-8 border-l-2 border-primary/30">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary" />
              <div className="space-y-2">
                <p className="text-sm font-semibold text-primary">2021 - Growth & Expansion</p>
                <p className="text-muted-foreground">
                  We expanded our platform to include tutors across 50+ subjects and launched our 
                  mobile app, making learning accessible anytime, anywhere. Our community grew to 
                  over 1,000 tutors and 5,000 students.
                </p>
              </div>
            </div>

            <div className="relative pl-8 border-l-2 border-primary/30">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary" />
              <div className="space-y-2">
                <p className="text-sm font-semibold text-primary">2023 - Innovation & Features</p>
                <p className="text-muted-foreground">
                  We introduced advanced features like smart matching algorithms, interactive 
                  whiteboards, and recorded sessions. Our platform became more intuitive and 
                  user-friendly than ever.
                </p>
              </div>
            </div>

            <div className="relative pl-8 border-l-2 border-primary/30">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary" />
              <div className="space-y-2">
                <p className="text-sm font-semibold text-primary">2026 - Present Day</p>
                <p className="text-muted-foreground">
                  Today, SkillBridge serves over 10,000 students and 500+ verified tutors across 
                  the globe. We continue to innovate and improve, always keeping our mission at 
                  the heart of everything we do.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Quality</h3>
              <p className="text-muted-foreground">
                We maintain the highest standards in tutor verification and session quality.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Accessibility</h3>
              <p className="text-muted-foreground">
                Education should be available to everyone, everywhere, at any time.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Passion</h3>
              <p className="text-muted-foreground">
                We're passionate about education and committed to making a difference.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Integrity</h3>
              <p className="text-muted-foreground">
                We operate with transparency, honesty, and ethical standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Our Leadership Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the people driving SkillBridge's mission forward
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO & Co-Founder",
                bio: "Former educator with 15+ years of teaching experience"
              },
              {
                name: "Michael Chen",
                role: "CTO & Co-Founder",
                bio: "Tech entrepreneur with expertise in EdTech platforms"
              },
              {
                name: "Emily Rodriguez",
                role: "Head of Education",
                bio: "PhD in Educational Psychology, passionate about learning"
              },
              {
                name: "David Kim",
                role: "Head of Product",
                bio: "Product leader focused on user-centered design"
              }
            ].map((member, index) => (
              <div key={index} className="bg-card rounded-2xl border p-6 text-center space-y-4">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-sm text-primary">{member.role}</p>
                </div>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <p className="text-5xl font-bold text-primary">10,000+</p>
              <p className="text-lg text-muted-foreground">Active Students</p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-5xl font-bold text-primary">500+</p>
              <p className="text-lg text-muted-foreground">Expert Tutors</p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-5xl font-bold text-primary">50+</p>
              <p className="text-lg text-muted-foreground">Subject Areas</p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-5xl font-bold text-primary">95%</p>
              <p className="text-lg text-muted-foreground">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">Join Our Community</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you're looking to learn or teach, SkillBridge is the perfect place 
              to start your journey. Join thousands of students and tutors today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/signup">
                  Get Started
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8">
                <Link href="/sessions">Browse Sessions</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
