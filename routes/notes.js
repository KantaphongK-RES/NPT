const express = require("express");
const router = express.Router();
const {
  getAllNotesData,
  getNoteData,
  postNoteData,
  editNoteData,
  deleteNote,
  photoUpload,
} = require("../controllers/notes");
const { permissionProtect } = require("../middleware/authpermission");

router.route("/").get(getAllNotesData).post(postNoteData);
router
  .route("/:id")
  .get(permissionProtect, getNoteData)
  .put(permissionProtect, editNoteData)
  .delete(permissionProtect, deleteNote);
router.route("/:id/photo").put(photoUpload);

module.exports = router;
