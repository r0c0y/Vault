import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getUserProfile, getUserProjects, followUser, unfollowUser } from '../../lib/api';
import { useAuth } from '../../lib/AuthContext';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Link from 'next/link';
import { Compass, Github, Linkedin, Twitter, Mail, Calendar, Users, UserPlus, UserCheck, Loader2 } from 'lucide-react';

export default function PublicProfile() {
    const router = useRouter();
    const { id } = router.query;
    const { user: currentUser } = useAuth();
    const [profile, setProfile] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [followLoading, setFollowLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id, currentUser]); // Re-fetch if user logs in/out to update isFollowing

    const fetchData = async () => {
        try {
            setLoading(true);
            console.log('Fetching profile for ID:', id);
            const [profileRes, projectsRes] = await Promise.all([
                getUserProfile(id),
                getUserProjects(id, { page: 1, limit: 15 })
            ]);
            console.log('Profile Data:', profileRes.data);
            console.log('Projects Data:', projectsRes.data);
            setProfile(profileRes.data);
            setProjects(projectsRes.data.projects);
            setHasMore(projectsRes.data.pagination.page < projectsRes.data.pagination.pages);
            setPage(1);
        } catch (error) {
            console.error('Failed to fetch profile data', error);
        } finally {
            setLoading(false);
        }
    };

    const loadMore = async () => {
        try {
            setLoadingMore(true);
            const nextPage = page + 1;
            const { data } = await getUserProjects(id, { page: nextPage, limit: 15 });
            setProjects(prev => [...prev, ...data.projects]);
            setHasMore(data.pagination.page < data.pagination.pages);
            setPage(nextPage);
        } catch (error) {
            console.error('Failed to load more projects', error);
        } finally {
            setLoadingMore(false);
        }
    };

    const handleFollow = async () => {
        if (!currentUser) {
            router.push('/login');
            return;
        }

        try {
            setFollowLoading(true);
            if (profile.isFollowing) {
                await unfollowUser(id);
                setProfile(prev => ({
                    ...prev,
                    isFollowing: false,
                    _count: { ...prev._count, followers: prev._count.followers - 1 }
                }));
            } else {
                await followUser(id);
                setProfile(prev => ({
                    ...prev,
                    isFollowing: true,
                    _count: { ...prev._count, followers: prev._count.followers + 1 }
                }));
            }
        } catch (error) {
            console.error('Follow action failed', error);
        } finally {
            setFollowLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-2xl font-bold text-text-primary mb-4">User not found</h1>
                <Link href="/explore" className="text-primary hover:underline">
                    Back to Explore
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-12">
            {/* Banner Section */}
            <div
                className="h-64 w-full bg-cover bg-center relative"
                style={{
                    backgroundImage: profile.bannerUrl?.startsWith('http') ? `url(${profile.bannerUrl})` : undefined,
                    backgroundColor: !profile.bannerUrl?.startsWith('http') ? (profile.bannerUrl || '#1a1a1a') : undefined
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
                {/* Profile Header */}
                <div className="bg-card border border-border rounded-2xl p-8 mb-12 shadow-glass text-center md:text-left flex flex-col md:flex-row items-end gap-8">
                    <div className="w-40 h-40 rounded-full bg-surface border-4 border-background flex items-center justify-center overflow-hidden shrink-0 shadow-xl">
                        {profile.avatarUrl ? (
                            <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-5xl font-bold text-primary">{profile.name.charAt(0)}</span>
                        )}
                    </div>

                    <div className="flex-1 space-y-4 w-full md:w-auto pb-2">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-4xl font-heading font-bold text-text-primary mb-2">{profile.name}</h1>
                                <p className="text-text-secondary max-w-2xl text-lg">{profile.bio || 'No bio provided.'}</p>
                                {profile.location && (
                                    <p className="text-sm text-text-secondary mt-1 flex items-center gap-1 justify-center md:justify-start">
                                        📍 {profile.location}
                                    </p>
                                )}
                            </div>

                            {currentUser && currentUser.id === profile.id ? (
                                <Button
                                    variant="secondary"
                                    className="gap-2"
                                    onClick={() => router.push('/profile/edit')}
                                >
                                    Edit Profile
                                </Button>
                            ) : (
                                currentUser && (
                                    <Button
                                        onClick={handleFollow}
                                        disabled={followLoading}
                                        variant={profile.isFollowing ? "outline" : "primary"}
                                        className="gap-2 min-w-[120px]"
                                    >
                                        {profile.isFollowing ? (
                                            <>
                                                <UserCheck size={18} />
                                                Following
                                            </>
                                        ) : (
                                            <>
                                                <UserPlus size={18} />
                                                Follow
                                            </>
                                        )}
                                    </Button>
                                )
                            )}
                        </div>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-text-secondary pt-4">
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border">
                                <Users size={16} className="text-primary" />
                                <span className="font-bold text-text-primary">{profile._count?.followers || 0}</span>
                                <span className="hidden sm:inline">Followers</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border">
                                <UserPlus size={16} className="text-primary" />
                                <span className="font-bold text-text-primary">{profile._count?.following || 0}</span>
                                <span className="hidden sm:inline">Following</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border">
                                <Compass size={16} className="text-primary" />
                                <span className="font-bold text-text-primary">{profile._count?.projects || 0}</span>
                                <span className="hidden sm:inline">Projects</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-text-secondary pt-4 border-t border-white/5 mt-4">
                            <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                <span>Joined {new Date(profile.createdAt).toLocaleDateString()}</span>
                            </div>
                            {profile.portfolioUrl && (
                                <a href={profile.portfolioUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                                    <Compass size={16} />
                                    <span>Portfolio</span>
                                </a>
                            )}
                            {profile.socials?.github && (
                                <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                                    <Github size={16} />
                                    <span>GitHub</span>
                                </a>
                            )}
                            {profile.socials?.linkedin && (
                                <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                                    <Linkedin size={16} />
                                    <span>LinkedIn</span>
                                </a>
                            )}
                            {profile.socials?.twitter && (
                                <a href={profile.socials.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                                    <Twitter size={16} />
                                    <span>X (Twitter)</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Projects Grid */}
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-8">Published Projects</h2>

                {projects.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                            {projects.map((project) => (
                                <Link key={project.id} href={`/projects/${project.id}`}>
                                    <Card className="h-full group cursor-pointer hover:border-primary/30">
                                        <div className="aspect-video bg-surface rounded-xl mb-4 overflow-hidden relative">
                                            {project.images && project.images.length > 0 ? (
                                                <img
                                                    src={project.images[0]}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface to-card">
                                                    <Compass className="text-text-secondary/20" size={48} />
                                                </div>
                                            )}
                                        </div>

                                        <h3 className="text-xl font-heading font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-text-secondary text-sm line-clamp-2 mb-4">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {project.techStack.slice(0, 3).map((tech, i) => (
                                                <span key={i} className="text-xs px-2 py-1 rounded-md bg-white/5 text-text-secondary border border-white/5">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>

                        {hasMore && (
                            <div className="flex justify-center mt-8">
                                <Button
                                    variant="outline"
                                    onClick={loadMore}
                                    disabled={loadingMore}
                                    className="min-w-[150px]"
                                >
                                    {loadingMore ? (
                                        <>
                                            <Loader2 className="animate-spin mr-2" size={18} />
                                            Loading...
                                        </>
                                    ) : (
                                        'Load More'
                                    )}
                                </Button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-20 bg-surface/30 rounded-2xl border border-border border-dashed">
                        <p className="text-text-secondary text-lg">No projects published yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
