export default async function fetchAPIEndpoint<T>(path: string) {
    const response = await fetch(path);
    if (!response.ok)
        throw new Error(`Failed to fetch API endpoint: ${response.statusText}`);
    return response.json() as T;
}