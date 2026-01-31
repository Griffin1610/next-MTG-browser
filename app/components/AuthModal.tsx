'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

interface AuthModalProps {
    isSignUp: boolean;
    onClose: () => void;
    onToggleMode: () => void;
}

export default function AuthModal({ isSignUp, onClose, onToggleMode }: AuthModalProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isSignUp) {
                const res = await fetch('/api/auth/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password, name }),
                });
                const data = await res.json();
                if (!res.ok) {
                    setError(data.error || 'Signup failed');
                    setLoading(false);
                    return;
                }
            }

            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError('Invalid email or password');
            } else {
                onClose();
            }
        } catch {
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
            onClick={onClose}
        >
            <div
                className="bg-stone-900 border border-stone-700 rounded-lg p-6 w-full max-w-sm mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-serif text-white mb-4">
                    {isSignUp ? 'Create Account' : 'Log In'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-3">
                    {isSignUp && (
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full bg-stone-800 border border-stone-600 rounded px-3 py-2 text-white placeholder-stone-500 focus:outline-none focus:border-stone-400"
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-stone-800 border border-stone-600 rounded px-3 py-2 text-white placeholder-stone-500 focus:outline-none focus:border-stone-400"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full bg-stone-800 border border-stone-600 rounded px-3 py-2 text-white placeholder-stone-500 focus:outline-none focus:border-stone-400"
                    />

                    {error && <p className="text-red-400 text-sm">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-700 hover:bg-red-600 disabled:bg-stone-600 text-white py-2 rounded transition-colors"
                    >
                        {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Log In'}
                    </button>
                </form>

                <p className="text-stone-400 text-sm mt-3 text-center">
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button onClick={onToggleMode} className="text-red-400 hover:underline">
                        {isSignUp ? 'Log In' : 'Sign Up'}
                    </button>
                </p>
            </div>
        </div>
    );
}
