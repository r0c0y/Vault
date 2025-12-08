import Link from 'next/link';
import Button from '../shared/Button';
import { useAuth } from '../../lib/AuthContext';
import { useState } from 'react';
import API from '../../lib/api';
import useSound from '../../hooks/useSound';
import { Mail, ArrowRight, Loader2, CheckCircle } from 'lucide-react';

export default function CallToAction() {
    const { user } = useAuth();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');
    const playSuccess = useSound('/sounds/pop.mp3');

    const handleMascotClick = () => {
        alert('🤖 AI Features Coming Soon! Stay tuned for exciting updates.');
    };

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        try {
            await API.post('/newsletter/subscribe', { email });
            setStatus('success');
            playSuccess(); // Audio feedback
            setEmail('');
            setMessage('Thanks for joining! We\'ll keep you posted.');
        } catch (error) {
            setStatus('error');
            setMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
        }
    };

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-0 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-700"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                    Ready to Ship?
                </h2>
                <p className="text-xl text-text-secondary mb-10">
                    Join thousands of developers sharing their journey. It's free and open source.
                </p>

                {/* Main Action Button */}
                <div className="mb-12">
                    {user ? (
                        <Link href="/explore">
                            <Button className="h-14 px-10 text-lg shadow-glow hover:scale-105 transition-transform">
                                Explore Projects
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    ) : (
                        <Link href="/signup">
                            <Button className="h-14 px-10 text-lg shadow-glow hover:scale-105 transition-transform">
                                Get Started
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Early Access / Newsletter Section - Horizontal & Compact */}
                <div className="max-w-2xl mx-auto">
                    <div className="bg-surface/50 backdrop-blur-sm border border-white/10 rounded-xl p-1 relative overflow-hidden group hover:border-primary/20 focus-within:border-primary/50 focus-within:shadow-glow transition-all duration-300">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-2 p-2">
                            <div className="flex-1 flex items-center gap-3 px-4 py-2 w-full">
                                <Mail size={20} className="text-text-secondary shrink-0" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email for early access..."
                                    className="bg-transparent border-none outline-none text-text-primary placeholder:text-text-secondary w-full"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                variant="secondary"
                                className="w-full sm:w-auto px-6 whitespace-nowrap min-w-[140px]"
                                disabled={status === 'loading' || status === 'success'}
                            >
                                {status === 'loading' ? (
                                    <Loader2 className="animate-spin w-5 h-5 mx-auto" />
                                ) : status === 'success' ? (
                                    <span className="flex items-center gap-2 text-green-400">
                                        <CheckCircle size={18} /> Joined
                                    </span>
                                ) : (
                                    'Join Waitlist'
                                )}
                            </Button>
                        </form>
                    </div>
                    {status === 'error' && (
                        <p className="mt-3 text-sm text-red-400 animate-in fade-in">{message}</p>
                    )}
                    {status === 'success' && (
                        <p className="mt-3 text-sm text-green-400 animate-in fade-in">{message}</p>
                    )}
                </div>
            </div>

            {/* Mimo Mascot - positioned relative to section, not the constrained container */}
            <div className="absolute bottom-8 right-4 hidden md:block select-none pointer-events-none z-40">
                <img
                    src="/assets/mimo.png"
                    alt="Mimo Mascot"
                    className="w-12 h-12 object-contain opacity-80 hover:opacity-100 transition-opacity"
                    style={{
                        animation: 'subtle-bounce 4s ease-in-out infinite'
                    }}
                />
            </div>
            <style jsx>{`
                @keyframes subtle-bounce {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-8px); }
                }
            `}</style>
        </section>
    );
}
