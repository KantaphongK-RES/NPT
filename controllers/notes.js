const express = require("express");
const Note = require("../models/Note");
const router = express.Router();
// get all notes, GET /api/v1/notes, public
exports.getAllNotesData = async (req, res, next) => {
  try {
    const notes = await Note.find();
    res.status(200).json({ succes: true, data: notes });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// get notes per id, GET /api/v1/notes/:id, public
exports.getNoteData = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    res.status(200).json({ succes: true, data: note });
    if (!note) {
      res.status(400).json({ success: false });
    }
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// create note, POST /api/v1/notes, private
exports.postNoteData = async (req, res, next) => {
  try {
    const note = await Note.create(req.body);
    res.status(200).json({ succes: true, data: note });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// Update note data, PUT /api/v1/notes/:id, private
exports.editNoteData = (req, res, next) => {
  res.status(200).json({ succes: true, msg: "you've edit note data" });
};

// Delete note data, DELETE /api/v1/notes/:id, private
exports.deleteNote = (req, res, next) => {
  res.status(200).json({ succes: true, msg: "note data deleted" });
};
