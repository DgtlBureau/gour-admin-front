import {
  Number, String, Record, Static,
} from 'runtypes';

export const RuntimeUser = Record({
  id: Number,
  name: String,
  lastName: String,
  email: String,
  phone: Number,
});

export type User = Static<typeof RuntimeUser>;
