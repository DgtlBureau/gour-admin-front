import {
  ErrorWithMessage,
  ErrorWithDataMessage,
} from '../@types/entities/ErrorWithMessage';

export function checkErrorMessage(error: unknown): error is ErrorWithMessage {
  const isObject = typeof error === 'object';
  const isNull = error === null;

  const withMessage = isObject && !isNull && 'message' in error;
  const isStringMessage = typeof (error as Record<string, unknown>).message === 'string';

  const withStringMessage = withMessage && isStringMessage;

  return withStringMessage;
}

export function checkErrorDataMessage(error: unknown): error is ErrorWithDataMessage {
  const isObject = typeof error === 'object';
  const isNull = error === null;

  const withDataMessage =
    isObject && !isNull && 'message' in (error as ErrorWithDataMessage).data;
  const isStringDataMessage =
    typeof (error as { data: Record<string, unknown> }).data.message === 'string';

  const withStringDataMessage = withDataMessage && isStringDataMessage;

  return withStringDataMessage;
}

export function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  const isErrorWithMessage = checkErrorMessage(maybeError);

  if (isErrorWithMessage) return maybeError;

  const isErrorWithDataMessage = checkErrorDataMessage(maybeError);

  if (isErrorWithDataMessage) return maybeError.data;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    return new Error(String(maybeError));
  }
}

export function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}
