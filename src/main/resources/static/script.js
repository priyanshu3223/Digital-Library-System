const API_URL = "http://localhost:9090/api/books"; // Adjust if necessary

// Fetch and display books
function fetchBooks() {
    fetch(API_URL)
        .then(response => response.json())
        .then(books => {
            let tableBody = document.querySelector("#booksTable tbody");
            tableBody.innerHTML = "";
            books.forEach(book => {
                let row = `<tr>
                    <td>${book.bookId}</td>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.genre}</td>
                    <td>${book.availabilityStatus}</td>
                    <td>
                        <button onclick="deleteBook('${book.id}')">🗑 Delete</button>
                    </td>
                </tr>`;
                tableBody.innerHTML += row;
            });
        });
}

// Add a book
document.getElementById("addBookForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let bookData = {
        bookId: document.getElementById("bookId").value,
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        genre: document.getElementById("genre").value,
        availabilityStatus: document.getElementById("availability").value
    };

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData)
    })
    .then(response => response.json())
    .then(() => {
        fetchBooks();
        document.getElementById("addBookForm").reset();
    });
});

// Delete a book
function deleteBook(id) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => fetchBooks());
}

// Initial fetch
fetchBooks();
