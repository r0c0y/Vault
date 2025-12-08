import Link from 'next/link';
import dynamic from 'next/dynamic';
import animationData from '../public/assets/404-lottie.json';
import Button from '../components/shared/Button';
import { Home } from 'lucide-react';

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function Custom404() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full max-h-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 text-center max-w-md w-full">
                {/* Lottie Animation with better visibility */}
                <div className="w-80 h-80 mx-auto mb-8 bg-surface/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                    <Lottie
                        animationData={animationData}
                        loop={true}
                        className="w-full h-full"
                    />
                </div>

                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-text-primary">
                    Lost in the <span className="text-primary">Vault?</span>
                </h1>

                <p className="text-text-secondary text-lg mb-8">
                    The page you're looking for seems to have vanished into the void. Let's get you back on track.
                </p>

                <Link href="/">
                    <Button className="mx-auto shadow-glow group">
                        <Home className="w-5 h-5 mr-2 group-hover:-translate-y-1 transition-transform duration-300" />
                        Return Home
                    </Button>
                </Link>
            </div>
        </div>
    );
}
