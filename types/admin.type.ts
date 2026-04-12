export interface CreateAdminPayload {
  email: string;
  name: string;
  password: string;
}

export interface UpdateAdminPayload {
  email?: string;
  name?: string;
  status?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminFilterParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: string;
}
