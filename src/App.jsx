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
      <nav className="bg-blue-200 text-black px-6 py-4 flex justify-between shadow-md">
        <h1 className="text-2xl font-extrabold text-black">StudyBuddy</h1>
        <div className="space-x-4 flex items-center">
          <Link className="text-black font-bold text-lg hover:text-blue-600 px-2 py-1 rounded" to="/">Home</Link>
          <Link className="text-black font-bold text-lg hover:text-blue-600 px-2 py-1 rounded" to="/dashboard">Dashboard</Link>
          <Link className="text-black font-bold text-lg hover:text-blue-600 px-2 py-1 rounded" to="/upload">Upload</Link>
          <Link className="text-black font-bold text-lg hover:text-blue-600 px-2 py-1 rounded" to="/search">Search</Link>
          <Link className="text-black font-bold text-lg hover:text-blue-600 px-2 py-1 rounded" to="/roadmaps">Roadmaps</Link>
          <Link className="text-black font-bold text-lg hover:text-blue-600 px-2 py-1 rounded" to="/admin">Admin</Link>
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
