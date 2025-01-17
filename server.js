const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const morgan = require("morgan");
const connectDB = require("./config/db.js");
connectDB();
const colors = require("colors");
const errorHandler = require("./middleware/error.js");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
//Route files
const auth = require("./routes/auth.js");
const app = express();
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 5000;
const controllersNotes = require("./routes/notes.js");
if (process.env.NODE_ENV === "Development") {
  app.use(morgan("dev"));
}

app.use(fileupload());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/v1/Notes", controllersNotes);
app.use("/api/v1/auth", auth);

app.use(errorHandler);
const server = app.listen(
  PORT,
  console.log(
    `server listening on ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold
  )
);
process.on("unhandleRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);
  server.close(() => process.exit(1));
});
// keep it cleanest as possible
// add environment on post man
