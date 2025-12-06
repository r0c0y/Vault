import { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';
import { useRouter } from 'next/router';
import { getProjects } from '../lib/api';
import { Compass, Search } from 'lucide-react';
import Pagination from '../components/shared/Pagination';
import Button from '../components/shared/Button';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectFilters from '../components/projects/ProjectFilters';

import Link from 'next/link';

export default function Explore() {
    const { user } = useAuth();
    const router = useRouter();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedTech, setSelectedTech] = useState([]);
    const [sort, setSort] = useState('newest');
    const [showFilters, setShowFilters] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchProjects();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search, selectedTech, sort, page]);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const { data } = await getProjects({
                page,
                limit: 21,
                search: search || undefined,
                tech: selectedTech.length > 0 ? selectedTech.join(',') : undefined,
                sort
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
        setSort('newest');
        setPage(1);
    };

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
                <Compass size={64} className="text-primary mb-6" />
                <h1 className="text-3xl font-heading font-bold text-text-primary mb-4">Explore Projects</h1>
                <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-6 py-3 rounded-xl text-lg font-medium mb-8">
                    Please login to view projects
                </div>
                <Link href="/login">
                    <Button>Log in to Continue</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-12">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <h1 className="text-4xl font-heading font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent mb-4">Explore Projects</h1>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ProjectFilters
                    search={search}
                    setSearch={(val) => {
                        setSearch(val);
                        setPage(1);
                    }}
                    showFilters={showFilters}
                    setShowFilters={setShowFilters}
                    selectedTech={selectedTech}
                    toggleTech={toggleTech}
                    sort={sort}
                    setSort={(val) => {
                        setSort(val);
                        setPage(1);
                    }}
                    clearFilters={clearFilters}
                />

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
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    onClick={() => router.push(`/projects/${project.id}`)}
                                />
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
                                setSelectedTech([]);
                                setSort('newest');
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
