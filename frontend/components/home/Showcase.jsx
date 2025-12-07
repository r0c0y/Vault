import { useEffect, useState } from 'react';
import API from '../../lib/api';
import ProjectCard from '../projects/ProjectCard'; // Clean card
import { Loader2, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Showcase() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopProjects = async () => {
            try {
                // Fetch top 3 voted projects
                const res = await API.get('/projects?sort=most_voted&limit=3');
                if (res.data && res.data.projects) {
                    setProjects(res.data.projects);
                }
            } catch (error) {
                console.error("Failed to fetch showcase projects:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTopProjects();
    }, []);

    if (loading) {
        return (
            <section className="py-24 bg-background relative min-h-[400px] flex items-center justify-center">
                <Loader2 className="animate-spin text-primary w-8 h-8" />
            </section>
        );
    }

    if (projects.length === 0) return null;

    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl mx-auto z-0 pointer-events-none">
                <div className="absolute top-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
                            Featured <span className="text-primary">Drops</span>
                        </h2>
                        <p className="text-text-secondary text-lg max-w-xl">
                            The community's top-voted projects of the week.
                        </p>
                        <p className="text-lg font-bold text-highlight mt-2 flex items-center gap-2 animate-pulse">
                            <Zap size={20} className="fill-current" />
                            Fresh drops for {new Date().toLocaleDateString('en-US', { weekday: 'long' })}!
                        </p>
                    </div>
                    <Link href="/explore">
                        <span className="text-primary hover:text-primary/80 font-medium cursor-pointer transition-colors">
                            View All Projects &rarr;
                        </span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <Link key={project.id} href={`/project/${project.id}`}>
                            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 cursor-pointer" style={{ animationDelay: `${index * 100}ms` }}>
                                <ProjectCard
                                    project={project}
                                    className="h-full bg-surface/50 backdrop-blur-sm border-white/5 hover:border-primary/50"
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
