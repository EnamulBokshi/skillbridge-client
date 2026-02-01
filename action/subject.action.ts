"use server"

import subjectService from "@/services/subject.service";
import { ISubject } from "@/types/subject.type";

export async function createSubjectAction(data: ISubject){
    return await subjectService.createSubject(data);
}