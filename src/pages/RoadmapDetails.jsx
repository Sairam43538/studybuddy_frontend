import React, { useState, useEffect } from 'react';
import { ChevronDown, Award, ExternalLink, Cpu, UserCheck, BookOpen, Star, CheckCircle } from 'lucide-react';

// In your actual app, you would use these imports:
// import { useParams, Link } from "react-router-dom";
// import { getRoadmapDetails } from "../services/roadmapService";

// For standalone preview, we'll create a mock Link component.
const Link = ({ to, children, className }) => <a href={to} className={className}>{children}</a>;

// --- MOCK DATA & API (NEW HIERARCHICAL STRUCTURE) ---
const mockHierarchicalRoadmap = {
  _id: 'roadmap456',
  title: 'Become a Machine Learning Engineer',
  creator_type: 'TEACHER',
  description: 'A comprehensive roadmap covering everything from foundational mathematics to advanced deployment techniques. Curated by top educators.',
  topics: [
    {
      _id: 'topic1',
      title: 'Foundational Mathematics',
      description: 'The essential math concepts that form the bedrock of machine learning.',
      notes: [
        { _id: 'noteA1', title: 'Complete Linear Algebra Notes', uploader: 'Prof. Anand', upvotes: 256, is_teacher_recommended: true },
        { _id: 'noteA2', title: 'Calculus for ML - Cheat Sheet', uploader: 'user_x', upvotes: 189, is_teacher_recommended: false },
        { _id: 'noteA3', title: 'Probability & Statistics Guide', uploader: 'user_y', upvotes: 152, is_teacher_recommended: false },
      ]
    },
    {
      _id: 'topic2',
      title: 'Core Machine Learning Algorithms',
      description: 'Understanding and implementing the most common ML algorithms from scratch.',
      notes: [
        { _id: 'noteB1', title: 'In-depth: Linear & Logistic Regression', uploader: 'Prof. Anand', upvotes: 312, is_teacher_recommended: true },
        { _id: 'noteB2', title: 'Guide to Decision Trees & Random Forests', uploader: 'user_z', upvotes: 240, is_teacher_recommended: false },
      ]
    },
    {
      _id: 'topic3',
      title: 'Deep Learning & Neural Networks',
      description: 'An introduction to the world of deep learning.',
      notes: [
        { _id: 'noteC1', title: 'Building Your First Neural Network', uploader: 'Prof. Anand', upvotes: 450, is_teacher_recommended: true },
        { _id: 'noteC2', title: 'Understanding Backpropagation', uploader: 'user_c', upvotes: 210, is_teacher_recommended: false },
      ]
    }
  ],
  external_certificates: [
    { _id: 'cert1', type: 'paid', provider: 'Coursera', name: 'Deep Learning Specialization', link: '#', cost: '$49/month' },
    { _id: 'cert2', type: 'paid', provider: 'Google', name: 'TensorFlow Developer Certificate', link: '#', cost: '$100 (Exam Fee)' },
    { _id: 'cert3', type: 'free', provider: 'Kaggle', name: 'Intro to Machine Learning Course', link: '#', cost: 'Free' },
    { _id: 'cert4', type: 'free', provider: 'freeCodeCamp', name: 'Machine Learning with Python', link: '#', cost: 'Free' },
  ],
};

const getRoadmapDetails = (id) => new Promise(resolve => setTimeout(() => resolve(mockHierarchicalRoadmap), 500));
// --- END MOCK DATA & API ---


// Helper Component: Note Card
const NoteCard = ({ note }) => (
  <Link to={`/notes/${note._id}`} className="block p-4 mb-3 bg-white dark:bg-gray-800/80 rounded-lg shadow-sm hover:shadow-md hover:border-indigo-500 dark:hover:bg-gray-700/60 border border-transparent transition-all duration-300">
    <div className="flex justify-between items-start">
      <div>
        <div className="flex items-center">
            {note.is_teacher_recommended && <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" title="Teacher Recommended" />}
            <h4 className="font-semibold text-gray-800 dark:text-white">{note.title}</h4>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Uploaded by: {note.uploader}</p>
      </div>
      <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 mt-1 flex-shrink-0 ml-4">
        <Star className="w-4 h-4 text-yellow-400" />
        <span className="font-medium text-sm">{note.upvotes}</span>
      </div>
    </div>
  </Link>
);

// Helper Component: Accordion Item
const AccordionItem = ({ topic, isOpen, onToggle }) => (
  <div className="border border-gray-200 dark:border-gray-700 rounded-2xl mb-4 overflow-hidden shadow-sm bg-white dark:bg-gray-800">
    <button
      onClick={onToggle}
      className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
    >
      <div className="flex items-center">
         <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg mr-4">
            <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
         </div>
         <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">{topic.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{topic.description}</p>
         </div>
      </div>
      <ChevronDown className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    {isOpen && (
      <div className="p-6 pt-0">
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            {topic.notes.length > 0 ? (
                topic.notes.map(note => <NoteCard key={note._id} note={note} />)
            ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No notes available for this topic yet.</p>
            )}
        </div>
      </div>
    )}
  </div>
);

// Helper Component: Certificate Card
const CertificateCard = ({ cert }) => (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm flex items-center justify-between">
        <div>
            <p className="font-semibold text-gray-800 dark:text-white">{cert.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{cert.provider} &bull; <span className="font-medium">{cert.cost}</span></p>
        </div>
        <a href={cert.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
            View <ExternalLink className="w-4 h-4 ml-2" />
        </a>
    </div>
);


// Main Roadmap Details Component
export default function RoadmapDetails() {
  const [roadmap, setRoadmap] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openTopicId, setOpenTopicId] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getRoadmapDetails('roadmap456').then((res) => {
      setRoadmap(res);
      // Open the first topic by default
      if (res && res.topics && res.topics.length > 0) {
        setOpenTopicId(res.topics[0]._id);
      }
      setIsLoading(false);
    });
  }, []);

  const handleToggleTopic = (topicId) => {
    setOpenTopicId(openTopicId === topicId ? null : topicId);
  };

  if (isLoading) return <p className="text-center p-10">Loading Roadmap...</p>;
  if (!roadmap) return <p className="text-center p-10">Roadmap not found.</p>;
  
  const paidCerts = roadmap.external_certificates.filter(c => c.type === 'paid');
  const freeCerts = roadmap.external_certificates.filter(c => c.type === 'free');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-10 text-center">
          <div className="inline-flex items-center gap-3 mb-2 bg-indigo-100 dark:bg-indigo-900/50 px-3 py-1 rounded-full">
             {roadmap.creator_type === 'AI' ? 
                <Cpu className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> : 
                <UserCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
             }
             <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
               {roadmap.creator_type}-Curated Roadmap
             </span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight">{roadmap.title}</h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">{roadmap.description}</p>
        </header>

        {/* Learning Materials Section */}
        <section>
             <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Learning Materials</h2>
            {roadmap.topics.map(topic => (
                <AccordionItem 
                    key={topic._id} 
                    topic={topic} 
                    isOpen={openTopicId === topic._id} 
                    onToggle={() => handleToggleTopic(topic._id)}
                />
            ))}
        </section>

        {/* Certifications Section */}
        <section className="mt-16">
            <div className="text-center mb-8">
                <Award className="w-10 h-10 mx-auto text-yellow-500" />
                <h2 className="text-2xl font-bold mt-4 text-gray-800 dark:text-white">Related Certifications</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Validate your skills with these official certificates.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Paid Certifications */}
                <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Paid Certificates</h3>
                    <div className="space-y-4">
                        {paidCerts.length > 0 ? paidCerts.map(cert => <CertificateCard key={cert._id} cert={cert} />) : <p>No paid certificates listed.</p>}
                    </div>
                </div>
                {/* Free Certifications */}
                <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Free Courses & Certificates</h3>
                    <div className="space-y-4">
                        {freeCerts.length > 0 ? freeCerts.map(cert => <CertificateCard key={cert._id} cert={cert} />) : <p>No free certificates listed.</p>}
                    </div>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
}
