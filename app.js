// Book class: Represent a book

class Book {
  constructor(title, author, rate, comment) {
    (this.title = title),
      (this.author = author),
      (this.rate = rate),
      (this.comment = comment);
  }
}

// UI class: Hanfle UI Task
class UI {
  static displayBooks() {
    const StoredBooks = [
      {
        title: "B1",
        author: "A1",
        rate: "5",
        comment: "Amazing"
      },
      {
        title: "B2",
        author: "A2",
        rate: "4",
        comment: "terrific"
      }
    ];
    const books = StoredBooks;
    books.forEach(book => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");

    row.innerHTML = `
    <td> ${book.title} </td>
    <td> ${book.author} </td>
    <td> ${book.rate} </td>
    <td> ${book.comment} </td>
    <td> <a href="#" class="btn btn-danger btn-sm delete"> Remove </a></td>
    `;
    list.appendChild(row);
  }
}

// Store Class: Handle storage

// Event: Display Book
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event: Add a Book
document.querySelector("#book-form").addEventListener("submit", e => {
  // Get form values
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const rate = document.getElementById("rating");
  const comment = document.getElementById("comment");

  // instatiate books
});

// Event: Remove a book
