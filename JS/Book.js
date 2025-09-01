export default class Book {
    static nextId = 0;

    constructor(title, author, pages, read, cover) {
        this.id = Book.nextId++;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.cover = cover || null;
    }

    isRead() { return this.read ? "is read" : "is not read"; }
    bookInfo() { return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead()}.`; }
}