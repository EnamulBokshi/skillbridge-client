# User Profile Management Pattern

## Overview
This document explains how user profiles (tutor, student) are managed across the SkillBridge platform using React Context and server actions instead of localStorage.

## Problem with Previous Approach
- ❌ **localStorage is device-specific**: Different browsers/devices won't have access to stored data
- ❌ **localStorage can't be used in server components**: Throws "localStorage is not defined" errors
- ❌ **Manual persistence**: Required manually setting and updating localStorage in multiple places
- ❌ **No automatic cleanup**: Data wasn't cleared on logout

## New Solution: UserProvider Context

### Architecture
```
Root Layout (app/layout.tsx)
    ↓
UserProvider (providers/UserProvider.tsx)
    ↓
    - Fetches user session on mount
    - Stores tutorProfile, studentProfile, userId in Context
    - Auto-updates on login/logout
    ↓
Client Components (useUserProfile hook)
    - Access profile data via Context
    - No localStorage needed
    - Responsive to auth state changes
```

### How It Works

#### 1. **UserProvider Component**
Located at `providers/UserProvider.tsx`

**Responsibilities:**
- Fetches user session on component mount using `getUserSession()` action
- Fetches full user details using `userServices.getUser()`
- Stores tutor and student profiles in Context state
- Automatically clears data when user logs out
- Provides `refreshUserProfile()` function for manual updates

**Features:**
- Single source of truth for user profiles
- Auto-syncs across all client components
- Works across all devices/browsers (data comes from server)
- Cleans up on logout

#### 2. **useUserProfile Hook**
Use this hook in any client component to access user profiles:

```typescript
import { useUserProfile } from "@/providers/UserProvider";

export function MyComponent() {
  const { tutorProfile, studentProfile, userId, isLoading, refreshUserProfile } = useUserProfile();
  
  // tutorProfile: { id, firstName, lastName, bio, ... }
  // studentProfile: { id, firstName, lastName, ... }
  // userId: current logged-in user ID
  // isLoading: true while fetching initial data
  // refreshUserProfile: async function to re-fetch latest data
}
```

### Usage Patterns

#### ✅ **In Client Components (Recommended)**
```typescript
"use client";
import { useUserProfile } from "@/providers/UserProvider";

export function CreateSlotForm() {
  const { tutorProfile } = useUserProfile();
  
  const handleSubmit = async (formData) => {
    // Use tutorProfile.id instead of localStorage
    const payload = {
      tutorId: tutorProfile.id,  // ✅ Safe - always available
      ...formData
    };
    
    const result = await createSlotAction(payload);
  };
}
```

#### ✅ **After Profile Creation**
When a user completes their profile (tutor/student), refresh the context:

```typescript
const { refreshUserProfile } = useUserProfile();

const handleProfileCreation = async (data) => {
  const result = await createTutorAction(data);
  
  if (result.data) {
    // Refresh the context with the newly created profile
    await refreshUserProfile();
    redirect("/dashboard");
  }
};
```

#### ✅ **Conditional Rendering Based on Profile**
```typescript
const { tutorProfile, isLoading } = useUserProfile();

if (isLoading) {
  return <Loading />;
}

if (!tutorProfile) {
  return <div>Please complete your tutor profile</div>;
}

return <SlotManagement tutorId={tutorProfile.id} />;
```

#### ❌ **AVOID: localStorage in server components**
```typescript
// ❌ DON'T DO THIS in server components
export default async function Page() {
  localStorage.setItem("tutor", "..."); // ❌ Error: localStorage not defined
}
```

#### ❌ **AVOID: localStorage in client components**
```typescript
// ❌ DON'T DO THIS - use context instead
"use client";
export function Form() {
  const tutor = localStorage.getItem("tutor"); // ❌ Breaks on new devices
  const tutorId = tutor ? JSON.parse(tutor).id : null;
}
```

## Migration Checklist

If you're updating existing code to use this pattern:

- [ ] Remove `localStorage.getItem("tutor")` / `localStorage.getItem("student")`
- [ ] Remove `localStorage.setItem("tutor", ...)` / `localStorage.setItem("student", ...)`
- [ ] Import `useUserProfile` hook in affected client components
- [ ] Replace localStorage access with context values
- [ ] Call `refreshUserProfile()` after profile creation/updates
- [ ] Test across different devices/browsers

## Files Modified

### Updated Files:
1. **app/layout.tsx** - Added UserProvider wrapper
2. **providers/UserProvider.tsx** - Created new Context/Provider
3. **components/modules/slot/CreateSlotForm.tsx** - Uses context instead of localStorage
4. **components/modules/slot/TutorSlotList.tsx** - Uses context instead of localStorage
5. **app/(dashboardLayout)/dashboard/tutor/slots/page.tsx** - Removed localStorage
6. **components/modules/authentication/TutorProfile-form.tsx** - Calls refreshUserProfile

## Benefits

✅ **Works across devices** - Data comes from server, not device storage
✅ **Automatic cleanup** - Data cleared on logout
✅ **Server-side compatible** - Can use in layouts and async components
✅ **Reactive updates** - All components auto-update when profile changes
✅ **Type-safe** - Full TypeScript support
✅ **No manual management** - Provider handles initialization
✅ **Performance** - Single fetch per mount, cached in Context

## Troubleshooting

### Error: "useUserProfile must be used within a UserProvider"
**Cause:** Component using the hook is not wrapped by UserProvider
**Solution:** Make sure component is inside the Root Layout (which includes UserProvider)

### Profile data not updating after creation
**Solution:** Call `refreshUserProfile()` after successful creation:
```typescript
const { refreshUserProfile } = useUserProfile();
await createProfileAction(data);
await refreshUserProfile(); // Re-fetch latest data
```

### Data showing as null
**Cause:** Either user is logged out or still loading
**Solution:** Check `isLoading` state and handle null values:
```typescript
if (isLoading) return <Loading />;
if (!tutorProfile) return <div>No profile found</div>;
```

## Future Enhancements

- Add profile caching with SWR/React Query for better performance
- Add profile update notifications using WebSocket
- Add role-based automatic provider behavior
- Add profile versioning for change tracking
