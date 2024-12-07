import {
  MULTIPARAMS_SEPARATOR,
  SLASH_REPLACE,
  SPACE_SERPARATOR,
} from "./constants";

export function substring(str: string, n: number) {
  if (!str || str.length < n) return str;
  return str.substring(0, n) + "...";
}

export function argsToMultiparams(...args: string[]) {
  return args
    .map((arg) =>
      arg?.replaceAll("/", SLASH_REPLACE).replaceAll(" ", SPACE_SERPARATOR)
    )
    .join(MULTIPARAMS_SEPARATOR);
}

export function extractsArgs(str: string) {
  return str
    .replaceAll(SLASH_REPLACE, "/")
    .replaceAll(SPACE_SERPARATOR, " ")
    .split(MULTIPARAMS_SEPARATOR);
}

export function transformOtherNames(str: string) {
  if (!str) return str;
  return str.replaceAll("\n", "").replaceAll(" ", "").replaceAll("Status:", "");
}
