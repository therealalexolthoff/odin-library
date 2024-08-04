class Library {
    shelves = []
    addBookToLibrary(title,author,pages,read) {
        let book = new Book(title,author,pages,read);
        this.shelves.push(book);
      }
}
class Book {
    constructor(title,author,pages,read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read; 
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
    let title = parent.querySelector('.the-title').innerHTML;
    if(!checkbox.checked) {
        checkbox.checked = false;
        myLibrary.shelves.forEach(book => {
            if (book.title === title) {
                book.read = false;
            };
        });
    }
    else if (checkbox.checked){
        checkbox.checked = true;
        myLibrary.shelves.forEach(book => {
            if (book.title === title) {
                book.read = true;
            };
        });
    }
}

function removeObject(array,conditionFn) {
        let index = array.findIndex(conditionFn);
        if (index !== -1) {
            array.splice(index, 1);
        }
}

function deleteBook(e) {
    const card = e.target.parentElement.parentElement;
    const title = card.querySelector('.the-title').innerHTML;
    myLibrary.shelves.forEach(book => removeObject(myLibrary.shelves,book => book.title === title));
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
    myLibrary.shelves.forEach(book => {
        const card = `<div class="card">
                <h3 class="the-title">Title: ${book.title}</h3>
                <h3 class="the-author">Author: ${book.author}</h3>
                <div class="bottom-container">
                    <input class="read-checkbox-update toggleRead" type="checkbox" ${book.read ? "checked": ''}>
                    <span class="pages-read-container">Length: ${book.pages}</span>   
                    <button class="delete-book">Delete Book</button>
                </div>
            </div>`;
            librarySection.innerHTML+= card;
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

