export function formatDateTime(dateTime: string) {
    // Create a new Date object
    const date = new Date(dateTime);

    // Get components of the date
    const year = date.getUTCFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getUTCDate();
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    // Format the date string
    return `${month} ${day}, ${year}, ${hours}:${minutes}:${seconds}`;
}