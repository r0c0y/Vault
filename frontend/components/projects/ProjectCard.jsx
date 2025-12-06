import Link from 'next/link';
import { Github, ExternalLink, Compass } from 'lucide-react';
import Card from '../shared/Card';

export default function ProjectCard({ project, onClick, className = "" }) {
    return (
        <Card
            onClick={onClick}
            className={`h-full group cursor-pointer hover:border-primary/30 flex flex-col ${className}`}
        >
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
    );
}
