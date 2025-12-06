import { Search, Filter, X } from 'lucide-react';
import { TECH_STACKS } from '../../lib/constants';

export default function ProjectFilters({
    search,
    setSearch,
    showFilters,
    setShowFilters,
    selectedTech,
    toggleTech,
    sort,
    setSort,
    clearFilters,
    totalCount
}) {
    return (
        <>
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                    <input
                        type="text"
                        placeholder="Search projects by name or description..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
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
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                        <div className="flex items-center gap-4">
                            <h3 className="font-medium text-text-primary">Filter by Tech Stack</h3>
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="px-3 py-1.5 rounded-lg bg-background border border-border text-sm text-text-primary focus:outline-none focus:border-primary/50 cursor-pointer appearance-none"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="most_voted">Most Voted</option>
                                <option value="least_voted">Least Voted</option>
                                <option value="most_viewed">Most Viewed</option>
                                <option value="least_viewed">Least Viewed</option>
                            </select>
                        </div>
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
        </>
    );
}
