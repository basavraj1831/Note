import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../lib/api";
import toast from "react-hot-toast";

interface Note {
  _id: string;
  title: string;
  content: string;
}

interface NoteCardProps {
  note: Note;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const [expanded, setExpanded] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: deleteNoteMutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      toast.success("Note deleted.");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleDeleteNote = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNoteMutate(note._id);
  };

  return (
    <div
      onClick={() => setExpanded((prev) => !prev)}
      className="flex justify-between items-start bg-white rounded-xl p-4 shadow-sm hover:shadow-md border border-transparent transition-all cursor-pointer"
    >
      <div className="w-full">
        <h4 className="font-semibold text-gray-800">{note.title}</h4>
        {expanded && (
          <p className="text-gray-600 text-sm mt-1 break-words">
            {note.content}
          </p>
        )}
      </div>
      <button onClick={handleDeleteNote}>
        <Trash2 className="text-red-500 hover:text-red-700 w-5 h-5 cursor-pointer" />
      </button>
    </div>
  );
};

export default NoteCard;
