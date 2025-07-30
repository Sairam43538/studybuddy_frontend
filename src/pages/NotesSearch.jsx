// src/pages/NotesSearch.jsx
import { useState, useEffect } from "react";
import { searchNotes, upvoteNote } from "../services/notesService";

export default function NotesSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await searchNotes(query);
    setResults(res);
  };

  const handleUpvote = async (id) => {
    await upvoteNote(id);
    handleSearch();
  };
  const { user } = useAuth();




  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="Search notes"
          className="flex-1 border p-2 rounded"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {results.map((note) => (
        <div key={note._id} className="bg-white p-4 shadow rounded mb-2 flex justify-between">
          <div>
            <h3 className="font-bold">{note.title}</h3>
            <p className="text-gray-600 text-sm">{note.keywords.join(", ")}</p>
            {note.is_teacher_recommended && (
              <span className="text-green-600 font-semibold">Teacher Recommended</span>
            )}
          </div>
          <button
            onClick={() => handleUpvote(note._id)}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            👍 {note.upvote_count}
          </button>
        </div>
      ))}
    </div>
  );
}
