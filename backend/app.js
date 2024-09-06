const express = require("express");
const dotenv = require("dotenv");
const dbConnection = require("./config/dbConnection");
const err = require("./middleware/error");
dotenv.config({ path: "backend/config/config.env" });
const app = express();
app.use(express.json());
dbConnection();
const userRoute = require("./routes/userRoutes");
const bookRoute = require("./routes/bookRoutes");
const transactionRoute = require("./routes/transactionRoutes");
app.use("/api/v1", userRoute);
app.use("/api/v1", bookRoute);
app.use("/api/v1", transactionRoute);
app.use(err);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
