const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Book = require("../models/bookModel");
const ApiFeatures = require("../utils/apifeatures");

const registerBook = catchAsyncErrors(async (req, res, next) => {
  const { bookId, bookName, category, rentPerDay } = req.body;
  const book = await Book.create({
    bookId,
    bookName,
    category,
    rentPerDay,
  });
  res.status(400).json({ success: true, book });
});

const getBookByName = catchAsyncErrors(async (req, res) => {
  const apifeatures = new ApiFeatures(Book.find(), req.query).search();
  const books = await apifeatures.query;
  res.status(200).json({ success: true, books });
});
const getBookByRentPerDayRange = catchAsyncErrors(async (req, res) => {
  const apifeatures = new ApiFeatures(Book.find(), req.query).filter();
  const books = await apifeatures.query;
  res.status(200).json({ success: true, books });
});
const getBookByCondition = catchAsyncErrors(async (req, res) => {
  const apifeatures = new ApiFeatures(Book.find(), req.query).search().filter();
  const books = await apifeatures.query;
  res.status(200).json({ success: true, books });
});
module.exports = {
  registerBook,
  getBookByName,
  getBookByRentPerDayRange,
  getBookByCondition,
};
