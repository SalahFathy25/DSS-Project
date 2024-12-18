const mongoose = require('mongoose');
const express = require('express');

const app = express();
app.use(express.json());

// اتصال بـ MongoDB Atlas
const MONGO_URI = 'mongodb+srv://salah_fathy:salahfathy123@cluster0.cz79x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB Atlas successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));

// Schema للكتب
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    year: Number
});

const Book = mongoose.model('Book', bookSchema);

// Schema للموظفين
const employeeSchema = new mongoose.Schema({
    name: String,
    position: String,
    salary: Number
});

const Employee = mongoose.model('Employee', employeeSchema);

// Route لإضافة كتاب جديد
app.post('/books', async (req, res) => {
    try {
        const { title, author, year } = req.body;
        const newBook = new Book({ title, author, year });
        await newBook.save();
        res.status(201).json({ message: 'Book added successfully!', book: newBook });
    } catch (err) {
        res.status(500).json({ message: 'Failed to add the book.', error: err.message });
    }
});

// Route لإضافة موظف جديد
app.post('/employees', async (req, res) => {
    try {
        const { name, position, salary } = req.body;
        const newEmployee = new Employee({ name, position, salary });
        await newEmployee.save();
        res.status(201).json({ message: 'Employee added successfully!', employee: newEmployee });
    } catch (err) {
        res.status(500).json({ message: 'Failed to add the employee.', error: err.message });
    }
});

// نقطة بداية للسيرفر
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
