const path = require("path");
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

//  CRUD CRUD CRUD CRUD CRUD CRUD CRUD CRUD CRUD CRUD CRUD CRUD CRUD CRUD CRUD

//6.
exports.photoUpload = asyncHandler(async (req, res, next) => {
  const photo = await Note.findById(req.params.id);
  if (!photo) {
    return next(
      new ErrorResponse(
        `Note data not found with that id of ${req.params.id}`,
        404
      )
    );
  }
  if (!req.files) {
    return next(new ErrorResponse(`please attach the file(s) `, 400));
  }
  const file = req.files.file;
  if (!file.mimetype.startsWith("image")) {
    return next(
      new ErrorResponse(`please attach the actually photo file(s) `, 400)
    );
  }
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `please attach the photo file(s) that size is(are) less than ${process.env.MAX_FILE_UPLOAD} `,
        400
      )
    );
  }
  file.name = `photo_${Note._id}${path.parse(file.name).ext}`;
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with upload file(s)`, 500));
    }
    await Note.findByIdAndUpdate(req.params.id, { photo: file.name });
    res.status(200).json({ success: true, data: file.name });
  });
});
//6.Upload note photo, PUT /api/v1/notes/:id/photo  , private

// File upload File upload File upload File upload File upload File upload
