export interface DTO {
  email: string;
  password: string;
}

export interface Response {
  data: Data;
  status: number;
  message: string;
}

export interface Data {
  signedAccessToken: string;
  signedRefreshToken: string;
  account: Account;
}

export interface Account {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  user_code: string;
  account_type: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  admin: Admin;
}

export interface Admin {
  id: number;
  is_super_admin: boolean;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  account_id: number;
  group_id: number;
}
