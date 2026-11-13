
const books = [
    {
        title: "Introduction to Computer Literacy",
        category: "Computer Science",
        author: "B. M. K. Ssekiziyivu",
        location: "Shelf A1-001",
        available: "Available"
    },
    {
        title: "Principles of Management",
        category: "Business",
        author: "P. Robbins",
        location: "Shelf B2-014",
        available: "Borrowed"
    },
    {
        title: "Database Systems Concepts",
        category: "Computer Science",
        author: "Silberschatz",
        location: "Shelf A1-045",
        available: "Available"
    },
    {
        title: "Business Communication",
        category: "Business",
        author: "Namugenyi R.",
        location: "Shelf B3-020",
        available: "Available"
    },
    {
        title: "Research Methods",
        category: "Education",
        author: "Creswell J.",
        location: "Shelf C1-010",
        available: "Available"
    },
    {
        title: "Uganda Atlas & General Knowledge",
        category: "General",
        author: "Ministry of Education",
        location: "Shelf D1-005",
        available: "Borrowed"
    }
];

// Display books in the table
function displayBooks(list) {
    const body = document.getElementById("bookBody");

    body.innerHTML = "";

    list.forEach((b) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${b.title}</td>
            <td>${b.category}</td>
            <td>${b.author}</td>
            <td>${b.location}</td>
            <td class="${b.available === "Available" ? "available" : "borrowed"}">
                ${b.available}
            </td>
            <td>
                <button ${b.available === "Borrowed" ? "disabled" : ""}
                class="select-book">
                    Select
                </button>
            </td>
        `;

        row.querySelector("button").addEventListener("click", function () {
            document.getElementById("selectedBook").value = b.title;
        });

        body.appendChild(row);
    });
}

// Search and filter books
function filterBooks() {
    const search = document.getElementById("search").value.toLowerCase();
    const category = document.getElementById("categoryFilter").value;

    const filtered = books.filter((b) => {
        const matchesSearch =
            b.title.toLowerCase().includes(search) ||
            b.author.toLowerCase().includes(search);

        const matchesCategory =
            category === "" || b.category === category;

        return matchesSearch && matchesCategory;
    });

    displayBooks(filtered);
}

// Reservation function
function reserveBook() {
    const name = document.getElementById("name").value.trim();
    const studentId = document.getElementById("studentId").value.trim();
    const selectedBook = document.getElementById("selectedBook").value;
    const resDate = document.getElementById("resDate").value;

    document.getElementById("nameError").textContent = "";
    document.getElementById("idError").textContent = "";
    document.getElementById("dateError").textContent = "";

    let valid = true;

    if (name === "") {
        document.getElementById("nameError").textContent =
            "Please enter your full name.";
        valid = false;
    }

    if (studentId === "") {
        document.getElementById("idError").textContent =
            "Please enter your Student/Staff ID.";
        valid = false;
    }

    if (selectedBook === "") {
        document.getElementById("dateError").textContent =
            "Please select a book first.";
        valid = false;
    }

    if (resDate === "") {
        document.getElementById("dateError").textContent +=
            " Please select a reservation date.";
        valid = false;
    } else {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const chosenDate = new Date(resDate + "T00:00:00");

        if (chosenDate < today) {
            document.getElementById("dateError").textContent +=
                " Reservation date cannot be in the past.";
            valid = false;
        }
    }

    if (!valid) return;

    const result = document.getElementById("result");

    result.style.display = "block";

    result.innerHTML = `
        <h3>Reservation Successful!</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Student/Staff ID:</b> ${studentId}</p>
        <p><b>Selected Book:</b> ${selectedBook}</p>
        <p><b>Reservation Date:</b> ${resDate}</p>
        <p>Your reservation request has been recorded on this page.</p>
    `;
}

// Connect search and category controls
document.getElementById("search").addEventListener("input", filterBooks);

document.getElementById("categoryFilter").addEventListener("change", filterBooks);

document.getElementById("reserveBtn").addEventListener("click", reserveBook);

// Display all books when page loads
displayBooks(books);
