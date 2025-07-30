// src/pages/NotesUpload.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { FaCloudUploadAlt } from "react-icons/fa";

export default function NotesUpload() {
  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleUpload = (e) => {
    e.preventDefault();
    // ✅ Fake upload behavior
    setTimeout(() => {
      setSuccessMessage("✅ Uploaded successfully!");
      setTitle("");
      setKeywords("");
      setFile(null);
    }, 1000);
  };

  return (
    <motion.div
      className="max-w-lg mx-auto p-8 bg-white shadow-2xl rounded-2xl mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700 flex items-center justify-center gap-2">
        <FaCloudUploadAlt /> Upload Study Material
      </h2>

      {successMessage && (
        <motion.div
          className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {successMessage}
        </motion.div>
      )}

      <form onSubmit={handleUpload} className="space-y-5">
        <input
          type="text"
          placeholder="Title"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Keywords (comma-separated)"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          required
        />
        <div className="w-full border-dashed border-2 border-gray-300 p-6 rounded-lg text-center hover:border-blue-400 cursor-pointer">
          <input
            type="file"
            className="hidden"
            id="fileInput"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="fileInput" className="cursor-pointer text-gray-500">
            {file ? (
              <span className="text-green-600 font-semibold">{file.name}</span>
            ) : (
              "Click or drag a file here to upload"
            )}
          </label>
        </div>
        <motion.button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-700 transition-all"
          whileTap={{ scale: 0.95 }}
        >
          Upload
        </motion.button>
      </form>
    </motion.div>
  );
}
