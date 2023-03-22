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
        
        if(title=="" && author==""){
            const titleBox = document.querySelector('#title');
            const authorBox = document.querySelector('#author');
            titleBox.classList.add('border-highlight');
            authorBox.classList.add('border-highlight');
        }
        else if(title==""){
            const titleBox = document.querySelector('#title');
            titleBox.classList.add('border-highlight');
        }
        else if(author==""){
            const authorBox = document.querySelector('#author');
            authorBox.classList.add('border-highlight');
        }
        else {
            const book = {
                title: title,
                author: author
            }
            if(this.books){
                this.books.push(book);
            }
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
                li.innerHTML = `${title} by ${author}`;
                if(i%2==0){
                    li.classList.add('grey-bg');
                }
                else {
                    li.classList.add('white-bg');
                }
                let btn = document.createElement('button');
                btn.classList.add('delete-btn');
                btn.id = i;
                btn.innerHTML = 'Remove';
                li.appendChild(btn);
                bookList.appendChild(li);
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

const bookCatalog = document.querySelector('#book-list');
const addBookForm = document.querySelector('#add-book');
const contactInfo = document.querySelector('#contact-info');

const nav = document.querySelectorAll('nav a');

let title, author;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    library.addBook();
    library.storeLocalStorage();
    library.displayData();
    form.reset();
});

window.addEventListener('load', () => {
    setTimeout(showTime, 50);
    nav[0].classList.add('active-link');
    addBookForm.classList.add('hide');
    contactInfo.classList.add('hide');
    bookCatalog.style.display = "block";
    addBookForm.style.display = "none";
    contactInfo.style.display = "none";
    library.loadLocalStorage();
    library.displayData();
});

bookList.addEventListener('click', (ev) => {
    library.deleteItem(ev);
});

function showTime(){
    const timeDiv = document.getElementById('time-div');
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var today = new Date();
    var date = monthNames[(today.getMonth()+1)]+' '+today.getDate()+' '+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' <b>'+time+'</b>';
 
    timeDiv.innerHTML = dateTime;
    setTimeout(showTime, 50);
}

for(let a=0; a<nav.length; a++){
    nav[a].addEventListener('click', (ev)=> {
        var showClass = ev.target.classList;
        if(ev.target.id=='showList'){
            nav[0].classList.add('active-link');
            nav[1].classList.remove('active-link');
            nav[2].classList.remove('active-link');
            bookCatalog.style.display = "block";
            addBookForm.style.display = "none";
            contactInfo.style.display = "none";
        }
        else if(ev.target.id=='showForm'){
            nav[0].classList.remove('active-link');
            nav[1].classList.add('active-link');
            nav[2].classList.remove('active-link');
            bookCatalog.style.display = "none"
            addBookForm.style.display = "block";
            contactInfo.style.display = "none";
        }
        else if(ev.target.id=='showContact'){
            nav[0].classList.remove('active-link');
            nav[1].classList.remove('active-link');
            nav[2].classList.add('active-link');
            bookCatalog.style.display = "none"
            addBookForm.style.display = "none";
            contactInfo.style.display = "block";
        }
    });
}