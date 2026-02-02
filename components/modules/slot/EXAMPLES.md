// Example usage file - NOT for production, just for reference

/* ============================================
   EXAMPLE 1: Admin Dashboard - Server Component
   ============================================ */

// app/dashboard/admin/slots/page.tsx
import { getSlotsAction } from "@/action/slot.action";
import { getUserSession } from "@/action/user.action";
import { SlotList } from "@/components/modules/slot";

export default async function AdminSlotsPage() {
  const result = await getSlotsAction({ page: "1", limit: "10" });

  if (!result.data) {
    return <div>Error loading slots</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Manage All Slots</h1>
        <p className="text-muted-foreground">
          View and manage all tutoring slots
        </p>
      </div>

      <SlotList
        initialSlots={result.data.data}
        initialPagination={result.data.pagination}
        editable={true}
        showTutorFilter={true}
      />
    </div>
  );
}

/* ============================================
   EXAMPLE 2: Admin Dashboard - Client Component (Simpler)
   ============================================ */

// app/dashboard/admin/slots/page.tsx
import { AdminSlotList } from "@/components/modules/slot";

export default function AdminSlotsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Manage All Slots</h1>
        <p className="text-muted-foreground">
          View and manage all tutoring slots
        </p>
      </div>

      <AdminSlotList />
    </div>
  );
}

/* ============================================
   EXAMPLE 3: Tutor Dashboard
   ============================================ */

// app/dashboard/tutor/slots/page.tsx
import { TutorSlotList } from "@/components/modules/slot";

export default async function TutorSlotsPage() {
  const {data,error} = await getUserSession();
//   const tutorId = data.user; // Get tutor ID from session
const tutor = localStorage.getItem('tutor'); // Temporary workaround
const tutorId = tutor ? JSON.parse(tutor).id : null;

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Slots</h1>
        <p className="text-muted-foreground">Manage your tutoring slots</p>
      </div>

      <TutorSlotList tutorId={tutorId} />
    </div>
  );
}

/* ============================================
   EXAMPLE 4: Public Home Page
   ============================================ */

// app/(commonLayout)/page.tsx or app/slots/page.tsx
import { PublicSlotList } from "@/components/modules/slot";

export default function HomePage() {
  return (
    <div>
      {/* Hero section, etc. */}
      
      <section className="py-12">
        <PublicSlotList />
      </section>
    </div>
  );
}

/* ============================================
   EXAMPLE 5: With Initial Server-Side Data (Hybrid)
   ============================================ */

// app/dashboard/admin/slots/page.tsx

export default async function AdminSlotsPage() {
  // Pre-fetch data on server for better initial load
  const result = await getSlotsAction({ page: "1", limit: "10" });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Manage All Slots</h1>

      <AdminSlotList
        initialData={
          result.data
            ? {
                slots: result.data.data,
                pagination: result.data.pagination,
              }
            : undefined
        }
      />
    </div>
  );
}
