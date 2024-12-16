export const baseURL = (path: string) => {
    return new URL(path, import.meta.env.VITE_SERVER_URL).toString();
};
