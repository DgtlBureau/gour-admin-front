export interface SignupWithoutPasswordDto {
  name: string;
  lastName: string;
  email: string;
  role: 'admin' | 'moderator';
}
