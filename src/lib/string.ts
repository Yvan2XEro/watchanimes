export function substring(str: string, n: number) {
    if (str.length < n) return str;
    return str.substring(0, n) + '...';
}