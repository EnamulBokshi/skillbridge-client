"use server";
import { studentService } from "@/services/student.service";
import { ServerResponse } from "@/types";
import { StudentRegistration } from "@/types/user.type";

const createStudentAction = async (studentData: StudentRegistration) => {
    return await studentService.createStudent(studentData);
}

export { createStudentAction };