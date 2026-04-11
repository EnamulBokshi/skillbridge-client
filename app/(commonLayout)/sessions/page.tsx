import { getSlotsAction } from '@/action/slot.action';
import SlotHistory from '@/components/layout/SlotHistory';
import SessionsHeroSearch from '@/components/modules/slot/SessionsHeroSearch';
import FilterController from '@/components/ui/filter-controller';
import { PaginationController } from '@/components/ui/pagination-controller';
import { SlotSearchParams } from '@/types/slot.type';

export default async function Session({searchParams}: {searchParams:Promise<SlotSearchParams>}) {
  const {
    tutorId,
    page,
    limit,
    search,
    isFeatured,
    isFree,
    subjectId,
    date,
    sortBy,
    orderBy,
  } = await searchParams;

  const parseBoolean = (value?: string | boolean) => {
    if (typeof value === 'boolean') return value;
    if (value === 'true') return true;
    if (value === 'false') return false;
    return undefined;
  };

  const Params: SlotSearchParams = { }
  Params.isBookable = true;
  if(tutorId) Params.tutorId = tutorId;
  if(subjectId) Params.subjectId = subjectId;
  if(page) Params.page = page;
  if(limit) Params.limit = limit;
  if(search) Params.search = search;
  if(date) Params.date = date;
  if(sortBy) Params.sortBy = sortBy;
  if(orderBy) Params.orderBy = orderBy;

  const parsedIsFeatured = parseBoolean(isFeatured);
  if(parsedIsFeatured !== undefined) Params.isFeatured = parsedIsFeatured;

  const parsedIsFree = parseBoolean(isFree);
  if(parsedIsFree !== undefined) Params.isFree = parsedIsFree;

  const {data,error,message} = await getSlotsAction(Params);

  const pagination = data ? data.pagination : {
    page: 1,
    limit: 10,
    totalPages: 1,
    totalRecords: 0,
  };
  // console.log({pagination});
  return (
    <div className="min-h-screen">
      <SessionsHeroSearch />

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-6">
        <FilterController />
        <SlotHistory data={data?.data || []}/>
        <PaginationController pagination={pagination}/>
        </div>
      </section>
    </div>
  )
}
