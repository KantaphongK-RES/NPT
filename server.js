const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 5000;
const controllersNotes = require("./routes/notes.js");
if (process.env.NODE_ENV === "Development") {
  app.use(morgan("dev"));
}
app.use("/api/v1/Notes", controllersNotes);
app.listen(
  PORT,
  console.log(
    `server listening on ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
// keep it cleanest as possible
