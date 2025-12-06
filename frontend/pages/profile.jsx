import { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';
import { getMyProjects } from '../lib/api';
import Link from 'next/link';
import { Settings, MapPin, Link as LinkIcon, Github, Twitter, Linkedin } from 'lucide-react';
import Button from '../components/shared/Button';
import Card from '../components/shared/Card';

export default function Profile() {
    const { user, loading: authLoading } = useAuth();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchProjects();
        }
    }, [user]);

    const fetchProjects = async () => {
        try {
            const { data } = await getMyProjects();
            setProjects(data);
        } catch (error) {
            console.error('Failed to fetch projects', error);
        } finally {
            setLoading(false);
        }
    };

    if (authLoading || !user) {
        return null; // Or loading spinner
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Profile Header */}
            <div className="relative mb-20">
                <div className="h-48 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 animate-gradient"></div>
                <div className="absolute -bottom-12 left-8 flex items-end gap-6">
                    <div className="w-32 h-32 rounded-full bg-surface border-4 border-background overflow-hidden shadow-xl">
                        {user.avatarUrl ? (
                            <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-card text-4xl font-bold text-text-secondary">
                                {user.name.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div className="mb-2">
                        <h1 className="text-3xl font-heading font-bold text-text-primary">{user.name}</h1>
                        <p className="text-text-secondary">{user.email}</p>
                    </div>
                </div>
                <div className="absolute bottom-4 right-8">
                    <Button variant="secondary" className="gap-2">
                        <Settings size={18} />
                        Edit Profile
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Sidebar Info */}
                <div className="space-y-8">
                    <div className="bg-card border border-border rounded-2xl p-6">
                        <h3 className="font-heading font-semibold text-text-primary mb-4">About</h3>
                        <p className="text-text-secondary leading-relaxed mb-6">
                            {user.bio || "No bio yet. Tell the world about yourself!"}
                        </p>

                        <div className="space-y-3 text-sm text-text-secondary">
                            <div className="flex items-center gap-3">
                                <MapPin size={18} />
                                <span>Earth, Milky Way</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <LinkIcon size={18} />
                                <a href="#" className="hover:text-primary transition-colors">portfolio.dev</a>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/5 flex gap-4">
                            <a href="#" className="text-text-secondary hover:text-primary transition-colors"><Github size={20} /></a>
                            <a href="#" className="text-text-secondary hover:text-primary transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-text-secondary hover:text-primary transition-colors"><Linkedin size={20} /></a>
                        </div>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-heading font-bold text-text-primary mb-6">Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {projects.map((project) => (
                            <Link key={project.id} href={`/projects/${project.id}`}>
                                <Card className="h-full group cursor-pointer hover:border-primary/30">
                                    <div className="aspect-video bg-surface rounded-xl mb-4 overflow-hidden">
                                        {project.images && project.images.length > 0 ? (
                                            <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface to-card">
                                                <span className="text-text-secondary/20 font-heading font-bold text-xl">V</span>
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-heading font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-text-secondary text-sm line-clamp-2">
                                        {project.description}
                                    </p>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
