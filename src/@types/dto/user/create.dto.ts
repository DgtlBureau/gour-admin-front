export type UserCreateDto = Readonly<{
  role: number;
  email: string;
  additionalInfo?: Record<string, string | number>;
}>;
