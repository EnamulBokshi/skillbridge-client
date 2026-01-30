"use server";
import { studentService } from "@/services/student.service";
import { StudentRegistration } from "@/types/user.type";

const createStudentAction = async (studentData: StudentRegistration) => {
    return await studentService.createStudent(studentData);
}

export { createStudentAction };