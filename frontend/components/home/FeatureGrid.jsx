import { Compass, Users, Share2, Zap, Shield, TrendingUp } from 'lucide-react';

const features = [
    {
        icon: Compass,
        title: "Discover Unlimited Projects",
        description: "Explore a vast library of open-source projects, side hustles, and startup ideas built by community members."
    },
    {
        icon: Users,
        title: "Connect with Builders",
        description: "Find your next co-founder or contributor. Match with developers who share your tech stack and vision."
    },
    {
        icon: Share2,
        title: "Share Your Work",
        description: "Don't let your code gather dust. Showcase your repositories and get valuable feedback from peers."
    },
    {
        icon: Zap,
        title: "Instant Feedback",
        description: "Get real-time votes and comments on your projects. Improve your work based on community insights."
    },
    {
        icon: Shield,
        title: "Build Your Reputation",
        description: "Badges, streaks, and engagement metrics help you stand out to potential employers and collaborators."
    },
    {
        icon: TrendingUp,
        title: "Stay Ahead",
        description: "See what's trending in the developer world. Keep your skills sharp by analyzing top-voted code."
    }
];

export default function FeatureGrid() {
    return (
        <section className="py-24 bg-surface/30 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
                        Why <span className="text-primary">Vault?</span>
                    </h2>
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                        Everything you need to accelerate your developer journey, all in one place.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="p-8 rounded-2xl bg-surface border border-white/5 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
                        >
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-background transition-colors duration-300">
                                <feature.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold font-heading mb-3 text-text-primary">{feature.title}</h3>
                            <p className="text-text-secondary leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
