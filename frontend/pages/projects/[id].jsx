import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getProjectById } from '../../lib/api';
import { useAuth } from '../../lib/AuthContext';
import Button from '../../components/shared/Button';
import { ArrowLeft, Calendar, Eye, Share2, UserPlus, Github, Globe, ExternalLink, ThumbsUp, MessageSquare, FileText } from 'lucide-react';
import Link from 'next/link';

export default function ProjectView() {
    const router = useRouter();
    const { id } = router.query;
    const { user } = useAuth();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [inviteSent, setInviteSent] = useState(false);

    useEffect(() => {
        if (id) {
            fetchProject();
        }
    }, [id]);

    const fetchProject = async () => {
        try {
            const { data } = await getProjectById(id);
            setProject(data);
        } catch (error) {
            console.error('Failed to fetch project', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInvite = () => {
        setInviteSent(true);
        setTimeout(() => setInviteSent(false), 3000);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-2xl font-bold text-text-primary mb-4">Project not found</h1>
                <Link href="/explore">
                    <Button variant="secondary">Back to Explore</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link href="/explore" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8 transition-colors">
                <ArrowLeft size={18} />
                Back to Explore
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Header */}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
                            {project.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-text-secondary text-sm">
                            <Link href={`/user/${project.user.id}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                                <div className="w-6 h-6 rounded-full bg-surface border border-border flex items-center justify-center overflow-hidden">
                                    {project.user.avatarUrl ? (
                                        <img src={project.user.avatarUrl} alt={project.user.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-[10px] font-bold">{project.user.name.charAt(0)}</span>
                                    )}
                                </div>
                                <span>{project.user.name}</span>
                            </Link>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                                <Calendar size={14} />
                                <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                                <Eye size={14} />
                                <span>{project.viewCount} views</span>
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    {project.images && project.images.length > 0 && (
                        <div className="aspect-video rounded-2xl overflow-hidden border border-border shadow-glass">
                            <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover" />
                        </div>
                    )}

                    {/* Description */}
                    <div className="prose prose-invert max-w-none">
                        <h3 className="text-xl font-heading font-semibold text-text-primary mb-4">About this project</h3>
                        <p className="text-text-secondary leading-relaxed whitespace-pre-wrap">
                            {project.description}
                        </p>
                        {project.documentUrl && (
                            <a
                                href={project.documentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface border border-border text-text-primary font-medium hover:border-primary/50 transition-all duration-200"
                            >
                                <FileText size={20} />
                                View Documentation
                            </a>
                        )}
                    </div>

                    {/* Tech Stack */}
                    <div>
                        <h3 className="text-xl font-heading font-semibold text-text-primary mb-4">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech, i) => (
                                <span key={i} className="px-3 py-1.5 rounded-lg bg-surface border border-border text-text-secondary text-sm">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-glass lg:sticky lg:top-24">
                        <div className="flex flex-wrap gap-4 mt-6">
                            {project.repoUrl && (
                                <a
                                    href={project.repoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border text-text-primary hover:border-primary/50 transition-colors"
                                >
                                    <Github size={20} />
                                    <span>View Code</span>
                                </a>
                            )}
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-colors"
                                >
                                    <ExternalLink size={20} />
                                    <span>Live Demo</span>
                                </a>
                            )}
                        </div>

                        <div className="flex items-center gap-3 mt-8 pt-8 border-t border-border">
                            <Link href={`/user/${project.user.id}`} className="flex items-center gap-3 hover:text-primary transition-colors group">
                                <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center overflow-hidden group-hover:border-primary/50 transition-colors">
                                    {project.user.avatarUrl ? (
                                        <img src={project.user.avatarUrl} alt={project.user.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-lg font-bold">{project.user.name.charAt(0)}</span>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-medium text-text-primary group-hover:text-primary transition-colors">{project.user.name}</h3>
                                    <p className="text-sm text-text-secondary line-clamp-1">{project.user.bio || 'Developer'}</p>
                                </div>
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {user && user.id !== project.userId && (
                                <Button
                                    className="w-full gap-2"
                                    onClick={handleInvite}
                                    disabled={inviteSent}
                                >
                                    {inviteSent ? 'Request Sent!' : 'Collaborate'}
                                    {!inviteSent && <UserPlus size={18} />}
                                </Button>
                            )}
                            {inviteSent && (
                                <p className="text-xs text-center text-secondary animate-in fade-in">
                                    Request recorded. Feature coming soon!
                                </p>
                            )}

                            <Button
                                variant="secondary"
                                className="w-full gap-2"
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    alert('Link copied to clipboard!');
                                }}
                            >
                                <Share2 size={18} />
                                Share Project
                            </Button>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}
