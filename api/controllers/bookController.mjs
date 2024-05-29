import { Book } from "../models/bookModel.mjs";

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).send({ count: books?.length, data: books });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getBook = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const book = await Book.findById(id);
    if (!book?.title)
      return res.status(404).send({ message: "Book not found" });
    return res.status(200).send({ count: book?.length, data: book });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const saveBook = async (req, res) => {
  console.log(req.body);
  try {
    const { title, author, publishedYear } = req?.body;
    if (!title || !author || !publishedYear) {
      return res.status(400).send({ message: "All field are required" });
    }

    const newBook = {
      title,
      author,
      publishedYear,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (err) {
    console.error(err.message || err);
    res.status(500).send({ message: err.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const { title, author, publishedYear } = req?.body;
    if (!title || !author || !publishedYear) {
      return res.status(400).send({ message: "All field are required" });
    }
    await Book.findByIdAndUpdate(id, req.body);
    return res.status(200).send("Book updated successfully");
  } catch (err) {
    console.error(err.message || err);
    res.status(500).send({ message: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id)
      return res.status(400).response({ message: "Book id is required" });
    await Book.findByIdAndDelete(id);
    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (err) {
    console.error(err.message || err);
    res.status(500).send({ message: err.message });
  }
};

export const bookController = {
  getAllBooks,
  saveBook,
  getBook,
  updateBook,
  deleteBook,
};
