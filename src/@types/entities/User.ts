import { String, Record, Static } from 'runtypes';

export const RuntimeUser = Record({
  uuid: String,
  // name: String,
  // lastName: String,
  login: String,
});

export type User = Static<typeof RuntimeUser>;
