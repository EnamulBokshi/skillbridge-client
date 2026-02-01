export interface ISubject{
    name: string;
    creditHours: number;
    categoryId: string;
    slug: string;
    description: string;
}

export interface OSubject {
    id :string;
    name: string;
    creditHours: number;
    categoryId: string;
    slug: string;
    description: string;
    isActive: boolean;
}