const fs = require('fs');
const express = require('express');
const cors = require('cors'); 
const app = express();

app.use(cors()); 
app.use(express.json());
const port = process.env.PORT || 1337;

let authors = [];
let books = [];
let publishers = [];

// Load JSON data
const loadAuthors = () => {
    fs.readFile(__dirname + '/data/authors.json', 'utf8', (err, data) => {
        if (!err) {
            authors = JSON.parse(data);
        }
    });
};

const loadBooks = () => {
    fs.readFile(__dirname + '/data/books.json', 'utf8', (err, data) => {
        if (!err) {
            books = JSON.parse(data);
        }
    });
};

const loadPublishers = () => {
    fs.readFile(__dirname + '/data/publishers.json', 'utf8', (err, data) => {
        if (!err) {
            publishers = JSON.parse(data);
        }
    });
};

// Load data on startup
loadAuthors();
loadBooks();
loadPublishers();

// Routes for authors
app.get('/authors', (req, res) => {
    res.json(authors);
});

app.get('/authors/:id', (req, res) => {
    const authorId = parseInt(req.params.id);
    const author = authors.find(a => a.id === authorId);
    if (!author) {
        return res.status(404).send('Author not found');
    }
    res.json(author);
});

// Routes for books
app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    if (!book) {
        return res.status(404).send('Book not found');
    }
    res.json(book);
});

// Routes for publishers
app.get('/publishers', (req, res) => {
    res.json(publishers);
});

app.get('/publishers/:id', (req, res) => {
    const publisherId = parseInt(req.params.id);
    const publisher = publishers.find(p => p.id === publisherId);
    if (!publisher) {
        return res.status(404).send('Publisher not found');
    }
    res.json(publisher);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
