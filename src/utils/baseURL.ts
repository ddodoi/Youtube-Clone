export const baseURL = (path: string): string => {
    const base = import.meta.env.VITE_SERVER_URL || 'http://localhost:5173';
    return `${base}${path}`;
};