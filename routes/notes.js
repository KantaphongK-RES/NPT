const express = require("express");
const {
  getAllNotesData,
  getNoteData,
  postNoteData,
  editNoteData,
  deleteNote,
  photoUpload,
} = require("../controllers/notes");

const router = express.Router();
router.route("/").get(getAllNotesData).post(postNoteData);
router.route("/:id").get(getNoteData).put(editNoteData).delete(deleteNote);
router.route("/:id/photo").put(photoUpload);

module.exports = router;
