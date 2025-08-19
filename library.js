const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.isRead = () => (this.read ? "is read" : "is not read");
    this.bookInfo = () =>
        `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead()}.`;
}

function createLabeledInput({ labelText, type, name, id, required = false, min }) {
    const wrapper = document.createElement("div");
    wrapper.className = "field";

    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.textContent = labelText;

    const input = document.createElement("input");
    input.type = type;
    input.name = name;
    input.id = id;
    if (required) input.required = true;
    if (min !== undefined) input.min = min;

    wrapper.append(label, input);
    return { wrapper, input };
}
