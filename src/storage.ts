export class Storage {
    static get(key: string): string | null {
        return localStorage.getItem(key);
    }

    static set(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    static clear(): void {
        localStorage.clear();
    }

    static remove(key: string): void {
        localStorage.removeItem(key);
    }
}