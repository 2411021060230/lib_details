const express = require('express');
const mongoose = require('mongoose');
const Book = require('./bookModel');
const app = express();
app.use(express.json());

app.post('/api/books', async (req, res) => {
  res.status(201).json(await Book.create(req.body));
});
app.get('/api/books', async (req, res) => {
  res.json(await Book.find());
});

// Load a book once for all routes containing an ISBN.
app.use('/api/books/:isbn', async (req, res, next) => {
  req.book = await Book.findOne({ isbn: req.params.isbn });
  if (!req.book) return res.status(404).json({ message: 'Book not found' });
  next();
});
app.get('/api/books/:isbn', (req, res) => res.json(req.book));
app.put('/api/books/:isbn', async (req, res) => {
  const allowed = ['title', 'author', 'price', 'stock', 'genre', 'publishedYear'];
  if (!req.body || Array.isArray(req.body) || typeof req.body !== 'object' ||
      !Object.keys(req.body).length || Object.keys(req.body).some(k => !allowed.includes(k))) {
    return res.status(400).json({ message: 'Use editable book fields only; ISBN is locked' });
  }
  req.book.set(req.body);
  res.json(await req.book.save());
});
app.delete('/api/books/:isbn', async (req, res) => {
  await req.book.deleteOne();
  res.json({ message: 'Book deleted' });
});
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));
app.use((err, req, res, next) => {
  const bad = ['ValidationError', 'CastError', 'StrictModeError'].includes(err.name);
  const status = err.code === 11000 ? 409 : bad ? 400 : err.status || 500;
  if (status >= 500) console.error(err);
  res.status(status).json({ message: err.code === 11000 ? 'ISBN already exists' :
    status >= 500 ? 'Server error' : err.message });
});

async function start() {
  await mongoose.connect('mongodb://127.0.0.1:27017/bookstore');
  await Book.init();
  app.listen(3000, () => console.log('API ready: http://localhost:3000/api/books'));
}
start().catch(err => { console.error(err.message); process.exit(1); });
