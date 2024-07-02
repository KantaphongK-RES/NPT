const mongoose = require("mongoose");
const slugify = require("slugify");

const NotesSchema = new mongoose.Schema({
  notename: {
    type: String,
    required: [true, "Please add a name"],
    unique: true,
    trim: true,
    maxlength: [50, "name can not exceed 50 characters"],
  },
  content: {
    type: String,
    required: [true, "Please add content of note"],
    maxlength: [500, "name can not exceed 500 characters"],
  },
  links: {
    type: String,
    match: [
      /^(https?|ftp):\/\/(?:[\w-]+\.)+[a-z]{2,}(?:\/[^\\s]*)?$/i,
      "please use a valid link HTTP or HTTPS",
    ],
  },
  tags: {
    type: String,
    required: [true, "Please add tags of note"],
    maxlength: [20, "name can not exceed 20 characters"],
  },
  subject: {
    type: String,
    required: [true, "Please add subject for note"],
    maxlength: [20, "name can not exceed 20 characters"],
  },
  weightsforpriority: {
    type: Number,
    required: [true, "Please rate the priority for note"],
    min: [1, "weight can be less than 1"],
    max: [10, "weight can be greater than 10"],
  },
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});
NotesSchema.pre("save", function (next) {
  this.name = slugify(this.notename, { lower: true });
  next();
});
module.exports = mongoose.model("Note", NotesSchema);
