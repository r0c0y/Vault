import { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';
import { getMyProjects, deleteProject } from '../lib/api';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Eye, EyeOff, Search, Loader2 } from 'lucide-react';
import Button from '../components/shared/Button';
import Input from '../components/shared/Input';
import DashboardProjectCard from '../components/projects/DashboardProjectCard';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [filter, setFilter] = useState('all'); // all, published, draft
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user) {
      // Reset and fetch when filter/search changes
      setPage(1);
      fetchProjects(1, true);
    }
  }, [user, authLoading, filter, search]);

  const fetchProjects = async (pageNum, reset = false) => {
    try {
      if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);

      const { data } = await getMyProjects({
        page: pageNum,
        limit: 15,
        status: filter !== 'all' ? filter : undefined,
        search: search || undefined
      });

      if (reset) {
        setProjects(data.projects);
      } else {
        setProjects(prev => [...prev, ...data.projects]);
      }

      setHasMore(data.pagination.page < data.pagination.pages);
    } catch (error) {
      console.error('Failed to fetch projects', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProjects(nextPage);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        setProjects(projects.filter(p => p.id !== id));
      } catch (error) {
        console.error('Failed to delete project', error);
      }
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">My Work Shelf</h1>
          <p className="text-text-secondary">Manage your projects and track your progress.</p>
        </div>
        <Link href="/projects/create">
          <Button className="w-full md:w-auto gap-2">
            <Plus size={20} />
            New Project
          </Button>
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex bg-surface p-1 rounded-xl border border-border w-fit">
          {['all', 'published', 'draft'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${filter === f
                ? 'bg-card text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
                }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex-1 md:max-w-md ml-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
            <input
              type="text"
              placeholder="Search your projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface border border-border rounded-xl pl-10 pr-4 py-2.5 text-text-primary focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-surface rounded-2xl animate-pulse border border-border"></div>
          ))}
        </div>
      ) : projects.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {projects.map((project) => (
              <DashboardProjectCard
                key={project.id}
                project={project}
                onDelete={handleDelete}
              />
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
        <div className="text-center py-20 bg-surface/50 rounded-2xl border border-border border-dashed">
          <Link href="/projects/create">
            <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-surface/80 transition-colors group">
              <Plus className="text-text-secondary group-hover:text-primary transition-colors" size={32} />
            </div>
          </Link>
          <h3 className="text-lg font-medium text-text-primary mb-2">No projects found</h3>
          <p className="text-text-secondary mb-6">
            {search || filter !== 'all' ? 'Try adjusting your filters.' : 'Get started by creating your first project.'}
          </p>
          <Link href="/projects/create">
            <Button>Create Project</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
