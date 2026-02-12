export const dateFormatter = (dateString: string) => {
  const date = new Date(dateString);

// / const startTime = new Date(slot?.startTime || 0);
  // const endTime = new Date(slot?.endTime || 0);
  // const slotDate = new Date(slot?.date || 0);
  // const tutorId = slot?.tutorProfile.id;
  // // Calculate duration in hours
  // const minutes = Math.round((durationHours - hours) * 60);
  // const durationText =
  //   hours > 0
  //     ? `${hours}h ${minutes > 0 ? `${minutes}m` : ""}`.trim()
  //     : `${minutes}m`;

  // // Get tutor initials for avatar fallback
  // const tutorInitials = slot?.tutorProfile
  //   ? `${slot.tutorProfile.firstName[0]}${slot.tutorProfile.lastName[0]}`
  //   : "TU";

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const calculateDuration = (startTimeString: string, endTimeString: string) => {
  const startTime = new Date(startTimeString);
  const endTime = new Date(endTimeString);
  const durationMs = endTime.getTime() - startTime.getTime();
  const durationHours = durationMs / (1000 * 60 * 60);
  const hours = Math.floor(durationHours);
  const minutes = Math.round((durationHours - hours) * 60);
  const durationText =
    hours > 0
      ? `${hours}h ${minutes > 0 ? `${minutes}m` : ""}`.trim()
      : `${minutes}m`;
  return durationText;
}



export function formatDateForInput(isoString?: string): string {
  if (!isoString) return "";
  try {
    // Handle ISO date-time string: "2026-02-03T00:00:00.000Z"
    const date = new Date(isoString);
    return date.toISOString().split("T")[0]; // Returns "2026-02-03"
  } catch {
    return "";
  }
}

export function formatTimeForInput(isoString?: string): string {
  if (!isoString) return "";
  try {
    // Handle ISO date-time string: "2026-02-03T14:30:00.000Z"
    const date = new Date(isoString);
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`; // Returns "14:30"
  } catch {
    return "";
  }
}

export function convertToISODateTime(date: string, time: string): string {
  if (!date || !time) return "";
  try {
    // Combine date (yyyy-MM-dd) and time (HH:mm) into ISO string
    const isoString = `${date}T${time}:00.000Z`;
    // Validate it's a valid date
    new Date(isoString);
    return isoString;
  } catch {
    return "";
  }
}