import axios from "axios";

// Upload a note
export const uploadNote = async (noteData) => {
  const response = await axios.post("/api/notes/", noteData);
  return response.data;
};

// Search for notes
export const searchNotes = async (query) => {
  const response = await axios.get(`/api/notes/search?q=${query}`);
  return response.data;
};

// Upvote a note
export const upvoteNote = async (noteId) => {
  const response = await axios.post(`/api/notes/${noteId}/upvote`);
  return response.data;
};
