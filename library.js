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

function createNewBookForm() {
    const existing = document.querySelector("#book-form");
    if (existing) { existing.remove(); return; }

    const form = document.createElement("form");
    form.id = "book-form";
    form.className = "book-form";

    const titleField = createLabeledInput({
        labelText: "Title", type: "text", name: "title", id: "title", required: true
    });

    const authorField = createLabeledInput({
        labelText: "Author", type: "text", name: "author", id: "author", required: true
    });

    const pagesField = createLabeledInput({
        labelText: "Pages", type: "number", name: "pages", id: "pages", required: true, min: 1
    });

    const readWrapper = document.createElement("div");
    readWrapper.className = "field checkbox";
    const readLabel = document.createElement("label");
    readLabel.setAttribute("for", "read");
    readLabel.textContent = "Read";
    const readInput = document.createElement("input");
    readInput.type = "checkbox";
    readInput.name = "read";
    readInput.id = "read";
    readWrapper.append(readInput, readLabel);

    const actions = document.createElement("div");
    actions.className = "actions";
    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "Add";
    const cancelBtn = document.createElement("button");
    cancelBtn.type = "button";
    cancelBtn.textContent = "Cancel";
    cancelBtn.addEventListener("click", () => form.remove());
    actions.append(submitBtn, cancelBtn);

    form.append(
        titleField.wrapper,
        authorField.wrapper,
        pagesField.wrapper,
        readWrapper,
        actions
    );

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = titleField.input.value.trim();
        const author = authorField.input.value.trim();
        const pages = Number(pagesField.input.value);
        const read = readInput.checked;

        const book = new Book(title, author, pages, read);
        addBookToLibrary(book);
        form.remove();
    });

    const aside = document.querySelector("aside");
    aside.appendChild(form);
}

