export class Validation {
    static validateBook(title: string, author: string, year: string): { [key: string]: string } {
        const errors: { [key: string]: string } = {};

        // Перевірка назви книги
        console.log("Перевірка назви книги:", title);
        if (!title.trim()) {
            errors['bookTitle'] = 'Назва книги не може бути пустою';
        }

        // Перевірка автора
        console.log("Перевірка автора:", author);
        if (!author.trim()) {
            errors['bookAuthor'] = 'Автор не може бути пустим';
        }

        // Перевірка року (від 0 до 2024)
        console.log("Перевірка року:", year);
        if (!year.trim()) {
            errors['bookYear'] = 'Рік видання не може бути порожнім';
        } else {
            const numericYear = parseInt(year.trim(), 10);
            console.log("Перетворений рік:", numericYear);
            if (isNaN(numericYear)) {
                errors['bookYear'] = 'Рік видання повинен бути числом';
            } else if (numericYear < 0 || numericYear > 2024) {
                errors['bookYear'] = 'Рік видання повинен бути між 0 та 2024';
            }
        }

        console.log("Errors після валідації:", errors);
        return errors;
    }

    static validateUser(name: string, email: string): { [key: string]: string } {
        const errors: { [key: string]: string } = {};

        if (!name.trim()) {
            errors['userName'] = 'Ім\'я не може бути пустим';
        }

        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors['userEmail'] = 'Email не є дійсним';
        }

        return errors;
    }

    static displayErrors(errors: { [key: string]: string }): void {
        // Очищення попередніх помилок
        document.querySelectorAll('.form-control').forEach(input => {
            input.classList.remove('border', 'border-danger');
        });
        document.querySelectorAll('.text-danger').forEach(el => {
            el.remove(); // Очищаємо текст помилок, видаляючи елементи
        });

        // Виведення нових помилок
        Object.keys(errors).forEach(key => {
            const field = document.getElementById(key) as HTMLInputElement;
            if (field) {
                field.classList.add('border', 'border-danger');
                const errorElement = document.createElement('div');
                errorElement.classList.add('text-danger');
                errorElement.textContent = errors[key];
                field.parentElement?.appendChild(errorElement);
            }
        });
    }
}
