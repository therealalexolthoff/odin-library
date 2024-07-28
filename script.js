const myLibrary = [];

function Book(title,author,pages,read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
myLibrary.push(new Book('JackRabbit','Alex',500,true));
function addBookToLibrary(title,author,pages,read) {
  let book = new Book(title,author,pages,read);
  myLibrary.push(book);
}

function checker(e) {
    let checkbox = e.target
    let parent = checkbox.parentElement.parentElement;
    let title = parent.querySelector('.the-title').innerHTML;
    console.log(checkbox.checked)
    if(!checkbox.checked) {
        checkbox.checked = false;
        myLibrary.forEach(book => {
            if (book.title === title) {
                book.read = false;
            };
        });
    }
    else if (checkbox.checked){
        checkbox.checked = true;
        myLibrary.forEach(book => {
            if (book.title === title) {
                book.read = true;
            };
        });
    }
    console.log(myLibrary)
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
    myLibrary.forEach(book => removeObject(myLibrary,book => book.title === title));
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
    myLibrary.forEach(book => {
        const card = `<div class="card book-${book.title}">
                <h3 class="the-title">Title: ${book.title}</h3>
                <h3 class="the-author">Author: ${book.author}</h3>
                <div class="bottom-container">
                    <input class="read-checkbox-update toggle-read" type="checkbox">
                    <span class="pages-read-container">Length: ${book.length}</span>   
                    <span id="delete-book" class="delete-book-container"></span>
                </div>
            </div>`;
            librarySection.appendChild(card);
    })
};
console.log(myLibrary)
resetEventListeners();