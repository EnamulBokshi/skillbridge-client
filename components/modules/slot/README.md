# Slot Components Documentation

## Overview
A comprehensive, modern slot management system with filtering, pagination, and role-based displays.

## Components

### 1. **SlotCard**
Displays individual slot information in a card format.

**Props:**
- `slot: ISlotResponse` - The slot data
- `editable?: boolean` - Show edit/delete buttons (default: false)
- `onEdit?: (slot) => void` - Edit handler
- `onDelete?: (slotId) => void` - Delete handler

**Features:**
- Featured badge for featured slots
- Date and time display with duration calculation
- Price display (FREE badge for free slots)
- Booking status badge
- Edit/Delete buttons (when editable)
- Book Now button (when not editable and available)

### 2. **SlotFilters**
Advanced filtering panel for slots.

**Props:**
- `onFilterChange: (filters) => void` - Filter change handler
- `showTutorFilter?: boolean` - Show tutor ID filter (default: true)
- `initialFilters?: SlotSearchParams` - Initial filter values

**Filters Available:**
- Search
- Date (specific date)
- Date Range (start/end dates)
- Tutor ID (admin only)
- Subject ID
- Featured status
- Free/Paid status
- Sort by (date, price, created date)
- Sort order (asc/desc)
- Items per page

### 3. **SlotList**
Main component that displays slots in a grid with pagination.

**Props:**
- `initialSlots: ISlotResponse[]` - Initial slot data
- `initialPagination: {...}` - Pagination info
- `editable?: boolean` - Enable edit/delete (default: false)
- `showTutorFilter?: boolean` - Show tutor filter (default: true)
- `tutorId?: string` - Lock to specific tutor
- `onFiltersChange?: (filters) => void` - Filter change handler

**Features:**
- Responsive grid layout (1/2/3 columns)
- Pagination with ellipsis
- Delete confirmation dialog
- Empty state
- Stats display

## Context-Specific Wrappers

### 4. **AdminSlotList**
For admin dashboard - view all slots with full editing capabilities.

```tsx
import { AdminSlotList } from "@/components/modules/slot";

export default function AdminSlotsPage() {
  return <AdminSlotList />;
}
```

**Features:**
- Shows ALL slots
- Editable (edit/delete buttons)
- Includes tutor filter
- Auto-fetches data

### 5. **TutorSlotList**
For tutor dashboard - view and manage own slots.

```tsx
import { TutorSlotList } from "@/components/modules/slot";

export default function TutorSlotsPage() {
  const tutorId = getTutorId(); // Get from session/context
  
  return <TutorSlotList tutorId={tutorId} />;
}
```

**Features:**
- Shows only tutor's slots (tutorId locked)
- Editable (edit/delete buttons)
- Hides tutor filter (not needed)
- Auto-fetches data with tutorId

### 6. **PublicSlotList**
For home page - browse available slots.

```tsx
import { PublicSlotList } from "@/components/modules/slot";

export default function HomePage() {
  return <PublicSlotList />;
}
```

**Features:**
- Shows all available slots
- Not editable (only Book Now button)
- Hides tutor filter
- Sorted by date (ascending)
- Larger page size (12 items)

## Usage Examples

### Server Component with SSR
```tsx
// app/dashboard/admin/slots/page.tsx
import { getSlotsAction } from "@/action/slot.action";
import { SlotList } from "@/components/modules/slot";

export default async function AdminSlotsPage() {
  const result = await getSlotsAction({ page: "1", limit: "10" });
  
  if (!result.data) {
    return <div>Error loading slots</div>;
  }

  return (
    <div>
      <h1>Manage Slots</h1>
      <SlotList
        initialSlots={result.data.data}
        initialPagination={result.data.pagination}
        editable={true}
        showTutorFilter={true}
      />
    </div>
  );
}
```

### Client Component with Dynamic Fetching
```tsx
// Just use the wrapper components
import { TutorSlotList } from "@/components/modules/slot";

export default function TutorSlotsPage() {
  return <TutorSlotList tutorId={currentTutorId} />;
}
```

## Data Structure

### ISlotResponse
```typescript
{
  id: string;
  tutorId: string;
  date: string; // ISO date
  startTime: string; // ISO datetime
  endTime: string; // ISO datetime
  subjectId: string;
  slotPrice: number;
  isBooked: boolean;
  isFeatured: boolean;
  isFree: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### SlotSearchParams
```typescript
{
  isFeatured?: boolean;
  isFree?: boolean;
  search?: string;
  page?: string;
  limit?: string;
  tutorId?: string;
  subjectId?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  startDate?: string;
  endDate?: string;
  date?: string;
}
```

## Server Actions Required

### Implement These Actions:

```typescript
// action/slot.action.ts
export const updateSlotAction = async (id: string, payload: IUpdateSlotPayload) => {
  // TODO: Implement
};

export const deleteSlotAction = async (id: string) => {
  // TODO: Implement
};
```

## Styling

All components use Tailwind CSS and shadcn/ui components:
- Card, Badge, Button
- Input, Select, Label
- AlertDialog, Pagination
- Lucide icons

Responsive breakpoints:
- Mobile: 1 column
- Tablet: 2 columns (md:)
- Desktop: 3 columns (lg:)

## TODO

1. Implement `updateSlotAction` server action
2. Implement `deleteSlotAction` server action
3. Create SlotEditDialog component
4. Fetch and display subject names (currently showing IDs)
5. Add tutor information to cards
6. Implement book slot functionality for public view
