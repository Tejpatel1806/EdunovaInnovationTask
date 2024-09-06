const mongoose = require("mongoose");
const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "BOOKMANAGEMENT",
    })
    .then(() => {
      console.log("Database connection succesfull");
    })
    .catch((err) => {
      console.log("Error is occuring during database connection: ", err);
    });
};
module.exports = dbConnection;
