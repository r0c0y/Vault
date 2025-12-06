import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../lib/AuthContext';
import Button from '../../components/shared/Button';
import Input from '../../components/shared/Input';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import Link from 'next/link';

export default function EditProfile() {
    const router = useRouter();
    const { user, loading: authLoading, authFetch, setUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        bio: '',
        avatarUrl: '',
        bannerUrl: '',
        location: '',
        portfolioUrl: '',
        resumeUrl: '',
        socials: {
            github: '',
            linkedin: '',
            twitter: '',
            discord: ''
        }
    });

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        } else if (user) {
            // Populate form with existing user data
            // Note: user object from context might be stale or missing fields if not refreshed
            // Ideally fetch fresh profile data here, but for MVP we use what we have or defaults
            setFormData({
                name: user.name || '',
                bio: user.bio || '',
                avatarUrl: user.avatarUrl || '',
                bannerUrl: user.bannerUrl || '',
                location: user.location || '',
                portfolioUrl: user.portfolioUrl || '',
                resumeUrl: user.resumeUrl || '',
                socials: {
                    github: user.socials?.github || '',
                    linkedin: user.socials?.linkedin || '',
                    twitter: user.socials?.twitter || '',
                    discord: user.socials?.discord || ''
                }
            });
        }
    }, [user, authLoading]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await authFetch('/auth/profile', {
                method: 'PUT',
                data: formData
            });
            setUser(res.data);
            // Ideally update AuthContext user here, but a page reload or re-fetch works too
            router.push(`/user/${user.id}`);
        } catch (error) {
            console.error('Failed to update profile', error);
            alert('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    if (authLoading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link href={`/user/${user.id}`} className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8 transition-colors">
                <ArrowLeft size={18} />
                Back to Profile
            </Link>

            <div className="bg-card border border-border rounded-2xl p-8 shadow-glass">
                <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">Edit Profile</h1>
                <p className="text-text-secondary mb-8">Update your personal information and public profile.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Images Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Avatar URL"
                            placeholder="https://example.com/avatar.jpg"
                            value={formData.avatarUrl}
                            onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                        />
                        <Input
                            label="Banner URL"
                            placeholder="https://example.com/banner.jpg"
                            value={formData.bannerUrl}
                            onChange={(e) => setFormData({ ...formData, bannerUrl: e.target.value })}
                        />
                    </div>

                    <Input
                        label="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />

                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1.5 ml-1">
                            Bio
                        </label>
                        <textarea
                            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-200 min-h-[100px]"
                            placeholder="Tell us about yourself..."
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Location"
                            placeholder="e.g. San Francisco, CA"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                        <Input
                            label="Portfolio Website"
                            placeholder="https://yourwebsite.com"
                            value={formData.portfolioUrl}
                            onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                        />
                        <Input
                            label="Resume URL"
                            placeholder="https://docs.google.com/..."
                            value={formData.resumeUrl}
                            onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                        />
                    </div>

                    <div className="space-y-4 pt-4 border-t border-white/5">
                        <h3 className="text-lg font-medium text-text-primary">Social Links</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="GitHub URL"
                                placeholder="https://github.com/username"
                                value={formData.socials.github}
                                onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, github: e.target.value } })}
                            />
                            <Input
                                label="LinkedIn URL"
                                placeholder="https://linkedin.com/in/username"
                                value={formData.socials.linkedin}
                                onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, linkedin: e.target.value } })}
                            />
                            <Input
                                label="X (Twitter) URL"
                                placeholder="https://x.com/username"
                                value={formData.socials.twitter}
                                onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, twitter: e.target.value } })}
                            />
                            <Input
                                label="Discord Username/Invite"
                                placeholder="username#1234 or Invite Link"
                                value={formData.socials.discord}
                                onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, discord: e.target.value } })}
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-8">
                        <Button
                            type="button"
                            variant="ghost"
                            className="flex-1"
                            onClick={() => router.back()}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1 gap-2"
                            disabled={loading}
                        >
                            <Save size={18} />
                            {loading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
