const express = require("express");
const Note = require("../models/Note");
const router = express.Router();
// get all notes, GET /api/v1/notes, public
exports.getAllNotesData = async (req, res, next) => {
  try {
    const notes = await Note.find();
    if ((notes = [])) {
      return res.status(400).json({ success: false, msg: "No notes found" });
    }
    res.status(200).json({ succes: true, data: notes, count: notes.length });
  } catch (err) {
    res.status(400).json({ success: false, msg: "No notes found" });
  }
};

// get notes per id, GET /api/v1/notes/:id, public
exports.getNoteData = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ succes: true, data: note });
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
exports.editNoteData = async (req, res, next) => {
  try {
    const editnote = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!editnote) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ succes: true, data: editnote });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// Delete note data, DELETE /api/v1/notes/:id, private
exports.deleteNote = async (req, res, next) => {
  try {
    const delnote = await Note.findByIdAndDelete(req.params.id);
    if (!delnote) {
      return res.status(400).json({ success: false });
    }
    res
      .status(200)
      .json({ succes: true, data: {}, msg: "Note deleted successfully" });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
