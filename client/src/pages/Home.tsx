import React from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../lib/api";
import useAuthUser from "../hooks/useAuthUser";
import NoteCard from "../components/NoteCard";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthUser();

  const { data, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });

  const notes = data?.notes ?? [];

  return (
    <main className="min-h-screen bg-base-100 pt-6 px-4 sm:px-6 lg:px-8">
      <section className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-10 w-full mb-8">
        <div className="bg-white/70 backdrop-blur-3xl shadow-md shadow-blue-100 rounded-xl p-6 w-full max-w-md">
          <h2 className="text-xl sm:text-2xl font-semibold text-base-content">
            Welcome, {authUser?.fullName}.!
          </h2>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Email: {authUser?.email}
          </p>
        </div>

        <button
          onClick={() => navigate("/create-note")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md w-full sm:w-auto cursor-pointer"
        >
          Create Note
        </button>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4">Notes</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
