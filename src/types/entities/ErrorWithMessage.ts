export type ErrorWithMessage = {
  message: string;
};

export type ErrorWithDataMessage = {
  data: { message: string };
};

export type ErrorData = Record<string, unknown>;
