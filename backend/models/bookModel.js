const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookId: {
    type: String,
    required: [true, "Book ID is required"],
    unique: true,
  },
  bookName: {
    type: String,
    required: [true, "Please Enter the Book Name"],
  },
  category: {
    type: String,
    required: [true, "Please Enter the Book Category"],
    default: "Other",
  },
  rentPerDay: {
    type: Number,
    required: [true, "Please Enter the Rent Per Day"],
    min: [1, "Rent per day must be at least 1"],
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
