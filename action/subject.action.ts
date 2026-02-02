"use server"

import subjectService from "@/services/subject.service";
import { ISubject } from "@/types/subject.type";
import { updateTag } from "next/cache";

export async function createSubjectAction(data: ISubject){
    const result =  await subjectService.createSubject(data);
    updateTag('subjects');
    return result;
}

export async function getSubjectsAction(){
    return await subjectService.getSubjects();
}