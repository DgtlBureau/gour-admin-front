import { Runtype } from 'runtypes';

export type RuntimeType = Runtype;

export function checkRuntimeType<T extends Runtype, D>(data: D, runtimeType: T) {
  return runtimeType.guard(data);
}
