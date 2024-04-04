import { formatDistanceToNow, addWeeks, format } from "date-fns";

export const debounce = <F extends (...args: any[]) => any>(
  fn: F,
  delay: number
) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  } as F;
};

export function formatDate(date: Date) {
  if (new Date(addWeeks(new Date(), 1)) < date) {
    return new Date(date).toLocaleString();
  }

  return formatDistanceToNow(new Date(date), {
    includeSeconds: false,
  });
}
