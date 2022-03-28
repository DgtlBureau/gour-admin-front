export type ClientCreateDto = Readonly<{
  apiUserUuid: string;
  role: number;
  additionalInfo: Record<string, string | number>;
}>;
