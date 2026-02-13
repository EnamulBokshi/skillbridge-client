
import { getTutorSlotsAction } from "@/action/tutor.action";
import { getUserSession } from "@/action/user.action";
import { CreateSlotForm } from "@/components/modules/slot/CreateSlotForm";
import SlotTable from "@/components/modules/slot/SlotTable";
import { PaginationController } from "@/components/ui/pagination-controller";
import { userServices } from "@/services/user.service";
import { SlotSearchParams } from "@/types/slot.type";

type SlotProps = {
  params: Promise<SlotSearchParams>;
  
};
export default async function Slots({ searchParams }: {
  searchParams: Promise<SlotSearchParams>
}) {
  const { search, sortBy, orderBy, limit, page, subjectId, isFeatured, isFree } = await searchParams;
  console.log("Received search params:", { search, sortBy, orderBy, limit, page, subjectId, isFeatured, isFree });
  const { data: session } = await getUserSession();
  if (!session || session.user.role !== "TUTOR") {
    return <div>You must be logged in as a tutor to view this page.</div>;
  }
  const user = session.user;
  const userId = user.id;
  const userDetails = await userServices.getUser(userId);
  if (!userDetails.data || !userDetails.data.tutorProfile) {
    return <div>You must have a tutor profile to manage slots.</div>;
  }
  const {
    data: slotsResponse,
    error: slotError,
    message,
  } = await getTutorSlotsAction(userDetails.data.tutorProfile.id, {
    search,
    limit,
    page,
    sortBy,
    orderBy,
    subjectId,
    isFeatured,
    isFree,
  });

  // console.log("Tutor Slots:", slotsResponse);
  // console.log("Slot Fetch Error:", slotError);
  // console.log("Slot Fetch Message:", message);

  const slots = slotsResponse ? slotsResponse.data.flat() : [];
  const pagination = slotsResponse ? slotsResponse.pagination : {
    page: 1,
    limit: 10,
    totalPages: 1,
    totalRecords: 0,
  }
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Your Slots</h2>
      <div>

        <SlotTable
          slots={slots}
          role="TUTOR"
          tutorId={userDetails?.data?.tutorProfile?.id}
          isEditable={true}
        />

        <PaginationController pagination={pagination} />
      </div>
      <CreateSlotForm />
      <div className="py-3"></div>
      {/* <TutorSlotList /> */}
    </div>
  );
}
