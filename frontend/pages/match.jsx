import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../lib/AuthContext';
import { getRandomProjects } from '../lib/api';
import Button from '../components/shared/Button';
import Card from '../components/shared/Card';
import { Compass, ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';

export default function Match() {
    const { user, loading: authLoading, authFetch } = useAuth();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [animating, setAnimating] = useState(false);

    const fetchProjects = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getRandomProjects();
            // Ensure we have exactly 2 projects (or handle < 2 gracefully)
            if (res.data && res.data.length >= 2) {
                setProjects(res.data.slice(0, 2));
            } else {
                setProjects([]);
            }
        } catch (error) {
            console.error('Failed to fetch match projects', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!authLoading && user) {
            fetchProjects();
        }
    }, [user, authLoading, fetchProjects]);

    const handleVote = async (selectedId) => {
        if (animating) return;
        setAnimating(true);

        try {
            // Use authFetch to handle token refresh automatically
            await authFetch(`/projects/${selectedId}/vote`, { method: 'POST' });

            // Simple timeout to simulate animation before fetching new pair
            setTimeout(() => {
                setAnimating(false);
                fetchProjects();
            }, 500);
        } catch (error) {
            console.error('Vote failed', error);
            setAnimating(false);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
                <Compass size={64} className="text-primary mb-6" />
                <h1 className="text-3xl font-heading font-bold text-text-primary mb-4">Match Projects</h1>
                <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-6 py-3 rounded-xl text-lg font-medium mb-8">
                    Please login to use the Match feature
                </div>
                <Link href="/login">
                    <Button>Log in to Continue</Button>
                </Link>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (projects.length < 2) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
                <Compass size={64} className="text-primary mb-6" />
                <h1 className="text-3xl font-heading font-bold text-text-primary mb-4">No more matches!</h1>
                <p className="text-text-secondary mb-8 max-w-md">
                    We've run out of project pairs to show you right now. Check back later or explore manually.
                </p>
                <Link href="/explore">
                    <Button>Go to Explore</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-4 flex flex-col items-center">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-heading font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent mb-4">Pick Your Favorite</h1>
                <p className="text-text-secondary text-lg">Choose the project that catches your eye. Click to vote!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl w-full relative">
                {/* VS Badge */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-background border-4 border-primary rounded-full w-16 h-16 flex items-center justify-center shadow-glow hidden md:flex transition-transform hover:scale-110">
                    <span className="font-heading font-bold text-xl text-primary">VS</span>
                </div>

                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        className={`transition-all duration-500 ease-in-out transform ${animating
                            ? 'opacity-0 scale-95 blur-sm' // Exit state: Fade out, shrink slightly, blur
                            : 'opacity-100 scale-100 blur-0' // Enter state: Full visibility
                            }`}
                        style={{ transitionDelay: animating ? '0ms' : `${index * 150}ms` }}
                    >
                        <Card className="h-full flex flex-col hover:border-primary/50 transition-all duration-300 group relative overflow-hidden hover:shadow-2xl hover:-translate-y-1">
                            {/* Image */}
                            <div className="aspect-video bg-surface rounded-xl mb-6 overflow-hidden relative">
                                {project.images && project.images.length > 0 ? (
                                    <img
                                        src={project.images[0]}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface to-card">
                                        <Compass className="text-text-secondary/20" size={48} />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                                            onClick={(e) => e.stopPropagation()}
                                            title="View Live Site"
                                        >
                                            <ExternalLink size={20} />
                                        </a>
                                    )}
                                    {project.repoUrl && (
                                        <a
                                            href={project.repoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                                            onClick={(e) => e.stopPropagation()}
                                            title="View Code"
                                        >
                                            <Github size={20} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 flex flex-col">
                                <div className="flex items-start justify-between mb-2">
                                    <h2 className="text-2xl font-heading font-bold text-text-primary group-hover:text-primary transition-colors">{project.title}</h2>
                                </div>

                                <p className="text-text-secondary mb-6 line-clamp-3 flex-1">{project.description}</p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.techStack.slice(0, 4).map((tech, i) => (
                                        <span key={i} className="text-xs px-2 py-1 rounded-md bg-surface text-text-secondary border border-white/5">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <Button
                                    onClick={() => handleVote(project.id)}
                                    className="w-full py-4 text-lg text-white font-medium shadow-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90 active:scale-95 transition-all"
                                >
                                    Vote Project
                                </Button>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}
