import { IBook, IUser, Book, User } from './models';
import { Storage } from './storage';

export class Library<T extends IBook | IUser> {
    private items: T[] = [];
    private static idKey = 'nextId';
    private nextId: number = 1;

    constructor(private storageKey: string) {
        this.loadFromStorage();
    }

    private loadFromStorage(): void {
        const data = Storage.get(this.storageKey);
        if (data) {
            this.items = JSON.parse(data);
        }
        const nextId = Storage.get(Library.idKey);
        if (nextId) {
            this.nextId = parseInt(nextId, 10);
        }
    }

    private saveToStorage(): void {
        Storage.set(this.storageKey, JSON.stringify(this.items));
        Storage.set(Library.idKey, this.nextId.toString());
    }

    private generateId(): string {
        return (this.nextId++).toString();
    }

    add(item: T): string {
        const id = this.generateId();
        (item as any).id = id; // Додаємо ID до елемента
        this.items.push(item);
        this.saveToStorage(); // Зберігаємо дані в локальному сховищі
        return id; // Повертаємо ID
    }

    remove(id: string): void {
        this.items = this.items.filter(item => item.id !== id);
        this.saveToStorage(); // Оновлюємо дані в локальному сховищі
    }

    getAll(): T[] {
        return this.items; // Повертаємо всі елементи
    }

    findById(id: string): T | undefined {
        return this.items.find(item => item.id === id); // Знаходимо елемент за ID
    }

    update(item: T): void {
        const index = this.items.findIndex(i => i.id === item.id);
        if (index !== -1) {
            this.items[index] = item; // Оновлюємо елемент
            this.saveToStorage(); // Оновлюємо дані в локальному сховищі
        }
    }
}
