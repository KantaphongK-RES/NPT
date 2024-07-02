const Note = require("../models/Note");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
// 1.
exports.getAllNotesData = asyncHandler(async (req, res, next) => {
  const notes = await Note.find();
  if (!notes) {
    return next(err);
  }
  res.status(200).json({ succes: true, data: notes, count: notes.length });
});

//2
exports.getNoteData = asyncHandler(async (req, res, next) => {
  const note = await Note.findById(req.params.id);
  if (!note) {
    return next(
      new ErrorResponse(`Note not found with that id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ succes: true, data: note });
});

//3.
exports.postNoteData = asyncHandler(async (req, res, next) => {
  const note = await Note.create(req.body);
  res.status(200).json({ succes: true, data: note });
});

//4.
exports.editNoteData = asyncHandler(async (req, res, next) => {
  const editnote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!editnote) {
    return next(
      new ErrorResponse(`Note not found with that id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ succes: true, data: editnote });
});

//5.
exports.deleteNote = asyncHandler(async (req, res, next) => {
  const delnote = await Note.findByIdAndDelete(req.params.id);
  if (!delnote) {
    return next(
      new ErrorResponse(`Note not found with that id of ${req.params.id}`, 404)
    );
  }
  res
    .status(200)
    .json({ succes: true, data: {}, msg: "Note deleted successfully" });
});
//1.get all notes   , GET    /api/v1/notes      , public
//2.get notes per id, GET    /api/v1/notes/:id  , public
//3.create note     , POST   /api/v1/notes      , private
//4.Update note data, PUT    /api/v1/notes/:id  , private
//5.Delete note data, DELETE /api/v1/notes/:id  , private
