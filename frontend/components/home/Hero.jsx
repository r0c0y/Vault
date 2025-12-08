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
                <div className="absolute bottom-0 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-700"></div>
            </div>

            {/* Decorative Braces */}
            {/* Left Brace */}
            <div className="absolute top-10 left-0 w-64 h-auto opacity-20 blur-[1px] pointer-events-none hidden lg:block">
                <img
                    src="/assets/opening-brace.webp"
                    alt=""
                    className="w-full h-auto animate-pulse-slow"
                />
            </div>

            {/* Right Brace - Flipped */}
            <div className="absolute top-10 right-0 w-64 h-auto opacity-20 blur-[1px] pointer-events-none hidden lg:block transform scale-x-[-1]">
                <img
                    src="/assets/opening-brace.webp"
                    alt=""
                    className="w-full h-auto animate-pulse-slow"
                />
            </div>


            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

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
