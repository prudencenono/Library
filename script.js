let myLibrary = [];

function Book(id, name, author, type) {
    this.id =  id;
    this.name = name;
    this.author = author;
    this.type = type;
}
function Display() {
    // do something here
}

Display.prototype.validate = function(book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false;
    }else {
        return true;
    }
}

Display.prototype.show = function(message, info) {
    let displayMessage = document.getElementById("message");
    displayMessage.innerHTML = `
    <p class=${message}>${info}</p>
    `
    setTimeout(function(){
        displayMessage.innerHTML = "";
    }, 2000)
}

Display.prototype.clear = function(){
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
}

Display.prototype.add = function(book) {
    document.getElementById("library").innerHTML = "";
    myLibrary.map((book)=>{
        let div = document.createElement("div");
        div.setAttribute("class", "displayBook");

        let ui = `
                <p>${book.name}</p>
                <p>${book.author}</p>
                <p>${book.type}</p>
                <button id=${book.id} class="delete">Delete</button>      
        `
        div.innerHTML = ui;

        let library = document.getElementById("library");
        library.append(div);
    })

}

Display.prototype.removeBook = function(e) {
if(e.classList.contains("delete")){
    e.parentElement.remove();
}
}

Display.prototype.deleteBook = function(targetId) {
    let tId = targetId;
    console.log(tId)
    myLibrary = myLibrary.filter((book)=>{
        if(book.id === tId) {
            return false;
        }else {
            return true;
        }
    })

}


let addBook = document.createElement("addBook");
addBook.addEventListener("click", libraryFormSubmit);
function libraryFormSubmit(e){
    e.preventDefault();
    let id = new Date().getTime();
    let name = document.querySelector(".bookName").value;
    let author = document.querySelector(".bookAuthor").value;
    let type;

    let fiction = document.getElementById("fiction");
    let computer = document.getElementById("computer");
    let cooking = document.getElementById("cooking")
    if(fiction.checked) {
        type = fiction.value;
    } else if(computer.checked) {
        type = computer.value;
    } else if(cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(id,name, author, type);
    console.log(book)
    
    console.log(myLibrary)

    let display  = new Display();

    if(display.validate(book)) {
        myLibrary.push(book)
        display.show("sucess", "Book added to the library")
    } else {
        display.show("alert", "Please fill the form correctly")
    } 

    display.clear();

    display.add(); 
}

//remove book

let library = document.querySelector("#library");
library.addEventListener("click", (e)=>{
    let display = new Display();
 display.removeBook(e.target)

display.deleteBook(e.target.id)
console.log(myLibrary)

})