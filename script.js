class Library {
    constructor(){
        if (localStorage.length>0){
            this.books = JSON.parse(localStorage.getItem("books"));
        }
        else {
            this.books = [];
        }
    }

    storeLocalStorage(){
        localStorage.setItem("books", JSON.stringify(this.books));
    }
    
    addBook (){
        title = document.querySelector('#title').value;
        author = document.querySelector('#author').value;
    
        const book = {
            title: title,
            author: author
        }
        if(this.books){
            this.books.push(book);
        }
    }
    
    loadLocalStorage(){
       if (localStorage.length>0){
            this.books = JSON.parse(localStorage.getItem("books"));
        }
    }
    
    removeList(){
        while (bookList.firstChild) {
            bookList.removeChild(bookList.firstChild);
        }
    }
    
    displayData(){
        this.removeList();
          if(this.books.length>0){
            for(let i=0; i<this.books.length; i++){
                let title = this.books[i].title;
                let author = this.books[i].author;
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

    deleteItem(ev){
        if(ev.target.classList == 'delete-btn'){
            let id = ev.target.id;
            this.books.splice(id, 1);
            this.storeLocalStorage();
            this.loadLocalStorage();
            this.displayData();
        }
    }
}

const library = new Library();

const form = document.querySelector('#book-form');
const catalog = document.querySelector('.book-catalog');
const h1 = document.querySelector('h1');
const bookList = document.querySelector('.book-list');
let title, author;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    library.addBook();
    library.storeLocalStorage();
    library.displayData();
    form.reset();
});

window.addEventListener('load', () => {
    library.loadLocalStorage();
    library.displayData();
});

bookList.addEventListener('click', (ev) => {
    library.deleteItem(ev);
});