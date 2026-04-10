import BookingSuccessToast from '@/components/modules/booking/BookingSuccessToast';
import HomeHeroSection from '@/components/modules/common/HomeHeroSection';
import HowItWorksTimeline from '@/components/modules/common/HowItWorksTimeline';
import PlatformStatsSection from '@/components/modules/common/PlatformStatsSection';
import TestimonialsSection from '@/components/modules/common/TestimonialsSection';
import TutorPromoSection from '@/components/modules/common/TutorPromoSection';
import WhyChooseUsSection from '@/components/modules/common/WhyChooseUsSection';
import HomeSlotList from '@/components/modules/slot/HomeSlotList';
import FeaturedTutorsHero from '@/components/modules/tutors/FeaturedTutorsHero';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Home() {
  return (
    <div className="min-h-screen">
      <BookingSuccessToast />
      <HomeHeroSection />

      <PlatformStatsSection />
      <TutorPromoSection />
      <WhyChooseUsSection />
      <HowItWorksTimeline />

      {/* Featured Sessions Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">Recent Study Sessions</h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
              Popular sessions available right now. Book your spot before they fill up!
            </p>
          </div>
          
          {/* <PublicSlotList showFilter={false} /> */}
          <HomeSlotList />
        </div>
      </section>

    <section className='py-20 px-4 sm:px-6 lg:px-8 bg-muted/30'>
    <div className="max-w-7xl mx-auto">
          {/* <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">Meet our best tutors</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Popular turs, who is ready to deliver the best
            </p>
          </div> */}
          
          {/* <PublicSlotList showFilter={false} /> */}
          <FeaturedTutorsHero />
        </div>
    </section>

      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary to-primary/80 p-12 text-center text-primary-foreground">
            <div className="absolute inset-0 bg-grid-white/10" />
            <div className="relative space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold">Ready to Start Your Learning Journey?</h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                Join thousands of students already learning with SkillBridge. Find your perfect tutor today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                  <Link href="/signup">Get Started Free</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <Link href="/sessions">View All Sessions</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
