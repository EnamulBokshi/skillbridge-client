"use server"

import subjectService from "@/services/subject.service";
import { ISubject, OSubject } from "@/types/subject.type";
import { updateTag } from "next/cache";

export async function createSubjectAction(data: ISubject){
    const result =  await subjectService.createSubject(data);
    updateTag('subjects');
    return result;
}

export async function getSubjectsAction(){
    return await subjectService.getSubjects();
}

export async function deleteSubjectAction(subjectId: string){
    const result = await subjectService.deleteSubject(subjectId);
    updateTag('subjects');
    return result;
}

export async function updateSubjectAction(subject: OSubject){   
    const result = await subjectService.updateSubject(subject.id, subject);
    updateTag('subjects');
    return result;
}