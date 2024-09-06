const express = require("express");
const router = express.Router();
const {
  registerBook,
  getBookByName,
  getBookByRentPerDayRange,
  getBookByCondition,
} = require("../controllers/bookController");
router.route("/registerBook").post(registerBook);
router.route("/books/search").get(getBookByName);
router.route("/books/rent").get(getBookByRentPerDayRange);
router.route("/books/filter").get(getBookByCondition);
module.exports = router;
