const express = require("express");
const  Note = require("../models/Note");
const router = express.Router();
// get all notes, GET /api/v1/notes, public
exports.getAllNotesData = (req, res, next) => {
  res.status(200).json({ succes: true, msg: "got all notes data" });
};

// get all notes per id, GET /api/v1/notes/:id, public
exports.getNoteData = (req, res, next) => {
  res.status(200).json({ succes: true, msg: "got note data" });
};

// create note, POST /api/v1/notes, private
exports.postNoteData = (req, res, next) => {
  console.log(req.body);
  res.status(200).json({ succes: true, msg: "saved note data" });
};

// Update note data, PUT /api/v1/notes/:id, private
exports.editNoteData = (req, res, next) => {
  res.status(200).json({ succes: true, msg: "you've edit note data" });
};

// Delete note data, DELETE /api/v1/notes/:id, private
exports.deleteNote = (req, res, next) => {
  res.status(200).json({ succes: true, msg: "note data deleted" });
};
