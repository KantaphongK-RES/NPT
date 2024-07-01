
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });


const app = express();
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `server listening on ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

// entry point
// ----------------------------------------------------------------
//
// app.get("/api/v1/stuff", (req, res) => {
//   res.status(200).json({ success: true, data: { id: 1 } });
// });

// app.get("/api/v1/stuff/:id", (req, res) => {
//   res.status(200).json({ success: true, data: { id: 1 } });
// });

// app.post("/api/v1/stuff", (req, res) => {
//   res.status(200).json({ success: true, data: { id: 1 } });
// });

// app.put("/api/v1/stuff/:id", (req, res) => {
//   res.status(200).json({ success: true, data: { id: 1 } });
// });

// app.delete("/api/v1/stuff/:id", (req, res) => {
//   res.status(200).json({ success: true, data: { id: 1 } });
// });
//------------------------------------------------------------------