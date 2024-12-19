const Book = require('../models/book');

exports.addBook = async (req, res) => {
    const { title, author } = req.body;

    const newBook = new Book({ title, author });
    await newBook.save();

    res.status(201).send('Book added successfully');
};

exports.borrowBook = async (req, res) => {
    const { id } = req.params;

    const book = await Book.findById(id);
    if (!book) {
        return res.status(404).send('Book not found');
    }

    if (book.isBorrowed) {
        return res.status(400).send('Book is already borrowed');
    }

    book.isBorrowed = true;
    await book.save();

    res.send('Book borrowed successfully');
};