export interface SignupUserDto {
  name: string;
  surname: string;
  email: string;
  role: 'admin' | 'moderator';
}
