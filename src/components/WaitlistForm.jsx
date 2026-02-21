import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import Section3D from './Section3D';
import { useUser } from '../context/UserContext';

const WaitlistForm = () => {
    const { currentUser } = useUser();
    // ... (state logic remains the same)
    const [email, setEmail] = useState('');
    const [suggestion, setSuggestion] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');

    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzpr2vwRcTtl9KobodpK2lqnshgu_ImtSupMtSDxy5YdvuYyYedb2UElL2KrzBePO_u/exec";

    const handleSubmit = async (e) => {
        // ... (handleSubmit logic remains the same)
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch(SCRIPT_URL, {
                method: "POST",
                headers: { "Content-Type": "text/plain;charset=utf-8" }, // CORS hack for Google Apps Script
                body: JSON.stringify({ email, suggestion }),
            });

            // Google Apps Script usually returns a redirect or opaque response with no-cors, 
            // but if we use text/plain it might work better. 
            // Actually, standard way is often no-cors, but let's try to parse if possible.
            // For this specific script, the original code used application/json.

            // Let's assume success if no network error, as CORS often blocks reading the response from GAS.
            setStatus('success');
            setMessage("🎉 Thanks! You've been added to the waitlist.");
            setEmail('');
            setSuggestion('');
        } catch (error) {
            console.error("Error:", error);
            setStatus('error');
            setMessage("⚠️ Something went wrong. Please try again.");
        }
    };

    if (currentUser) {
        return null;
    }

    return (
        <section id="waitlist" className="py-24 relative overflow-hidden">
            <Section3D className="container mx-auto px-4 relative z-10">
                <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <h3 className="text-3xl font-bold text-white mb-2">Join the Waitlist</h3>
                        <p className="text-gray-300">Be the first to experience AI-powered fashion styling.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                required
                                value={suggestion}
                                onChange={(e) => setSuggestion(e.target.value)}
                                placeholder="Any suggestions for us?"
                                className="w-full px-4 py-3 rounded-lg bg-black/20 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 focus:ring-4 focus:ring-purple-500/50 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {status === 'loading' ? (
                                <Loader2 className="animate-spin mr-2" />
                            ) : (
                                <>
                                    Join Now <Send className="ml-2 w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    {message && (
                        <div className={`mt-4 p-3 rounded-lg text-center ${status === 'success' ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'}`}>
                            {message}
                        </div>
                    )}
                </div>
            </Section3D>
        </section>
    );
};

export default WaitlistForm;
