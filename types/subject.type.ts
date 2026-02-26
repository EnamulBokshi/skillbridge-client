export interface ISubject{
    name: string;
    creditHours: number;
    categoryId: string;
    slug: string;
    description: string;
    isActive?: boolean;
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

export interface SubjectWithCategory {
  id: string;
  name: string;
  creditHours: number;
  slug: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  category: {
    id: string;
    name: string;
  };
}