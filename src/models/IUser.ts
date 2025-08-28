export default interface IUser {
  id?: number;
  firstname: string;
  lastname: string;
  phone?: string | null;
  email: string;
  email_verified_at?: string | null;
  role: string;
  is_verified?: number;
  is_active?: number;
  created_at?: string;
  updated_at?: string;
}
