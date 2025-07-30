import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, X, Loader2, CheckCircle, AlertTriangle, CopyCheck } from 'lucide-react';

// --- MOCK API & DATA ---
// This section simulates your backend API for demonstration.
const mockDuplicateNote = {
    _id: 'noteXYZ',
    title: 'Thermodynamics Final Cheatsheet.pdf',
    upvote_count: 42,
    is_teacher_recommended: true,
};

// This simulates the API call to upload a note.
const uploadNoteApi = (file, details) => {
    return new Promise((resolve, reject) => {
        console.log("Uploading:", file.name, "with details:", details);
        setTimeout(() => {
            const random = Math.random();
            if (random < 0.7) { // 70% chance of success
                resolve({ status: 'success', message: 'File uploaded successfully!' });
            } else if (random < 0.9) { // 20% chance of duplicate
                resolve({ status: 'duplicate_found', duplicate: mockDuplicateNote });
            } else { // 10% chance of error
                reject({ status: 'error', message: 'Upload failed. Please try again.' });
            }
        }, 1500);
    });
};
// --- END MOCK API ---


// Helper Component: Duplicate Found Modal
const DuplicateFoundModal = ({ isOpen, duplicateNote, onCancelAndUpvote, onUploadAnyway }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-lg w-full transform transition-all animate-modal-in">
                <div className="text-center">
                    <CopyCheck className="h-12 w-12 mx-auto text-yellow-500" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">Potential Duplicate Found</h3>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">Our system found a very similar note. Is this the same file?</p>
                </div>

                <div className="mt-6 border-t border-b border-gray-200 dark:border-gray-700 py-4 px-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <p className="font-bold text-lg text-gray-800 dark:text-white">{duplicateNote.title}</p>
                    <div className="flex justify-between items-center mt-2 text-sm">
                        <span className="font-medium text-gray-600 dark:text-gray-300">Upvotes: {duplicateNote.upvote_count}</span>
                        {duplicateNote.is_teacher_recommended && (
                             <span className="flex items-center font-semibold text-green-600 dark:text-green-400">
                                <CheckCircle className="w-4 h-4 mr-1.5" /> Teacher Recommended
                            </span>
                        )}
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button onClick={onCancelAndUpvote} className="w-full px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition-all">
                        Cancel & Upvote Existing
                    </button>
                    <button onClick={onUploadAnyway} className="w-full px-6 py-3 text-base font-medium text-indigo-700 bg-indigo-100 dark:bg-gray-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-gray-600 transition-all">
                        Upload Anyway
                    </button>
                </div>
            </div>
             <style jsx global>{`
                @keyframes modal-in { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
                .animate-modal-in { animation: modal-in 0.3s ease-out forwards; }
            `}</style>
        </div>
    );
};


// Main Notes Upload Component
export default function NotesUpload() {
    const [title, setTitle] = useState("");
    const [keywords, setKeywords] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [unit, setUnit] = useState("");
    const [file, setFile] = useState(null);
    
    // 'idle', 'uploading', 'success', 'error', 'duplicate_found'
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');
    const [duplicateNote, setDuplicateNote] = useState(null);

    const onDrop = useCallback(acceptedFiles => {
        setFile(acceptedFiles[0]);
        setStatus('idle');
        setMessage('');
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'], 'application/vnd.ms-powerpoint': ['.ppt', '.pptx'], 'application/msword': ['.doc', '.docx'] },
        maxFiles: 1,
    });

    const removeFile = () => {
        setFile(null);
    };

    const resetForm = () => {
        setTitle('');
        setKeywords('');
        setCourseCode('');
        setUnit('');
        setFile(null);
        setStatus('idle');
        setMessage('');
        setDuplicateNote(null);
    };
    const formatSize = (size) => 
    size > 1024 * 1024 
        ? `${(size / (1024 * 1024)).toFixed(2)} MB` 
        : `${(size / 1024).toFixed(2)} KB`;

    const handleUpload = async (forceUpload = false) => {
        if (!file) {
            setStatus('error');
            setMessage('Please select a file to upload.');
            return;
        }
        
        setStatus('uploading');
        setMessage('');

        try {
            const result = await uploadNoteApi(file, { title, keywords, courseCode, unit, forceUpload });
            if (result.status === 'duplicate_found') {
                setDuplicateNote(result.duplicate);
                setStatus('duplicate_found');
            } else {
                setStatus('success');
                setMessage(result.message);
                setTimeout(resetForm, 3000);
            }
        } catch (error) {
            setStatus('error');
            setMessage(error.message || 'An unknown error occurred.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
            <div className="max-w-2xl w-full">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl">
                    <div className="text-center mb-8">
                        <UploadCloud className="w-12 h-12 mx-auto text-indigo-500" />
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-4">Upload Study Material</h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">Share your notes and help the community grow.</p>
                    </div>

                    <div className="space-y-6">
                        {/* File Dropzone */}
                        <div {...getRootProps()} className={`p-8 border-2 border-dashed rounded-xl text-center cursor-pointer transition-colors ${isDragActive ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400'}`}>
                            <input {...getInputProps()} />
                            {file ? (
                                <div className="flex flex-col items-center">
                                    <FileText className="w-10 h-10 text-indigo-500" />
                                    <p className="mt-2 font-semibold text-gray-700 dark:text-gray-200">{file.name}</p>
                                    <p className="text-sm text-gray-500">{formatSize(file.size)}</p>
                                    <button onClick={removeFile} className="mt-3 text-sm font-semibold text-red-500 hover:text-red-700 flex items-center gap-1">
                                        <X className="w-4 h-4" /> Remove File
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <UploadCloud className="w-10 h-10 text-gray-400" />
                                    <p className="mt-2 font-semibold text-gray-600 dark:text-gray-300">Drag & drop a file here, or click to select</p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">PDF, DOCX, PPTX supported</p>
                                </div>
                            )}
                        </div>

                        {/* Form Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input type="text" placeholder="Note Title*" value={title} onChange={e => setTitle(e.target.value)} required className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                            <input type="text" placeholder="Keywords (comma-separated)*" value={keywords} onChange={e => setKeywords(e.target.value)} required className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                            <input type="text" placeholder="Course Code (e.g., CS-303)" value={courseCode} onChange={e => setCourseCode(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                            <input type="number" placeholder="Unit (e.g., 3)" value={unit} onChange={e => setUnit(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                        </div>

                        {/* Status Messages */}
                        {message && (
                            <div className={`p-3 rounded-lg text-center font-medium text-sm ${status === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'}`}>
                                {message}
                            </div>
                        )}

                        {/* Upload Button */}
                        <button 
                            onClick={() => handleUpload()}
                            disabled={!file || !title || !keywords || status === 'uploading'}
                            className="w-full flex items-center justify-center p-4 text-lg font-bold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {status === 'uploading' ? (
                                <>
                                    <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                                    Uploading...
                                </>
                            ) : 'Upload Note'}
                        </button>
                    </div>
                </div>
            </div>

            <DuplicateFoundModal 
                isOpen={status === 'duplicate_found'}
                duplicateNote={duplicateNote}
                onCancelAndUpvote={() => {
                    console.log("Action: Cancel and Upvote");
                    resetForm();
                }}
                onUploadAnyway={() => {
                    console.log("Action: Upload Anyway");
                    handleUpload(true); // Force upload
                }}
            />
        </div>
    );
}
