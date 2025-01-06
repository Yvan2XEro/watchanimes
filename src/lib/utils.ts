import { addWeeks, formatDistanceToNow } from "date-fns";
import { Share } from "react-native";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
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


export function shareAnime(url: string) {
  Share.share({
    url: url,
    title: "I just found this amazing anime, try it too!",
    message: url
  })
}

export function shareIpisode(url: string) {
  Share.share({
    url: url,
    title: "I just found this amazing anime, try it too!",
    message: url
  })
}

export function shadowStyle(shadowColor = "#000", elevation = 3) {
  return {
    shadowColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.62,
    elevation,
  };
}