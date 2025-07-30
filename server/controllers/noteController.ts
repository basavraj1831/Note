import { Note } from "../models/note";
import { User } from "../models/user";

export const createNote = async (req: any, res: any) => {
  const { userId, title, content } = req.body;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const note = new Note({ title, content, userId });
    await note.save();

    res.status(201).json({ success: true, message: "Note created." });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const getNotes = async (req: any, res: any) => {
  try {
    const user = req.user;
    const notes = await Note.find({ userId: user._id });
    res.status(200).json({ success: true, notes });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const deleteNote = async (req: any, res: any) => {
  try {
    const noteId = req.params.id;
    const note = await Note.findOne({ _id: noteId });
    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }
    await Note.findByIdAndDelete(noteId);
    res.status(200).json({ success: true, message: "Note deleted." });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error." });
  }
};
