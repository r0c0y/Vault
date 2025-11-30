import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getProjectById, updateProject } from '../../../lib/api';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditProject() {
    const router = useRouter();
    const { id } = router.query;
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        techStack: '',
        images: '',
        isPublished: false
    });

    useEffect(() => {
        if (id) {
            fetchProject();
        }
    }, [id]);

    const fetchProject = async () => {
        try {
            const { data } = await getProjectById(id);
            setFormData({
                title: data.title,
                description: data.description,
                techStack: data.techStack.join(', '),
                images: data.images.join(', '),
                isPublished: data.isPublished
            });
        } catch (error) {
            console.error('Failed to fetch project', error);
            alert('Failed to load project');
            router.push('/dashboard');
        } finally {
            setInitialLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = {
                ...formData,
                techStack: formData.techStack.split(',').map(t => t.trim()).filter(Boolean),
                images: formData.images.split(',').map(i => i.trim()).filter(Boolean),
            };

            await updateProject(id, data);
            router.push('/dashboard');
        } catch (error) {
            console.error('Failed to update project', error);
            alert('Failed to update project');
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8 transition-colors">
                <ArrowLeft size={18} />
                Back to Dashboard
            </Link>

            <div className="bg-card border border-border rounded-2xl p-8 shadow-glass">
                <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">Edit Project</h1>
                <p className="text-text-secondary mb-8">Update your project details.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Project Title"
                        placeholder="e.g. Vault - Developer Portfolio"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />

                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1.5 ml-1">
                            Description
                        </label>
                        <textarea
                            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all duration-200 min-h-[120px]"
                            placeholder="Describe your project..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        />
                    </div>

                    <Input
                        label="Tech Stack (comma separated)"
                        placeholder="e.g. React, Node.js, Tailwind"
                        value={formData.techStack}
                        onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                        required
                    />

                    <Input
                        label="Image URLs (comma separated)"
                        placeholder="e.g. https://example.com/image1.png"
                        value={formData.images}
                        onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                    />

                    <div className="flex items-center gap-3 p-4 bg-surface rounded-xl border border-border">
                        <input
                            type="checkbox"
                            id="isPublished"
                            checked={formData.isPublished}
                            onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                            className="w-5 h-5 rounded border-border bg-background text-primary focus:ring-primary/50"
                        />
                        <label htmlFor="isPublished" className="text-text-primary font-medium cursor-pointer">
                            Publish immediately
                        </label>
                    </div>

                    <div className="flex gap-4 pt-4">
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
                            className="flex-1"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
