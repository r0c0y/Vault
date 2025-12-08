import Link from 'next/link';
import Button from '../shared/Button';
import { ArrowRight, Code2, Layout } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';

export default function Hero() {
    const { user } = useAuth();

    return (
        <section className="relative pt-20 pb-32 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute top-40 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-700"></div>

                {/* Decorative Left Brace */}
                <div className="absolute top-1/2 -translate-y-1/2 -left-20 opacity-20 blur-[1px] select-none">
                    <img src="/assets/brace-left.webp" alt="" className="h-[500px] w-auto animate-pulse-slow" />
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-surface/50 border border-white/5 shadow-glass backdrop-blur-sm mb-8 animate-in fade-in slide-in-from-bottom-5 duration-700 hover:border-white/10 transition-colors cursor-default">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-radar absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]"></span>
                    </span>
                    <span className="text-sm font-medium text-text-primary/90 tracking-wide">Community is Live</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-heading font-bold text-text-primary tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
                    Showcase Your Code <br />
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        To The World
                    </span>
                </h1>

                <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
                    Vault is the ultimate hub for developers to share projects, get feedback, and connect with peers. Build your legacy today.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
                    {user ? (
                        <Link href="/dashboard">
                            <Button className="h-14 px-8 text-lg shadow-glow hover:scale-105 transition-transform">
                                Go to Dashboard
                                <Layout className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    ) : (
                        <Link href="/signup">
                            <Button className="h-14 px-8 text-lg shadow-glow hover:scale-105 transition-transform">
                                Join Vault
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
}
