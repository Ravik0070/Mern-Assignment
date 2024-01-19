const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    //we can additional fields according to our needs like image, author and others
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", NoteSchema);
