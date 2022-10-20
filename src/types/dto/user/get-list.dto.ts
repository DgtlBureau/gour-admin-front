export type UserGetListDto = Readonly<{
  filter?: {
    isApproved: boolean;
  };
}>;
