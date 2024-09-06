const express = require("express");
const router = express.Router();
const {
  transactionIssue,
  bookReturn,
  bookHistory,
  bookTotalRent,
  getUserBooks,
} = require("../controllers/transactionController");
router.route("/transactions/issue").post(transactionIssue);
router.route("/transactions/return").put(bookReturn);
router.route("/transactions/book-history").get(bookHistory);
router.route("/transactions/total-rent").get(bookTotalRent);
router.route("/transactions/books-user").get(getUserBooks);

module.exports = router;
