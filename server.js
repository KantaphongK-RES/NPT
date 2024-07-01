const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const morgan = require("morgan");
const connectDB = require("./config/db.js");
connectDB();
const colors = require("colors");

const app = express();
// app.use(express.json());
const PORT = process.env.PORT || 5000;
const controllersNotes = require("./routes/notes.js");
if (process.env.NODE_ENV === "Development") {
  app.use(morgan("dev"));
}
app.use("/api/v1/Notes", controllersNotes);
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
