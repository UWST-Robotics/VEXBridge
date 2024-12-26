const MAX_RETRIES = 3;

/**
 * Fetches an API endpoint and returns the JSON response.
 * Continues to retry the request until it succeeds or the maximum number of retries is reached.
 * @param path - The path to the API endpoint
 */
export default async function fetchAPIEndpoint<T>(path: string) {
    for (let i = 0; i < MAX_RETRIES; i++) {
        try {
            return await fetchAPIEndpointOnce<T>(path);
        } catch (e) {
            if (i === MAX_RETRIES - 1)
                throw e;
        }
    }

    throw new Error("MAX_RETRIES is less than 1");
}

/**
 * Fetches an API endpoint and returns the JSON response.
 * @param path - The path to the API endpoint
 */
export async function fetchAPIEndpointOnce<T>(path: string) {
    const response = await fetch(`/api/v1/${path}`);
    if (!response.ok)
        throw new Error(`Failed to fetch ${path}: ${response.statusText}`);
    return (await response.json()) as T;
}