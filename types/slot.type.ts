
export interface ISlot {
    id: string;
    tutorId: string;
    date: Date;
    startTime: Date;
    endTime: Date;
    subjectId: string;
    slotPrice: number;
    isBooked: boolean;
    isFeatured: boolean;
    isFree: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICreateSlotPayload {
    tutorId: string;
    date: string; // ISO datetime string
    startTime: string; // ISO datetime string
    endTime: string; // ISO datetime string
    subjectId: string;
    slotPrice: number;
    isBooked: boolean;
    isFeatured?: boolean;
    isFree?: boolean;
}

export interface IUpdateSlotPayload {

    date?: string;
    startTime?: string;
    endTime?: string;
    slotPrice?: number;
    isFeatured?: boolean;
    isFree?: boolean;
    subjectId?: string; 
    
}

export interface ISlotResponse {
    id: string;
    tutorId: string;
    date: string;
    startTime: string;
    endTime: string;
    subjectId: string;
    slotPrice: number;
    isBooked: boolean;
    isFeatured: boolean;
    isFree: boolean;
    createdAt: string;
    updatedAt: string;
    tutorProfile?: {
        id: string;
        firstName: string;
        lastName: string;
        userId: string;
        profilePicture: string;
    };
    subject?: {
        id: string;
        name: string;
        slug: string;
        category: {
            id: string;
            name: string;
            slug: string;
        };
    };
}

export interface SlotSearchParams{
    isBookable?: boolean;
    isFeatured?: boolean;
    isFree?: boolean;
    search?: string;
    page?: string;
    limit?: string;
    tutorId?: string;
    subjectId?: string;
    sortBy?: string;
    orderBy?: 'asc' | 'desc';
    startDate? : string;
    endDate?: string;
    date?: string;

}