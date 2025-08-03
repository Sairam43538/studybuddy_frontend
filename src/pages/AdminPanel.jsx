import React, { useState } from 'react';
import { Users, FileText, BarChart2, Shield, Trash2, UserCheck, UserX, Edit, Search, ChevronLeft, ChevronRight, UploadCloud } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


// --- MOCK DATA ---
const mockUsers = [
    { id: 'uuid-1', name: 'Anand Kumar', email: 'anand@example.com', role: 'STUDENT', posts: 12, joined: '2024-07-15', status: 'Active' },
    { id: 'uuid-2', name: 'Priya Sharma', email: 'priya.s@example.com', role: 'TEACHER', posts: 45, joined: '2024-06-20', status: 'Active' },
    { id: 'uuid-3', name: 'Rohan Verma', email: 'rohan.v@example.com', role: 'MODERATOR', posts: 8, joined: '2024-05-10', status: 'Active' },
    { id: 'uuid-4', name: 'Sita Menon', email: 'sita.menon@example.com', role: 'STUDENT', posts: 3, joined: '2024-07-22', status: 'Banned' },
    { id: 'uuid-5', name: 'Vikram Singh', email: 'vikram.s@example.com', role: 'STUDENT', posts: 21, joined: '2024-04-01', status: 'Active' },
];

const mockReportedNotes = [
    { id: 'note-101', title: 'Suspicious Exam Answers QnA', uploader: 'user_scam123', reason: 'Spam / Cheating Material', date: '2024-08-02' },
    { id: 'note-102', title: 'Get Rich Quick Scheme', uploader: 'user_spammy', reason: 'Off-topic Content', date: '2024-08-01' },
];

const siteStats = {
    totalUsers: 1452,
    totalNotes: 3891,
    activeUsersToday: 234,
    uploadsToday: 42,
};

const weeklyActivityData = [
    { name: 'Mon', signups: 22, uploads: 35 },
    { name: 'Tue', signups: 30, uploads: 42 },
    { name: 'Wed', signups: 25, uploads: 55 },
    { name: 'Thu', signups: 45, uploads: 51 },
    { name: 'Fri', signups: 38, uploads: 62 },
    { name: 'Sat', signups: 50, uploads: 70 },
    { name: 'Sun', signups: 48, uploads: 65 },
];
// --- END MOCK DATA ---

// Helper: Stat Card
const StatCard = ({ icon, label, value }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
        <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">{icon}</div>
            <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{label}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
            </div>
        </div>
    </div>
);

// Main Admin Panel Component
export default function AdminPanel() {
    const [activeTab, setActiveTab] = useState('users'); // users, content, stats

    const renderContent = () => {
        switch (activeTab) {
            case 'users':
                return <UserManagement />;
            case 'content':
                return <ContentModeration />;
            case 'stats':
                return <SiteStatistics />;
            default:
                return <UserManagement />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex-shrink-0">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                        <Shield /> Admin
                    </h2>
                </div>
                <nav className="mt-6">
                    <ul>
                        <NavItem icon={<Users />} label="User Management" active={activeTab === 'users'} onClick={() => setActiveTab('users')} />
                        <NavItem icon={<FileText />} label="Content Moderation" active={activeTab === 'content'} onClick={() => setActiveTab('content')} />
                        <NavItem icon={<BarChart2 />} label="Site Statistics" active={activeTab === 'stats'} onClick={() => setActiveTab('stats')} />
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 sm:p-8 lg:p-10">
                {renderContent()}
            </main>
        </div>
    );
}

// Sidebar Navigation Item
const NavItem = ({ icon, label, active, onClick }) => (
    <li>
        <button
            onClick={onClick}
            className={`w-full flex items-center px-6 py-3 text-left transition-colors duration-200 ${active ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-r-4 border-indigo-500' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
        >
            {React.cloneElement(icon, { className: "w-5 h-5 mr-3" })}
            <span className="font-medium">{label}</span>
        </button>
    </li>
);

// User Management Component
const UserManagement = () => (
    <div>
        <h1 className="text-3xl font-bold mb-6">User Management</h1>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" placeholder="Search users..." className="pl-10 p-2 border dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700" />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Role</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Joined</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockUsers.map(user => (
                            <tr key={user.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 font-medium">{user.name} <br/><span className="text-xs text-gray-500">{user.email}</span></td>
                                <td className="px-6 py-4">{user.role}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{user.joined}</td>
                                <td className="px-6 py-4 flex space-x-2">
                                    <button className="p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-full"><Edit className="w-4 h-4" /></button>
                                    <button className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-gray-700 rounded-full"><UserX className="w-4 h-4" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

// Content Moderation Component
const ContentModeration = () => (
    <div>
        <h1 className="text-3xl font-bold mb-6">Content Moderation Queue</h1>
        <div className="space-y-4">
            {mockReportedNotes.map(note => (
                <div key={note.id} className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                        <p className="font-bold text-lg">{note.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Uploader: {note.uploader} &bull; Reported: {note.date}</p>
                        <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400 mt-1">Reason: {note.reason}</p>
                    </div>
                    <div className="flex space-x-2 mt-4 sm:mt-0">
                        <button className="px-4 py-2 text-sm font-semibold text-white bg-gray-500 rounded-lg hover:bg-gray-600">Ignore</button>
                        <button className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 flex items-center gap-1"><Trash2 className="w-4 h-4"/> Delete Note</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// Site Statistics Component
const SiteStatistics = () => (
     <div>
        <h1 className="text-3xl font-bold mb-6">Site Statistics</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={<Users className="w-6 h-6 text-indigo-500"/>} label="Total Users" value={siteStats.totalUsers.toLocaleString()} />
            <StatCard icon={<FileText className="w-6 h-6 text-green-500"/>} label="Total Notes" value={siteStats.totalNotes.toLocaleString()} />
            <StatCard icon={<UserCheck className="w-6 h-6 text-blue-500"/>} label="Active Users (24h)" value={siteStats.activeUsersToday.toLocaleString()} />
            <StatCard icon={<UploadCloud className="w-6 h-6 text-purple-500"/>} label="Uploads (24h)" value={siteStats.uploadsToday.toLocaleString()} />
        </div>
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold mb-4">Weekly Activity</h2>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart
                        data={weeklyActivityData}
                        margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: 'rgba(31, 41, 55, 0.8)', 
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '0.5rem',
                            }} 
                        />
                        <Legend />
                        <Bar dataKey="uploads" fill="#818cf8" />
                        <Bar dataKey="signups" fill="#a78bfa" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
);
