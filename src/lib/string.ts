import { MULTIPARAMS_SEPARATOR, SLASH_REPLACE } from "./constants";

export function substring(str: string, n: number) {
  if (str.length < n) return str;
  return str.substring(0, n) + "...";
}

export function argsToMultiparams(...args: string[]) {
  return args
    .map((arg) => arg.replaceAll("/", SLASH_REPLACE))
    .join(MULTIPARAMS_SEPARATOR);
}

export function extractsArgs(str: string) {
  return str.replaceAll(SLASH_REPLACE, "/").split(MULTIPARAMS_SEPARATOR);
}
