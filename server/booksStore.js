
let books = [
    {
        id: 1,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        year: 1937,
        genre: "fantasy",
        read: true,
        rating: 5
    },
    {
        id: 2,
        title: "1984",
        author: "George Orwell",
        year: 1949,
        genre: "fiction",
        read: true,
        rating: 4
    },
    {
        id: 3,
        title: "A Brief History of Time",
        author: "Stephen Hawking",
        year: 1988,
        genre: "science",
        read: true,
        rating: 5
    },
    {
        id: 4,
        title: "Sapiens",
        author: "Yuval Noah Harari",
        year: 2011,
        genre: "non-fiction",
        read: true,
        rating: 3
    },
    {
        id: 5,
        title: "The Name of the Wind",
        author: "Patrick Rothfuss",
        year: 2007,
        genre: "fantasy",
        read: false,
        rating: null
    },
    {
        id: 6,
        title: "The Silent Patient",
        author: "Alex Michaelides",
        year: 2019,
        genre: "fiction",
        read: false,
        rating: null
    }
];

let nextId = 7;

function delay() {
    return new Promise((resolve) => setTimeout(resolve, 100));
}

export async function getAllBooks() {
    await delay();

    return books.map((book) => ({ ...book }));
}

export async function getBookById(id) {
    await delay();

    const book = books.find((book) => book.id === id);

    return book ? { ...book } : null;
}

export async function addBook(data) {
    await delay();

    const newBook = {
        id: nextId,
        ...data
    };

    books = [...books, newBook];
    nextId++;

    return { ...newBook };
}

export async function replaceBook(id, data) {
    await delay();

    const existingBook = books.find((book) => book.id === id);

    if (!existingBook) {
        return null;
    }

    const updatedBook = {
        id,
        ...data
    };

    books = books.map((book) =>
        book.id === id ? updatedBook : book
    );

    return { ...updatedBook };
}

export async function updateBook(id, changes) {
    await delay();

    const existingBook = books.find((book) => book.id === id);

    if (!existingBook) {
        return null;
    }

    const updatedBook = {
        ...existingBook,
        ...changes,
        id
    };

    books = books.map((book) =>
        book.id === id ? updatedBook : book
    );

    return { ...updatedBook };
}

export async function deleteBook(id) {
    await delay();

    const existingBook = books.find((book) => book.id === id);

    if (!existingBook) {
        return false;
    }

    books = books.filter((book) => book.id !== id);

    return true;
}

export async function getStats() {
    await delay();

    const total = books.length;
    const read = books.filter((book) => book.read).length;

    const ratedBooks = books.filter((book) => book.rating !== null);

    const averageRating = ratedBooks.length === 0
        ? null
        : Math.round(
            ratedBooks.reduce((sum, book) => sum + book.rating, 0) /
            ratedBooks.length * 10
        ) / 10;

    const byGenre = {};

    books.forEach((book) => {
        byGenre[book.genre] = (byGenre[book.genre] || 0) + 1;
    });

    return {
        total,
        read,
        unread: total - read,
        averageRating,
        byGenre
    };
}
