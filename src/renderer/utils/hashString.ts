/**
 * Hashes a string into a number.
 * @param str The string to hash.
 * @returns The hash of the string as a number.
 */
export default function hashString(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
    }
    return (hash >>> 0);
}