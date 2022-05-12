export interface IUser {
  login: string;
  name: string;
  role: {
    uuid: string,
    key: string
  }
  uuid: string;
  isApproved: boolean;
  createdAt: string;
}
