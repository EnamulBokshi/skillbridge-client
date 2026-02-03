"use server";
import { studentService } from "@/services/student.service copy";
import { IReview, ServerResponse } from "@/types";
import { StudentRegistration } from "@/types/user.type";

const createStudentAction = async (studentData: StudentRegistration) => {
    return await studentService.createStudent(studentData);
}
const  getStudentProfileAction = async (studentId: string) => {
    return await studentService.getStudentProfile(studentId);
}

const updateStudentProfileAction = async ( studentId: string, studentData: Partial<StudentRegistration>) => {
    return await studentService.updateStudentProfile(studentId, studentData);
}

const deleteStudentProfileAction = async (studentId: string) => {
    return await studentService.deleteStudentProfile(studentId);
}

const getStudentUpcomingsAction = async (studentId: string) => {
    return await studentService.getUpcomingSessions(studentId);
}

const getStudentCompletedSessionsAction = async (studentId: string) => {
    return await studentService.getCompletedSessions(studentId);
}
const getStudentStatsAction = async (studentId: string):Promise<ServerResponse> => {
    return await studentService.getStudentStats(studentId);
}

const createReviewAction = async ( reviewData: IReview) => {
    return await studentService.createReview(reviewData);
}

export { createStudentAction, getStudentProfileAction, updateStudentProfileAction, deleteStudentProfileAction, getStudentUpcomingsAction, getStudentCompletedSessionsAction, getStudentStatsAction, createReviewAction };