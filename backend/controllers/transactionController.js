const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const Book = require("../models/bookModel");
const Transaction = require("../models/transactionsModel");
const ErrorHandler = require("../utils/errorHandler");
const transactionIssue = catchAsyncErrors(async (req, res, next) => {
  const { bookId, userId, issueDate } = req.body;
  console.log(bookId, " ", userId, " ", issueDate);
  const user = User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }
  const book = Book.findById(bookId);
  if (!book) {
    return next(new ErrorHandler("Book Not Found", 404));
  }
  const newTransaction = await Transaction.create({
    bookId,
    userId,
    issueDate: new Date(issueDate),
    returnDate: null,
    totalRent: null,
  });
  res.status(400).json({ success: true, newTransaction });
});

const bookReturn = catchAsyncErrors(async (req, res, next) => {
  const { bookId, userId, returnDate } = req.body;

  const transaction = await Transaction.findOne({
    bookId,
    userId,
    returnDate: null,
  });
  if (!transaction) {
    return next(new ErrorHandler("No active transaction found ", 404));
  }
  const rentDays = Math.ceil(
    (new Date(returnDate) - new Date(transaction.issueDate)) /
      (1000 * 60 * 60 * 24)
  );
  console.log("rentDays is: ", rentDays);
  const book = await Book.findById(transaction.bookId);
  const rentPerDay = book.rentPerDay;
  console.log("Rent Per Day is: ", rentPerDay);
  const totalRent = rentDays * rentPerDay;
  console.log("totalRent is: ", totalRent);
  transaction.returnDate = returnDate;
  transaction.totalRent = totalRent;
  await transaction.save();
  res.status(200).json({ success: true, transaction });
});

const bookHistory = catchAsyncErrors(async (req, res, next) => {
  const { bookId } = req.query;
  const transactions = await Transaction.find({ bookId });
  const currentlyIssued = transactions.find((tx) => !tx.returnDate);
  res.status(200).json({
    totalIssued: transactions.length,
    currentlyIssued: currentlyIssued ? currentlyIssued.userId : "Not Issued",
    issuedUsers: transactions.map((tx) => tx.userId),
  });
});

const bookTotalRent = catchAsyncErrors(async (req, res, next) => {
  const { bookId } = req.query;
  const transactions = await Transaction.find({
    bookId,
    totalRent: { $ne: null },
  });
  const totalRent = transactions.reduce((acc, tx) => acc + tx.totalRent, 0);
  res.status(200).json({ success: true, totalRent });
});

const getUserBooks = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.query;
  const transactions = await Transaction.find({ userId });
  const books = [];
  for (const tx of transactions) {
    const book = await Book.findById(tx.bookId);
    console.log("book is", book);
    books.push(book);
  }
  console.log("books", books);
  res.status(200).json({ success: true, books });
});

module.exports = {
  transactionIssue,
  bookReturn,
  bookHistory,
  bookTotalRent,
  getUserBooks,
};
