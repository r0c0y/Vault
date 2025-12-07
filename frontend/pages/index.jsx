import Head from 'next/head';
import Hero from '../components/home/Hero';
import FeatureGrid from '../components/home/FeatureGrid';
import CallToAction from '../components/home/CallToAction';

export default function Home() {
    return (
        <div className="min-h-screen bg-background">
            <Head>
                <title>Vault - Share. Connect. Build.</title>
                <meta name="description" content="Showcase your coding projects and connect with other developers." />
            </Head>

            <main>
                <Hero />
                <FeatureGrid />
                <CallToAction />
            </main>
        </div>
    );
}
