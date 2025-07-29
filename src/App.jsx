// src/App.jsx
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import NotesUpload from "./pages/NotesUpload";
import NotesSearch from "./pages/NotesSearch";
import Roadmaps from "./pages/Roadmaps";
import RoadmapDetails from "./pages/RoadmapDetails";
import AdminPanel from "./pages/AdminPanel";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between">
        <h1 className="text-xl font-bold">StudyBuddy</h1>
        <div className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/upload">Upload</Link>
          <Link to="/search">Search</Link>
          <Link to="/roadmaps">Roadmaps</Link>
          <Link to="/admin">Admin</Link>
        </div>
      </nav>

      {/* Pages */}
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<NotesUpload />} />
          <Route path="/search" element={<NotesSearch />} />
          <Route path="/roadmaps" element={<Roadmaps />} />
          <Route path="/roadmaps/:id" element={<RoadmapDetails />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </div>
  );
}
