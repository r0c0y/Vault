import { useState } from 'react';
import { useRouter } from 'next/router';
import { createProject } from '../../lib/api';
import Button from '../../components/Button';
import Input from '../../components/Input';
import TechStackInput from '../../components/TechStackInput';
import { ArrowLeft, X, Upload } from 'lucide-react';
import Link from 'next/link';

export default function CreateProject() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        techStack: [],
        images: '', // Comma separated URLs for simplicity in MVP
        isPublished: false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (formData.isPublished && !formData.repoUrl) {
            alert('GitHub Repo URL is required when publishing a project.');
            setLoading(false);
            return;
        }

        try {
            const data = {
                ...formData,
                images: formData.images.split(',').map(i => i.trim()).filter(Boolean),
            };

            await createProject(data);
            router.push('/dashboard');
        } catch (error) {
            console.error('Failed to create project', error);
            alert('Failed to create project');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8 transition-colors">
                <ArrowLeft size={18} />
                Back to Dashboard
            </Link>

            <div className="bg-card border border-border rounded-2xl p-8 shadow-glass">
                <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">Create New Project</h1>
                <p className="text-text-secondary mb-8">Share your work with the community.</p>

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

                    <TechStackInput
                        label="Tech Stack"
                        placeholder="e.g. React, Node.js"
                        value={formData.techStack}
                        onChange={(newStack) => setFormData({ ...formData, techStack: newStack })}
                    />

                    <Input
                        label="Image URLs (comma separated)"
                        placeholder="e.g. https://example.com/image1.png"
                        value={formData.images}
                        onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label={`GitHub Repo URL ${formData.isPublished ? '*' : '(Optional)'}`}
                            placeholder="https://github.com/username/repo"
                            value={formData.repoUrl || ''}
                            onChange={(e) => setFormData({ ...formData, repoUrl: e.target.value })}
                            required={formData.isPublished}
                        />
                        <Input
                            label="Live Demo URL"
                            placeholder="https://my-project.com"
                            value={formData.liveUrl || ''}
                            onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                        />
                    </div>

                    <Input
                        label="Document URL (Pitch Deck, PDF, etc.)"
                        placeholder="https://example.com/pitch-deck.pdf"
                        value={formData.documentUrl || ''}
                        onChange={(e) => setFormData({ ...formData, documentUrl: e.target.value })}
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
                            {loading ? 'Creating...' : 'Create Project'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
