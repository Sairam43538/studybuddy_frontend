import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  UploadCloud, Compass, Users, Star, Bell, FileText, Download, Eye
} from 'lucide-react';


// Mock Data - Replace with API calls later
const user = { name: "User" };

const stats = {
  notesUploaded: 12,
  roadmapsInProgress: 3,
  upvotesReceived: 128,
};

const uploadedNotes = [
  { id: 1, title: "Thermodynamics Final Cheatsheet", subject: "Physics", uploadedAt: "2 hours ago", fileUrl: "#" },
  { id: 2, title: "Advanced Calculus Problems", subject: "Mathematics", uploadedAt: "Yesterday", fileUrl: "#" },
  { id: 3, title: "Machine Learning Foundations Notes", subject: "Computer Science", uploadedAt: "3 days ago", fileUrl: "#" },
];

const recentActivity = [
  { id: 1, type: 'upload', text: "You uploaded 'Thermodynamics Final Cheatsheet.pdf'", time: "2 hours ago", icon: <UploadCloud className="w-5 h-5 text-blue-500" /> },
  { id: 2, type: 'upvote', text: "You upvoted 'Advanced Calculus Problems'", time: "5 hours ago", icon: <Star className="w-5 h-5 text-yellow-500" /> },
  { id: 3, type: 'roadmap', text: "You started the 'Machine Learning Foundations' roadmap", time: "1 day ago", icon: <Compass className="w-5 h-5 text-green-500" /> },
];

// Helper Component: Stat Card
const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 flex items-center space-x-4">
    <div className={`p-3 rounded-full ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{label}</p>
      <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
    </div>
  </div>
);

export default function Dashboard() {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDate(
        now.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
      );
      setCurrentTime(
        now.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: true })
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                {currentDate} • {currentTime} • Musiri, Tamil Nadu
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                aria-label="Notifications" 
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </header>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard icon={<FileText className="w-6 h-6 text-white" />} label="Notes Uploaded" value={stats.notesUploaded} color="bg-blue-500" />
          <StatCard icon={<Compass className="w-6 h-6 text-white" />} label="Roadmaps in Progress" value={stats.roadmapsInProgress} color="bg-green-500" />
          <StatCard icon={<Star className="w-6 h-6 text-white" />} label="Upvotes Received" value={stats.upvotesReceived} color="bg-yellow-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">

            {/* Uploaded Notes Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                Uploaded Notes
              </h2>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm space-y-4">
                {uploadedNotes.map(note => (
                  <div 
                    key={note.id} 
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                        <FileText className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-white">{note.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {note.subject} • Uploaded {note.uploadedAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 w-full sm:w-auto">
                      <a 
                        href={note.fileUrl} 
                        className="flex items-center px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                      >
                        <Eye className="w-4 h-4 mr-1" /> View
                      </a>
                      <a 
                        href={note.fileUrl} 
                        download 
                        className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        <Download className="w-4 h-4 mr-1" /> Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Actions */}
            <section>
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link 
                  to="/NotesUpload" 
                  className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 text-center group"
                >
                  <UploadCloud className="w-6 h-6 mx-auto text-blue-500 mb-2 transition-transform group-hover:-translate-y-1" />
                  <p className="font-semibold text-gray-700 dark:text-gray-200">Upload a Note</p>
                </Link>
                <Link 
                  to="/Roadmaps" 
                  className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 text-center group"
                >
                  <Compass className="w-6 h-6 mx-auto text-green-500 mb-2 transition-transform group-hover:-translate-y-1" />
                  <p className="font-semibold text-gray-700 dark:text-gray-200">Find a Roadmap</p>
                </Link>
                <Link 
                  to="/StudyRoom" 
                  className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 text-center group"
                >
                  <Users className="w-6 h-6 mx-auto text-purple-500 mb-2 transition-transform group-hover:-translate-y-1" />
                  <p className="font-semibold text-gray-700 dark:text-gray-200">Create Study Room</p>
                </Link>
              </div>
            </section>
          </div>

          {/* Right Column: Recent Activity */}
          <aside className="lg:col-span-1">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Recent Activity</h2>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
              <ul className="space-y-4">
                {recentActivity.map(activity => (
                  <li key={activity.id} className="flex items-start space-x-4">
                    <div className="mt-1 flex-shrink-0">{activity.icon}</div>
                    <div>
                      <p className="text-sm text-gray-700 dark:text-gray-200">{activity.text}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{activity.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <button className="w-full mt-6 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                View all activity
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
