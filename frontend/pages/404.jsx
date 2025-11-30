import Link from 'next/link';
import Head from 'next/head';
import { Compass } from 'lucide-react';

export default function Custom404() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-text-primary px-4 text-center">
            <Head>
                <title>404 - Page Not Found | Vault</title>
            </Head>

            <div className="mb-8 relative">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
                <Compass size={80} className="text-primary relative z-10 animate-pulse" />
            </div>

            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                Lost in the Vault?
            </h1>

            <p className="text-lg text-text-secondary max-w-md mb-8">
                It seems you've ventured into an empty vault. This page doesn't exist or has been moved.
            </p>

            <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors text-lg font-medium">
                Return to Home
            </Link>
        </div>
    );
}
