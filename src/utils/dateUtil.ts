import { format } from 'date-fns';

type FormatOptions = Parameters<typeof format>[2];
export function formatDate(date: Date, dateFormat?: string, options?: FormatOptions) {
  return format(date, dateFormat || 'dd.MM.yyyy', options);
}
