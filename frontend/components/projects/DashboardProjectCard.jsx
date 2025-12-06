import Link from 'next/link';
import { Edit2, Trash2, Eye } from 'lucide-react';
import Card from '../shared/Card';

export default function DashboardProjectCard({ project, onDelete }) {
    return (
        <Card className="group relative flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
                <div className={`px-2.5 py-1 rounded-full text-xs font-medium border ${project.isPublished
                    ? 'bg-secondary/10 text-secondary border-secondary/20'
                    : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                    }`}>
                    {project.isPublished ? 'Published' : 'Draft'}
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Link href={`/projects/${project.id}/edit`}>
                        <button className="p-2 hover:bg-white/5 rounded-lg text-text-secondary hover:text-primary transition-colors">
                            <Edit2 size={16} />
                        </button>
                    </Link>
                    <button
                        onClick={() => onDelete(project.id)}
                        className="p-2 hover:bg-red-500/10 rounded-lg text-text-secondary hover:text-red-400 transition-colors"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            <h3 className="text-xl font-heading font-semibold text-text-primary mb-2 line-clamp-1">
                {project.title}
            </h3>
            <p className="text-text-secondary text-sm mb-4 line-clamp-2 flex-grow">
                {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
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

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-sm text-text-secondary mt-auto">
                <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
                {project.isPublished && (
                    <Link href={`/projects/${project.id}`} className="flex items-center gap-1 hover:text-primary transition-colors">
                        View <Eye size={14} />
                    </Link>
                )}
            </div>
        </Card>
    );
}
