let books = [];

const form = document.querySelector('#book-form');
const catalog = document.querySelector('.book-catalog');
const h1 = document.querySelector('h1');
const bookList = document.querySelector('.book-list');
let title, author;

function storeLocalStorage(){
    localStorage.setItem("books", JSON.stringify(books));
}

function addBook (){
    title = document.querySelector('#title').value;
    author = document.querySelector('#author').value;

    const book = {
        title: title,
        author: author
    }
    books.push(book);
}

function loadLocalStorage(){
    if(localStorage.length>0){
        books = JSON.parse(localStorage.getItem("books"));
    }
}

function removeList(){
    while (bookList.firstChild) {
        bookList.removeChild(bookList.firstChild);
    }
}

function displayData(){
    removeList();
      if(books.length>0){
        for(let i=0; i<books.length; i++){
            let title = books[i].title;
            let author = books[i].author;
            let li = document.createElement('li');
            li.innerHTML = `${title}<br>${author}`;
            bookList.appendChild(li);
            let btn = document.createElement('button');
            btn.classList.add('delete-btn');
            btn.id = i;
            btn.innerHTML = 'Remove';
            bookList.appendChild(btn);
            let hr = document.createElement('hr');
            hr.classList.add('booklist-hr');
            bookList.appendChild(hr);
        }
      }
    else {
        let h3 = document.createElement('h3');
        h3.innerHTML = `No record found`;
        bookList.appendChild(h3);
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    addBook();
    storeLocalStorage();
    displayData();
    form.reset();
});

window.addEventListener('load', () => {
    loadLocalStorage();
    displayData();
});

bookList.addEventListener('click', (ev) => {
    if(ev.target.classList == 'delete-btn'){
        let id = ev.target.id;
        books.splice(id, 1);
        storeLocalStorage();
        loadLocalStorage();
        displayData();
    }
});