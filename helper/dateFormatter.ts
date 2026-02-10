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
