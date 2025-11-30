import React from 'react';
import Navbar from './Navbar';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-background text-text-primary flex flex-col">
            <Navbar />
            <main className="flex-grow pt-16">
                {children}
            </main>
            <footer className="border-t border-white/5 py-8 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-text-secondary text-sm">
                    <p>&copy; {new Date().getFullYear()} Vault. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
