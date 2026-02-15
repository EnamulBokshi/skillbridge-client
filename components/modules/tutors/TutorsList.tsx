"use client";

import { useEffect, useState, useTransition } from "react";
import { getTutorsAction } from "@/action/tutor.action";
import { TutorProfile } from "@/types/tutor.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Star,
  BookOpen,
  GraduationCap,
  Search,
  Loader2,
} from "lucide-react";

interface TutorsListProps {
  initialTutors: any;
}

export default function TutorsList({ initialTutors }: TutorsListProps) {
  const [isPending, startTransition] = useTransition();
  
  // Parse initial tutors
  const initialTutorsList = Array.isArray(initialTutors)
    ? initialTutors
    : initialTutors?.tutors || [];
  
  const [tutors, setTutors] = useState<TutorProfile[]>(initialTutorsList);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
const [pagination, setPagination] = useState({
  page: 1,
  limit: 9,
  totalRecords: initialTutors?.totalRecords || 0,
  totalPages: initialTutors?.totalPages || 0,
});
  const fetchTutors = (page: number, search?: string) => {
    startTransition(async () => {
      const params: any = {
        page,
        limit: 9,
        sortBy: "avgRating",
        orderBy: "desc",
      };
      
      if (search) {
        params.search = search;
      }
      
      const { data } = await getTutorsAction();
      console.log("Fetched Tutors Data from the usetransition hok:", data);
      const tutorsList = Array.isArray(data) ? data : data?.data || [];
      setTutors(tutorsList);
        setPagination(data.pagination);
    });
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchTutors(1, searchInput);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchTutors(page, searchInput || undefined);
  };
  useEffect(()=>{
    fetchTutors(1);
  }, []);
// const [tutorsData, setTutorsData] = useState<TutorProfile[] | null  >(null);
//   const fetchTutors2 = async()=> {
//     const { data } = await getTutorsAction();
//     console.log("Fetched Tutors Data:", data.data);
//     setTutorsData(data.data);
//   }
    // useEffect(() => {
    //   fetchTutors2();
    // }, []);

  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">All Tutors</h2>
          <p className="text-muted-foreground">
            Browse and find the perfect tutor for your learning journey
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="flex gap-2 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, bio, or expertise..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10"
              />
            </div>
            <Button onClick={handleSearch} disabled={isPending}>
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Search
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {isPending && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {/* Tutors Grid */}
        {!isPending && (
          <>
            {tutors && tutors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {tutors.map((tutor) => (
                  <Link key={tutor.id} href={`/tutors/${tutor.id}`}>
                    <Card className="hover:shadow-lg transition-all duration-300 h-full cursor-pointer">
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-4">
                        <Avatar size="lg" className="h-16 w-16">
                          <AvatarImage
                            src={tutor.profilePicture || undefined}
                            alt={`${tutor.firstName} ${tutor.lastName}`}
                          />
                          <AvatarFallback className="text-lg">
                            {tutor.firstName.charAt(0)}
                            {tutor.lastName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-xl mb-1">
                            {tutor.firstName} {tutor.lastName}
                          </CardTitle>
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">
                              {tutor?.avgRating?.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Expertise */}
                      {tutor.expertiseAreas && (
                        <div>
                          <p className="text-sm font-medium mb-1 flex items-center gap-1">
                            <BookOpen className="h-3.5 w-3.5" />
                            Expertise
                          </p>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {tutor.expertiseAreas.join(", ")}
                          </p>
                        </div>
                      )}

                      {/* Bio */}
                      {tutor.bio && (
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {tutor.bio}
                        </p>
                      )}

                      {/* Stats */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {tutor.experienceYears !== null && (
                          <Badge variant="outline" className="gap-1">
                            <GraduationCap className="h-3 w-3" />
                            {tutor.experienceYears}+ years
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No tutors found.
                </p>
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        currentPage > 1 && handlePageChange(currentPage - 1)
                      }
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>

                  {[...Array(pagination.totalPages)].map((_, i) => {
                    const page = i + 1;
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => handlePageChange(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="cursor-pointer"
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </div>
    </section>
  );
}
