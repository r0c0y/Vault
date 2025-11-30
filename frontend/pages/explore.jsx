import { useState, useEffect, useRef } from 'react';
import { getProjects } from '../lib/api';
import Link from 'next/link';
import { Search, Filter, Github, ExternalLink, Compass, X } from 'lucide-react';
import Card from '../components/Card';
import Pagination from '../components/Pagination';
import { gsap } from 'gsap';
import Button from '../components/Button';
import { TECH_STACKS } from '../lib/constants';

export default function Explore() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedTech, setSelectedTech] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchProjects();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search, selectedTech, page]);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const { data } = await getProjects({
                page,
                limit: 21,
                search: search || undefined,
                tech: selectedTech.length > 0 ? selectedTech.join(',') : undefined
            });
            setProjects(data.projects);
            setTotalPages(data.pagination.pages);
        } catch (error) {
            console.error('Failed to fetch projects', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleTech = (tech) => {
        setSelectedTech(prev =>
            prev.includes(tech)
                ? prev.filter(t => t !== tech)
                : [...prev, tech]
        );
        setPage(1); // Reset to page 1 on filter change
    };

    const clearFilters = () => {
        setSelectedTech([]);
        setPage(1);
    };

    return (
        <div className="min-h-screen pb-12">
            {/* Header Section */}
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <h1 className="text-4xl font-heading font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent mb-4">Explore Projects</h1>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Search and Filter Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                        <input
                            type="text"
                            placeholder="Search projects by name or description..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            className="w-full bg-surface border border-border rounded-xl pl-10 pr-4 py-3 text-text-primary focus:outline-none focus:border-primary/50 transition-colors shadow-sm"
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition-all duration-200 font-medium ${showFilters || selectedTech.length > 0
                            ? 'bg-primary/10 border-primary/20 text-primary'
                            : 'bg-surface border-border text-text-secondary hover:text-text-primary'
                            }`}
                    >
                        <Filter size={20} />
                        Filters
                        {selectedTech.length > 0 && (
                            <span className="ml-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {selectedTech.length}
                            </span>
                        )}
                    </button>
                </div>

                {/* Collapsible Filter Menu */}
                {(showFilters || selectedTech.length > 0) && (
                    <div className="bg-surface border border-border rounded-xl p-6 mb-8 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-medium text-text-primary">Filter by Tech Stack</h3>
                            {selectedTech.length > 0 && (
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
                                >
                                    <X size={14} /> Clear all
                                </button>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {TECH_STACKS.map((tech) => (
                                <button
                                    key={tech}
                                    onClick={() => toggleTech(tech)}
                                    className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 border ${selectedTech.includes(tech)
                                        ? 'bg-primary text-white border-primary shadow-md transform scale-105'
                                        : 'bg-background border-border text-text-secondary hover:border-primary/30 hover:text-text-primary'
                                        }`}
                                >
                                    {tech}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Projects Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-80 bg-surface rounded-2xl animate-pulse border border-border"></div>
                        ))}
                    </div>
                ) : projects.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {projects.map((project) => (
                                <Link key={project.id} href={`/projects/${project.id}`}>
                                    <Card className="h-full group cursor-pointer hover:border-primary/30 flex flex-col">
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

                                        <h3 className="text-xl font-heading font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors line-clamp-1">
                                            {project.title}
                                        </h3>
                                        <p className="text-text-secondary text-sm line-clamp-2 mb-4 flex-grow">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {project.techStack.slice(0, 3).map((tech, i) => (
                                                <span key={i} className="text-xs px-2 py-1 rounded-md bg-white/5 text-text-secondary border border-white/5">
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.techStack.length > 3 && (
                                                <span className="text-xs px-2 py-1 rounded-md bg-white/5 text-text-secondary border border-white/5">
                                                    +{project.techStack.length - 3}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                                            <div className="w-6 h-6 rounded-full bg-surface overflow-hidden">
                                                {project.user.avatarUrl ? (
                                                    <img src={project.user.avatarUrl} alt={project.user.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-primary/20 text-primary text-[10px] font-bold">
                                                        {project.user.name.charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-xs text-text-secondary truncate">
                                                by {project.user.name}
                                            </span>
                                            <div className="ml-auto flex items-center gap-2">
                                                {project.repoUrl && (
                                                    <a
                                                        href={project.repoUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="text-text-secondary hover:text-text-primary transition-colors"
                                                    >
                                                        <Github size={16} />
                                                    </a>
                                                )}
                                                {project.liveUrl && (
                                                    <a
                                                        href={project.liveUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="text-text-secondary hover:text-primary transition-colors"
                                                    >
                                                        <ExternalLink size={16} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={setPage}
                        />
                    </>
                ) : (
                    <div className="text-center py-20 bg-surface/30 rounded-2xl border border-border border-dashed">
                        <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="text-text-secondary" size={32} />
                        </div>
                        <h3 className="text-lg font-medium text-text-primary mb-2">No projects found</h3>
                        <p className="text-text-secondary max-w-md mx-auto">
                            We couldn't find any projects matching your search or filters. Try adjusting your criteria.
                        </p>
                        <button
                            onClick={() => {
                                setSearch('');
                                setSelectedTech('');
                            }}
                            className="mt-6 text-primary hover:underline font-medium"
                        >
                            Clear all filters
                        </button>
                    </div>

                )}
            </div>

        </div>
    );
}
