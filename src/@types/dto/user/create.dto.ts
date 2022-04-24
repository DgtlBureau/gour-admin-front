export type UserCreateDto = Readonly<{
  apiUserUuid: string;
  role: number;
  additionalInfo: Record<string, string | number>;
}>;
