import { String, Record, Static } from 'runtypes';

export const RuntimeTokens = Record({
  token: String,
  refreshToken: String,
});

export type Tokens = Readonly<Static<typeof RuntimeTokens>>;
