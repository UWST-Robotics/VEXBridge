export default async function fetchAPIEndpoint<T>(path: string) {
    const response = await fetch(path);
    if (!response.ok) {
        console.warn(`Failed to fetch API endpoint: ${path}`);
        return null;
    }
    return (await response.json()) as T;
}