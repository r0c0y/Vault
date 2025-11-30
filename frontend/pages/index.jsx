import Head from 'next/head';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-text-primary px-4">
            <Head>
                <title>Vault</title>
            </Head>

            <div className="text-center animate-in fade-in zoom-in duration-500">
                <h1 className="text-6xl md:text-8xl font-heading font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent mb-6">
                    Coming Soon
                </h1>
                <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto">
                    We are building something extraordinary. Stay tuned.
                </p>
            </div>
        </div>
    );
}
