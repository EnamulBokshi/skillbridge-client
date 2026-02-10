import { USER_ROLES } from "@/constants";

export interface StudentRegistration{
    firstName?: string;
    lastName?: string;
    phone  ?: string;
    address? : string;
    email?: string;
    zip?: string 
}

export interface TutorRegistration{
    firstName: string;
    lastName: string;
    bio: string;
    categoryId: string;
    phone  ?: string;
    address? : string;
    email?: string;
    zip?: string 
    profilePicture?: string;
    experienceYears: number;
    cv?: string;
    expertiseAreas: string[];
}

export interface IUser {
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    createdAt: string | Date;
    updatedAt: string | Date;
    role: USER_ROLES;
    status: 'ACTIVE' | 'INACTIVE' | 'BANNED';
    isAssociate: boolean;
    id: string;
    student?: {id:string; name: string} ;
    tutor?: {id:string; name: string} ;
}

export interface IUserProps{
    name: string;
    email: string;
    avatar?: string | undefined| null;
    role: USER_ROLES;
}

