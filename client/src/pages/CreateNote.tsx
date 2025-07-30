import React, { useEffect, useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import useCreateNote from "../hooks/useCreateNote";

interface NoteData {
  userId: string;
  title: string;
  content: string;
}

const CreateNote: React.FC = () => {
  const { authUser } = useAuthUser();
  const navigate = useNavigate();

  const [noteData, setNoteData] = useState<NoteData>({
    userId: "",
    title: "",
    content: "",
  });

  const { isPending, createNoteMutation } = useCreateNote();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(noteData)
    createNoteMutation(noteData, {
      onSuccess: (res) => {
        toast.success(res.message);
        navigate("/");
      },
      onError: (err: any) => {
        const message = err?.response?.data?.message;
        toast.error(message);
      },
    });
  };

  useEffect(() => {
    if (authUser) {
      setNoteData((prev) => ({ ...prev, userId: authUser?._id }));
    }
  }, [authUser]);

  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-base-100 px-4 overflow-hidden ">
      <div className="bg-white shadow-xl border border-gray-200 rounded-xl p-4 md:p-8 w-full max-w-lg">
        <h1 className="text-2xl sm:text-3xl font-medium mb-6 text-center">
          Create a New Note
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-sm">
          <div>
            <label
              htmlFor="title"
              className="block text-gray-700 font-medium mb-1"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={noteData.title}
              onChange={(e) =>
                setNoteData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Enter note title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-gray-700 font-medium mb-1"
            >
              Content
            </label>
            <textarea
              id="content"
              value={noteData.content}
              onChange={(e) => setNoteData((prev) => ({ ...prev, content: e.target.value }))}
              placeholder="Enter note content"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition cursor-pointer disabled:opacity-60"
            disabled={isPending}
          >
            {isPending ? "Creating Note..." : "Create Note"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
