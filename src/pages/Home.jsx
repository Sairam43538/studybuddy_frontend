import React from 'react';
import { BookOpen, UploadCloud, Compass, Users, ArrowRight, Zap, Award, Share2 } from 'lucide-react';

// CORRECTED: Import only the Link component. The Router should be in your main App.jsx
import { Link } from "react-router-dom";

// Helper Component: Feature Card
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
    <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{title}</h3>
    <p className="text-gray-500 dark:text-gray-400">{description}</p>
  </div>
);

// Main Home Page Component
export default function Home() {
  return (
    // FIXED: Removed the <MemoryRouter> wrapper.
    // This component must be rendered inside a router in your main App.jsx file to work correctly.
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-indigo-600" />
              <span className="ml-3 text-2xl font-bold text-gray-800 dark:text-white">StudyBuddy</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/search" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Search Notes</Link>
              <Link to="/roadmaps" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Roadmaps</Link>
              <Link to="/auth" className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">Log In</Link>
              <Link to="/auth" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-md">Sign Up</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main>
        <section className="relative text-center py-24 sm:py-32 lg:py-40 px-4 bg-white dark:bg-gray-800/30 overflow-hidden">
           <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20">
             <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
             <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
             <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
           </div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Unlock Your Potential, <span className="text-indigo-600 dark:text-indigo-400">Together.</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              The ultimate platform for students to share notes, discover learning roadmaps, and collaborate in real-time. Stop searching, start learning.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-full shadow-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/search"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 text-base font-medium text-indigo-600 bg-indigo-100 border border-indigo-200 dark:bg-gray-800 dark:text-indigo-300 dark:border-indigo-600 rounded-full hover:bg-indigo-200 dark:hover:bg-gray-700 transition-all duration-300"
              >
                Explore Notes
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Everything You Need to Succeed</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
                From peer-reviewed notes to AI-powered study tools.
              </p>
            </div>
            <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<UploadCloud className="w-6 h-6 text-blue-500" />}
                title="Share & Discover Notes"
                description="Upload your study materials and access a vast library of notes from peers, upvoted for quality and relevance."
              />
              <FeatureCard
                icon={<Compass className="w-6 h-6 text-green-500" />}
                title="Guided Learning Roadmaps"
                description="Follow curated or AI-generated roadmaps that guide you through subjects step-by-step, from basics to mastery."
              />
              <FeatureCard
                icon={<Zap className="w-6 h-6 text-yellow-500" />}
                title="AI-Powered Tools"
                description="Generate summaries, create question banks, and get instant answers from your notes with our integrated AI assistant."
              />
              <FeatureCard
                icon={<Users className="w-6 h-6 text-purple-500" />}
                title="Collaborative Study Rooms"
                description="Create or join study rooms to discuss topics, solve problems, and prepare for exams with your classmates."
              />
              <FeatureCard
                icon={<Award className="w-6 h-6 text-red-500" />}
                title="Teacher Recommended"
                description="Find trusted content easily with a special badge for notes and materials recommended by verified teachers."
              />
              <FeatureCard
                icon={<Share2 className="w-6 h-6 text-indigo-500" />}
                title="Prevent Duplicates"
                description="Our smart system checks for duplicate uploads, keeping the library clean and ensuring the best version of a note rises to the top."
              />
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-white dark:bg-gray-800/30">
            <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                    <span className="block">Ready to elevate your studies?</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-gray-500 dark:text-gray-400">
                    Join thousands of students and educators on StudyBuddy today.
                </p>
                <Link to="/auth" className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-full shadow-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 sm:w-auto">
                    Create Your Free Account
                </Link>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400">&copy; 2025 StudyBuddy. All rights reserved.</p>
            <div className="mt-4 flex justify-center space-x-6">
                <Link to="/about" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white">About</Link>
                <Link to="/privacy" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white">Privacy</Link>
                <Link to="/terms" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white">Terms</Link>
                <Link to="/contact" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
      
      <style>{`
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
      `}</style>
    </div>
  );
}
