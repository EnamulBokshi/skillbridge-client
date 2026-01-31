'use server'

import { tutorService } from "@/services/tutor.service";
import { TutorRegistration } from "@/types/user.type";

const createTutorAction = async (tutorData: TutorRegistration) => {
  return await tutorService.createTutor(tutorData);
};

export { createTutorAction };