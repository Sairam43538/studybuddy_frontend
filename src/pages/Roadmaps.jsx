import React, { useState, useEffect } from 'react';
import { Compass, Search, ArrowRight, Cpu, UserCheck } from 'lucide-react';

// In your actual app, you would use these imports:
// import { Link } from "react-router-dom";
// import { getRoadmaps } from "../services/roadmapService";

// For standalone preview, we'll create a mock Link component.
const Link = ({ to, children, className }) => <a href={to} className={className}>{children}</a>;

// --- MOCK DATA & API ---
const mockRoadmaps = [
  {
    _id: 'roadmap456',
    title: 'Become a Machine Learning Engineer',
    description: 'A comprehensive path from foundational math to advanced deployment techniques.',
    creator_type: 'TEACHER',
    topic_count: 3,
    tags: ['Data Science', 'AI', 'Python']
  },
  {
    _id: 'roadmap789',
    title: 'Full-Stack Web Developer',
    description: 'Master the MERN stack (MongoDB, Express, React, Node.js) to build complete web applications.',
    creator_type: 'AI',
    topic_count: 5,
    tags: ['Web Dev', 'React', 'JavaScript']
  },
  {
    _id: 'roadmap101',
    title: 'Introduction to Cloud Computing',
    description: 'Learn the fundamentals of cloud services with a focus on AWS and Azure.',
    creator_type: 'TEACHER',
    topic_count: 4,
    tags: ['Cloud', 'DevOps', 'AWS']
  },
   {
    _id: 'roadmap112',
    title: 'Cybersecurity Analyst Pathway',
    description: 'Develop the skills to protect systems, networks, and data from cyber attacks.',
    creator_type: 'AI',
    topic_count: 6,
    tags: ['Security', 'Networking']
  }
];

const getRoadmaps = () => new Promise(resolve => setTimeout(() => resolve(mockRoadmaps), 800));
// --- END MOCK DATA & API ---


// Helper Component: Roadmap Card
const RoadmapCard = ({ roadmap }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden">
    <div className="p-6 flex-grow">
      <div className="flex items-center mb-3">
        <div className={`inline-flex items-center gap-2 mr-3 px-2.5 py-1 rounded-full text-xs font-medium ${roadmap.creator_type === 'TEACHER' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300'}`}>
          {roadmap.creator_type === 'TEACHER' ? <UserCheck className="w-4 h-4" /> : <Cpu className="w-4 h-4" />}
          <span>{roadmap.creator_type}-Curated</span>
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{roadmap.title}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 flex-grow">{roadmap.description}</p>
      <div className="flex flex-wrap gap-2">
        {roadmap.tags.map(tag => (
            <span key={tag} className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 dark:text-gray-300 dark:bg-gray-700 rounded-full">{tag}</span>
        ))}
      </div>
    </div>
    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 border-t dark:border-gray-700">
      <Link to={`/roadmaps/${roadmap._id}`} className="w-full inline-flex items-center justify-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors group">
        View Roadmap
        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  </div>
);

// Helper Component: Skeleton Card for Loading State
const SkeletonCard = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md flex flex-col overflow-hidden animate-pulse">
        <div className="p-6 flex-grow">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-4"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
            <div className="flex flex-wrap gap-2">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
            </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 border-t dark:border-gray-700">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
        </div>
    </div>
);


// Main Roadmaps Page Component
export default function Roadmaps() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getRoadmaps().then(data => {
      setRoadmaps(data);
      setIsLoading(false);
    });
  }, []);

  const filteredRoadmaps = roadmaps.filter(roadmap =>
    roadmap.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    roadmap.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    roadmap.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-10 text-center">
          <Compass className="w-12 h-12 mx-auto text-indigo-500" />
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight mt-4">
            Discover Your Learning Path
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
            Browse our collection of expert-curated and AI-generated roadmaps to guide your studies.
          </p>
        </header>

        {/* Search and Filter Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for roadmaps (e.g., 'React', 'Data Science')..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 pl-12 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Roadmaps Grid */}
        <section>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : filteredRoadmaps.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRoadmaps.map((roadmap) => (
                <RoadmapCard key={roadmap._id} roadmap={roadmap} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
                <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">No roadmaps found for "{searchTerm}"</p>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Try a different search term or check back later!</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
