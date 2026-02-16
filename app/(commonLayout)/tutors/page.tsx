import { getTutorsAction } from "@/action/tutor.action";
import FeaturedTutorsHero from "@/components/modules/tutors/FeaturedTutorsHero";
import TutorFilterController from "@/components/modules/tutors/TutorFilterController";
import TutorsList from "@/components/modules/tutors/TutorsList";
import { PaginationController } from "@/components/ui/pagination-controller";
import { SlotSearchParams } from "@/types/slot.type";
import { GetTutorsParams } from "@/types/tutor.type";
import { SearchParams } from "next/dist/server/request/search-params";

type TutorsPageProps = {
  searchParams: Promise<
 GetTutorsParams
  >;
}

export default async function TutorsPage({searchParams}: TutorsPageProps) {
  // Fetch featured tutors
  // const { data: featuredTutors } = await getTutorsAction({
  //   isFeatured: true,
  //   page: 1,
  //   limit: 6,
  //   sortBy: "avgRating",
  //   orderBy: "desc",
  // });

  const params = await searchParams;
  console.log("Received search params in TutorsPage:", params);
  // Fetch all tutors for initial list
  const searchParamsObj: GetTutorsParams = {};
  if (params.search) {
    searchParamsObj.search = params.search;
  }
  if (params.subjectId) {
    searchParamsObj.subjectId = params.subjectId;
  }
 

  const { data: allTutors } = await getTutorsAction(searchParamsObj);
  const tutorsList = allTutors?.data || [];
  const pagination = allTutors?.pagination || {};
  return (
    <div className="min-h-screen">
      {/* Featured Tutors Hero Section */}
      <FeaturedTutorsHero />

      {/* Divider */}
      <div className="container mx-auto px-4 md:px-6">
        <hr className="border-border" />
      </div>

      {/* All Tutors with Search and Pagination */}
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="">
          <h2 className="text-2xl font-semibold mb-4">Find Your Perfect Tutor</h2>
          <TutorFilterController />
        </div>
      <TutorsList initialTutors={allTutors} />
      <div >

      <PaginationController  pagination={pagination}/>
      </div>
      </div>
    </div>
  );
}