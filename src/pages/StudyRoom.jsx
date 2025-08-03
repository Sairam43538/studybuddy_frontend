import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Send, UserCircle, ShieldAlert, Hash } from 'lucide-react';

// --- MOCK DATA ---
const mockRoomDetails = {
    'quantum-mechanics-revision': {
        name: 'Quantum Mechanics Revision',
        participants: [
            { id: 1, name: 'Anand K.', avatar: 'A' },
            { id: 2, name: 'Priya S.', avatar: 'P' },
            { id: 3, name: 'You', avatar: 'Y' },
            { id: 4, name: 'Rohan V.', avatar: 'R' },
        ],
        messages: [
            { id: 'msg1', userId: 1, text: "Hey everyone, ready to start?", timestamp: "5:30 PM" },
            { id: 'msg2', userId: 2, text: "Yep! I'm a bit stuck on wave-particle duality.", timestamp: "5:31 PM" },
            { id: 'msg3', userId: 3, text: "I can help with that. I found a great resource, let me find the link.", timestamp: "5:32 PM" },
            { id: 'msg4', userId: 1, text: "Awesome, thanks!", timestamp: "5:32 PM" },
        ]
    }
};
// --- END MOCK DATA ---

// Helper Component: Message Bubble
const MessageBubble = ({ message, isCurrentUser }) => (
    <div className={`flex items-end gap-2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
        {!isCurrentUser && (
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0 flex items-center justify-center font-bold text-sm">
                {/* Placeholder for avatar */}
                {message.userName.charAt(0)}
            </div>
        )}
        <div className={`px-4 py-2 rounded-2xl max-w-sm ${isCurrentUser ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white dark:bg-gray-700 rounded-bl-none'}`}>
            <p className="text-sm">{message.text}</p>
            <p className={`text-xs mt-1 ${isCurrentUser ? 'text-indigo-200' : 'text-gray-400'}`}>{message.timestamp}</p>
        </div>
    </div>
);


export default function StudyRoom() {
  const { id } = useParams();
  const room = mockRoomDetails[id] || { name: 'Unknown Room', participants: [], messages: [] };
  
  // Add user names to messages for display
  const messagesWithUsers = room.messages.map(msg => ({
      ...msg,
      userName: room.participants.find(p => p.id === msg.userId)?.name || 'User'
  }));

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex items-center justify-between flex-shrink-0 z-10">
            <div className="flex items-center">
                <Hash className="w-6 h-6 text-gray-400 mr-2"/>
                <h2 className="text-xl font-bold">{room.name}</h2>
            </div>
            <div className="flex items-center">
                <div className="flex -space-x-2 mr-4">
                    {room.participants.slice(0, 4).map(p => (
                         <div key={p.id} className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm font-bold border-2 border-white dark:border-gray-800" title={p.name}>
                            {p.avatar}
                         </div>
                    ))}
                </div>
                <span className="font-medium text-gray-600 dark:text-gray-300">{room.participants.length} members</span>
            </div>
        </header>

        {/* Admin Visibility Notice */}
        <div className="bg-yellow-100 dark:bg-yellow-900/50 border-b-2 border-yellow-300 dark:border-yellow-700 p-3 text-center flex items-center justify-center gap-3">
            <ShieldAlert className="w-5 h-5 text-yellow-700 dark:text-yellow-300 flex-shrink-0"/>
            <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Please be respectful. For safety and moderation, Admins may review the chat history of any study room.
            </p>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex overflow-hidden">
            {/* Chat Messages */}
            <main className="flex-1 p-6 flex flex-col">
                <div className="flex-1 space-y-4 overflow-y-auto pr-4">
                    {messagesWithUsers.map(msg => (
                        <MessageBubble key={msg.id} message={msg} isCurrentUser={msg.userId === 3} />
                    ))}
                </div>
                
                {/* Message Input */}
                <div className="mt-6 flex items-center gap-2">
                    <input 
                        type="text"
                        placeholder="Type your message..."
                        className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <button className="p-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
                        <Send className="w-6 h-6" />
                    </button>
                </div>
            </main>

            {/* Participants Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-6 hidden md:block">
                <h3 className="text-lg font-bold mb-4">Participants</h3>
                <ul className="space-y-3">
                    {room.participants.map(p => (
                        <li key={p.id} className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm font-bold">
                                {p.avatar}
                            </div>
                            <span className="font-medium text-gray-700 dark:text-gray-200">{p.name}</span>
                        </li>
                    ))}
                </ul>
            </aside>
        </div>
    </div>
  );
}
