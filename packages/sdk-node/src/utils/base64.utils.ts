/**
 * Converts a URL-safe base64 string to a hex string
 *
 * @param b64 URL-safe base64 string
 */
export function base64UrlToHex(b64: string) {
    const hex = Buffer.from(b64, 'base64url').toString('hex');
    return hex;
}

/**
 * Converts a standard base64 string to a hex string
 *
 * @param b64 Base64 string
 */
export function base64ToHex(b64: string) {
    const hex = Buffer.from(b64, 'base64').toString('hex');
    return hex;
}

/**
 * Converts a hex string to a URL-safe base64 string
 *
 * @param hex Hex string
 */
export function hexToBase64Url(hex: string) {
    const b64 = Buffer.from(hex, 'hex').toString('base64url');
    return b64;
}

/**
 * Converts a hex string to a standard base64 string
 *
 * @param hex Hex string
 */
export function hexToBase64(hex: string) {
    const b64 = Buffer.from(hex, 'hex').toString('base64');
    return b64;
}

/**
 * Parses a base64 string into an object
 */
export function parseBase64Object<T = Record<string, any>>(b64: string) {
    const json = Buffer.from(b64, 'base64').toString('utf8');
    const obj = JSON.parse(json);
    return obj as T;
}
