import { getTutorsAction } from "@/action/tutor.action";
import FeaturedTutorsHero from "@/components/modules/tutors/FeaturedTutorsHero";
import TutorsList from "@/components/modules/tutors/TutorsList";

export default async function TutorsPage() {
  // Fetch featured tutors
  // const { data: featuredTutors } = await getTutorsAction({
  //   isFeatured: true,
  //   page: 1,
  //   limit: 6,
  //   sortBy: "avgRating",
  //   orderBy: "desc",
  // });

  // Fetch all tutors for initial list
  const { data: allTutors } = await getTutorsAction({
    page: 1,
    limit: 9,
    sortBy: "avgRating",
    orderBy: "desc",
  });

  return (
    <div className="min-h-screen">
      {/* Featured Tutors Hero Section */}
      <FeaturedTutorsHero />

      {/* Divider */}
      <div className="container mx-auto px-4 md:px-6">
        <hr className="border-border" />
      </div>

      {/* All Tutors with Search and Pagination */}
      <TutorsList initialTutors={allTutors} />
    </div>
  );
}