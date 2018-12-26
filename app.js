// Book class: Represent a book

class Book {
  constructor(title, author, rating, review) {
    (this.title = title),
      (this.author = author),
      (this.rating = rating),
      (this.review = review);
  }
}

// UI class: Hanfle UI Task
class UI {
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(book => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");

    row.innerHTML = `
    <td> ${book.title} </td>
    <td> ${book.author} </td>
    <td> ${book.rating} </td>
    <td> ${book.review} </td>
    <td> <a href="#" class="btn btn-danger btn-sm delete"> Remove </a></td>
    `;
    list.appendChild(row);
  }
  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);

    //vanish in 3 secs
    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 1250);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#rating").value = "";
    document.querySelector("#review").value = "";
  }
}

// Store Class: Handle storage

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(title) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1);
      }
    });

    JSON.parse(localStorage.setItem("books", books));
  }
}

// Event: Display Book
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event: Add a Book
document.querySelector("#book-form").addEventListener("submit", e => {
  // Get form values
  e.preventDefault();

  //Get form values
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const rating = document.getElementById("rating").value;
  const review = document.getElementById("review").value;

  // basic validation
  if (title === "" || author === "" || rating === "" || review === "") {
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    // instatiate books
    const book = new Book(title, author, rating, review);
    //   console.log(book);

    //Add book to UI
    UI.addBookToList(book);

    // add book to local storage//store
    Store.addBook(book);

    UI.showAlert("Book Added", "success");

    //clear fields
    UI.clearFields();
  }
});

// Event: Remove a book
//Use event propagation to target the click parent parent element to remove the book list
document.querySelector("#book-list").addEventListener("click", e => {
  UI.deleteBook(e.target);
  UI.showAlert("Book Removed", "primary");
});
