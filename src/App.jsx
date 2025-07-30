import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import NotesUpload from "./pages/NotesUpload";
import NotesSearch from "./pages/NotesSearch";
import Roadmaps from "./pages/Roadmaps";
import RoadmapDetails from "./pages/RoadmapDetails";
import AdminPanel from "./pages/AdminPanel";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col">

      {/* Navbar */}
      <nav className="bg-blue-500 text-white px-6 py-4 flex justify-between shadow-md">
        <h1 className="text-2xl font-bold">StudyBuddy</h1>
        <div className="space-x-4 flex items-center">
          <Link className="text-gray-100 hover:text-yellow-200" to="/">Home</Link>
          <Link className="text-gray-100 hover:text-yellow-200" to="/dashboard">Dashboard</Link>
          <Link className="text-gray-100 hover:text-yellow-200" to="/upload">Upload</Link>
          <Link className="text-gray-100 hover:text-yellow-200" to="/search">Search</Link>
          <Link className="text-gray-100 hover:text-yellow-200" to="/roadmaps">Roadmaps</Link>
          <Link className="text-gray-100 hover:text-yellow-200" to="/admin">Admin</Link>
        </div>
      </nav>

      {/* Pages */}
      <main className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<NotesUpload />} />
          <Route path="/search" element={<NotesSearch />} />
          <Route path="/roadmaps" element={<Roadmaps />} />
          <Route path="/roadmaps/:id" element={<RoadmapDetails />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </main>

    </div>
  );
}
