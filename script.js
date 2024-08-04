class Library {
    books = []
    addBookToLibrary(title,author,pages,read) {
        let book = new Book(title,author,pages,read);
        this.books.push(book);
    }
    changeBookReadStatus(title){
        this.books.forEach(book => {
            if (book.compareBookTitle(title)) {
                book.changeReadStatus();
            };
        })
    }
    removeBook(callbackFn) {
        let index = this.books.findIndex(callbackFn);
        if (index !== -1) {
            array.splice(index, 1);
        }
    }
    improvedRemoveBook(title){
        myLibrary.books.forEach(book => {
        let index = this.books.findIndex(book => book.compareBookTitle(title));
            if (index !== -1) {
            array.splice(index, 1);
            }
        })
    }
    createCard(book){
        return `<div class="card">
                <h3 class="the-title">Title: <span>${book.title}</span></h3>
                <h3 class="the-author">Author: ${book.author}</h3>
                <div class="bottom-container">
                    <input class="read-checkbox-update toggleRead" type="checkbox" ${book.read ? "checked": ''}>
                    <span class="pages-read-container">Length: ${book.pages}</span>   
                    <button class="delete-book">Delete Book</button>
                </div>
            </div>`;
    }
}
class Book {
    constructor(title,author,pages,read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read; 
    }
    compareBookTitle(title){
        return this.title === title;
    }
    changeReadStatus(){
        this.read = !this.read;
    }
}


// Old implementation
// const myLibrary = [];

// function Book(title,author,pages,read) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
// }

// function addBookToLibrary(title,author,pages,read) {
//   let book = new Book(title,author,pages,read);
//   myLibrary.push(book);
// }

const myLibrary = new Library()

function checker(e) {
    let checkbox = e.target
    let parent = checkbox.parentElement.parentElement;
    let title = parent.querySelector('.the-title').children[0].innerHTML;
    myLibrary.changeBookReadStatus(title);
}

function deleteBook(e) {
    const card = e.target.parentElement.parentElement;
    const title = card.querySelector('.the-title').innerHTML;
    // myLibrary.books.forEach(book => myLibrary.removeBook(book => book.compareBookTitle(title)));
    myLibrary.improvedRemoveBook(title)
    card.remove();
}

function resetEventListeners() {
    document.querySelectorAll('.toggleRead').forEach(checkbox => {
        checkbox.removeEventListener('click',checker)
        checkbox.addEventListener('click',checker)
    });
    document.querySelectorAll('.delete-book').forEach(deleteBtn => {
        deleteBtn.removeEventListener('click', deleteBook)
        deleteBtn.addEventListener('click', deleteBook)
    });
}
function updateLibraryUI() {
    const librarySection = document.getElementById('library-section');
    librarySection.innerHTML = ''
    myLibrary.books.forEach(book => {
        librarySection.innerHTML+= myLibrary.createCard(book);
    })
};

document.getElementById('add-book-button').addEventListener('click', (e) =>{
    const form = e.target.parentElement;
    const title = form.querySelector('#title');
    const author = form.querySelector('#author');
    const length = form.querySelector('#length');
    const readField = form.querySelector('#read');
    const readStatus = readField.checked ? true : false;
    myLibrary.addBookToLibrary(title.value, author.value, parseInt(length.value), readStatus);
    title.value = ''
    author.value = ''
    length.value = 0
    readField.checked = false
    updateLibraryUI();
    resetEventListeners();
})

