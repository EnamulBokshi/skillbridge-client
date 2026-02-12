import { getSlotsAction } from '@/action/slot.action';
import SlotHistory from '@/components/layout/SlotHistory';
import { PublicSlotList } from '@/components/modules/slot'
import FilterController from '@/components/ui/filter-controller';
import { PaginationController } from '@/components/ui/pagination-controller';
import { SlotSearchParams } from '@/types/slot.type';
import React from 'react'

export default async function Session({searchParams}: {searchParams:Promise<SlotSearchParams>}) {
  const {page,limit,search,isFeatured, isFree} = await searchParams;
  const Params: SlotSearchParams = { }
  if(page) Params.page = page;
  if(limit) Params.limit = limit;
  if(search) Params.search = search;
  if(isFeatured !== undefined) Params.isFeatured = isFeatured ? true : false;
  if(isFree !== undefined) Params.isFree = isFree ? true : false;

  const {data,error} = await getSlotsAction(Params);
  // console.log(data.data)
  const pagination = data.pagination;
  // console.log({pagination});
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-primary/10 via-background to-secondary/10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Browse Available{' '}
              <span className="text-primary">Study Sessions</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover and book tutoring sessions with experienced tutors across
              various subjects. Find the perfect session that fits your schedule
              and learning needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">Expert Tutors</p>
                  <p className="text-xs">Verified and experienced</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">Flexible Timing</p>
                  <p className="text-xs">Book sessions anytime</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">Easy Booking</p>
                  <p className="text-xs">Quick & simple process</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sessions List */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        {/* <PublicSlotList /> */}
        <FilterController />
        <SlotHistory data={data.data}/>
        <PaginationController pagination={pagination}/>
      </section>


    </div>
  )
}
