let myLibrary = [];

function Book(title, author, pages, read, cover) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.cover = cover || null;

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

    const coverField = createLabeledInput({
        labelText: "Cover", type: "file", name: "cover", id: "cover"
    });
    coverField.input.accept = "image/*";

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
        coverField.wrapper,
        actions
    );

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = titleField.input.value.trim();
        const author = authorField.input.value.trim();
        const pages = Number(pagesField.input.value);
        const read = readInput.checked;

        const file = coverField.input.files[0];

        const finalize = (coverDataURL) => {
            const book = new Book(title, author, pages, read, coverDataURL);
            addBookToLibrary(book);
            form.remove();
        };

        if (file) {
            const reader = new FileReader();
            reader.onload = () => finalize(reader.result);
            reader.readAsDataURL(file);
        } else {
            finalize(null);
        }
    });

    const aside = document.querySelector("aside");
    aside.appendChild(form);
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    renderLibrary();
}

function deleteBook(id) {
    myLibrary = myLibrary.filter(bk => bk.id !== id);
}

function renderLibrary() {
    const main = document.querySelector("main");
    main.innerHTML = "";

    myLibrary.forEach((bk) => {
        const card = document.createElement("article");
        card.className = "book-card";

        if (bk.cover) {
            const img = document.createElement("img");
            img.src = bk.cover;
            img.alt = `${bk.title} cover`;
            img.className = "book-cover";
            card.appendChild(img);
        }

        const contentCard = document.createElement("div");
        contentCard.className = "content-card";

        const h3 = document.createElement("h3");
        h3.textContent = bk.title;

        const pAuthor = document.createElement("p");
        const strongAuthor = document.createElement("strong");
        strongAuthor.textContent = "Author:";
        pAuthor.appendChild(strongAuthor);
        pAuthor.append(" " + bk.author);

        const pPages = document.createElement("p");
        const strongPages = document.createElement("strong");
        strongPages.textContent = "Pages:";
        pPages.appendChild(strongPages);
        pPages.append(" " + bk.pages);

        const pStatus = document.createElement("p");
        pStatus.className = "read-status";
        pStatus.textContent = bk.read ? "Read ✅" : "Not read ❌";

        const toggleBtn = document.createElement("button");
        toggleBtn.type = "button";
        toggleBtn.className = "toggle-read";
        toggleBtn.textContent = bk.read ? "Mark as unread" : "Mark as read";

        toggleBtn.addEventListener("click", () => {
            bk.read = !bk.read;
            renderLibrary();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "delete-book";
        deleteBtn.textContent = "Delete book";

        deleteBtn.addEventListener("click", () => {
            deleteBook(bk.id);
            renderLibrary();
        });

        contentCard.append(h3, pAuthor, pPages, pStatus, toggleBtn, deleteBtn);
        card.appendChild(contentCard);
        main.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".new-book");
    btn.addEventListener("click", createNewBookForm);
});
