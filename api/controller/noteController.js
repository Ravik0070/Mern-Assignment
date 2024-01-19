const Note = require("../model/Note");

//Create Note
exports.Create = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newNote = new Note({
      userId: req.query.userId,
      title,
      description,
    });
    const note = await newNote.save();
    res.status(200).json({ note });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

//Edit Note
exports.Update = async (req, res) => {
  try {
    const noteToBeUpdated = await Note.findOne({
      _id: req.params.id,
      userId: req.query.userId,
    });
    !noteToBeUpdated && res.status(404).json({ message: "Note don't exists" });
    if (noteToBeUpdated) {
      noteToBeUpdated.title = req.body.title;
      noteToBeUpdated.description = req.body.description;
      const updatedNote = await noteToBeUpdated.save();
      res.status(200).json({ note: updatedNote });
    } else {
      res.status(403).json({ message: "You Dont Have The Permission." });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

//Delete Note
exports.Delete = async (req, res) => {
  try {
    const noteToBeDeleted = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.query.userId,
    });
    !noteToBeDeleted && res.status(404).json({ message: "Note not found" });
    res
      .status(200)
      .json({ message: "Note successfully deleted", note: noteToBeDeleted });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//Get All Notes Of User
exports.GetNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.query.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ notes });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
//Get One Note Of User
exports.GetNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.query.userId,
    });
    !note && res.status(403).json({ message: "Note not found" });
    res.status(200).json({ note });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
