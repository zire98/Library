const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.isRead = () => {
        if (this.read == true) {
            return "is read";
        } else {
            return "is not read";
        }
    }

    this.bookInfo = () => {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead()}.`;
    }
}

function addBookToLibrary(myLibrary) {

}