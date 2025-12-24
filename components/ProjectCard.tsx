import Link from 'next/link';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`}>
      <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-green-400 hover:shadow-lg">
        {project.passwordProtected && (
          <div className="absolute right-2 top-2">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        )}
        
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600">
          {project.name}
        </h3>
        
        {project.description && (
          <p className="mt-2 text-sm text-gray-600">
            {project.description}
          </p>
        )}
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {project.flows.length} flow{project.flows.length !== 1 ? 's' : ''}
          </span>
          <span className="text-xs text-gray-500">
            {project.wireframes.length} wireframe{project.wireframes.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </Link>
  );
}