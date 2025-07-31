import React, { useState } from 'react';
import { LogIn, UserPlus, Eye, EyeOff, Loader2, AlertTriangle } from 'lucide-react';

// In a real app, you would import these from a library like 'react-icons/fa'
const GoogleIcon = () => <svg viewBox="0 0 48 48" className="w-5 h-5"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="M6.306 14.691l6.057 4.844C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 36.49 44 30.861 44 24c0-1.341-.138-2.65-.389-3.917z"></path></svg>;

// Helper Component: Social Login Button
const SocialButton = ({ icon, text }) => (
    <button type="button" className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
        {icon}
        <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-200">{text}</span>
    </button>
);

// --- LIVE API FUNCTIONS ---
const API_BASE_URL = 'https://4087b3f75dcb.ngrok-free.app';

const loginUserApi = async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed.');
    }
    return await response.json();
};

const signupUserApi = async (firstName, lastName, email, password) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ first_name: firstName, last_name: lastName, email, password }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        // Handle specific error messages from the backend
        const errorMessage = Object.values(errorData).flat().join(' ');
        throw new Error(errorMessage || 'Sign up failed.');
    }
    return await response.json();
};
// --- END LIVE API ---


// Main Auth Component
export default function Auth() {
    const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
    const [showPassword, setShowPassword] = useState(false);
    
    // Form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // API state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const isLogin = authMode === 'login';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            if (isLogin) {
                const data = await loginUserApi(email, password);
                // On successful login, save tokens to localStorage
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                setSuccessMessage('Login successful! Redirecting...');
                // In a real app, you'd redirect to the dashboard
                // window.location.href = '/dashboard';
            } else {
                if (password !== confirmPassword) {
                    throw new Error("Passwords do not match.");
                }
                // Splitting name into first and last for the API
                const nameParts = name.split(' ');
                const firstName = nameParts[0];
                const lastName = nameParts.slice(1).join(' ');

                await signupUserApi(firstName, lastName, email, password);
                setSuccessMessage('Account created! Please log in.');
                setAuthMode('login'); // Switch to login tab
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 flex items-center justify-center">
            <div className="max-w-md w-full">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl">
                    {/* Tabs */}
                    <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
                        <button 
                            onClick={() => { setAuthMode('login'); setError(''); setSuccessMessage(''); }}
                            className={`w-1/2 py-4 text-center font-semibold transition-colors ${isLogin ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                        >
                            Login
                        </button>
                        <button 
                            onClick={() => { setAuthMode('signup'); setError(''); setSuccessMessage(''); }}
                            className={`w-1/2 py-4 text-center font-semibold transition-colors ${!isLogin ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {!isLogin && (
                             <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                        )}
                        <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                        
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required 
                                className="w-full p-3 pr-10 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500" 
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        {!isLogin && (
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    required 
                                    className="w-full p-3 pr-10 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500" 
                                />
                            </div>
                        )}

                        {isLogin && (
                            <div className="text-right">
                                <a href="#" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">Forgot Password?</a>
                            </div>
                        )}

                        {error && (
                            <div className="flex items-center p-3 bg-red-100 dark:bg-red-900/50 rounded-lg">
                                <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                                <p className="text-sm font-medium text-red-700 dark:text-red-300">{error}</p>
                            </div>
                        )}
                        
                        {successMessage && !error && (
                             <div className="flex items-center p-3 bg-green-100 dark:bg-green-900/50 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                                <p className="text-sm font-medium text-green-700 dark:text-green-300">{successMessage}</p>
                            </div>
                        )}

                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center p-3 text-base font-bold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (isLogin ? 'Login' : 'Create Account')}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center my-8">
                        <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                        <span className="flex-shrink mx-4 text-sm font-medium text-gray-400">OR</span>
                        <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                    </div>

                    {/* Social Logins */}
                    <div className="space-y-4">
                        <SocialButton icon={<GoogleIcon />} text="Continue with Google" />
                    </div>
                </div>
            </div>
        </div>
    );
}
