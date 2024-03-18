import { ProjectItem } from '../types';

export const getProjects = async (): Promise<ProjectItem[]> => {
    const response = await fetch('/data/projects.json');  // Fetch from the public folder
    if (!response.ok) {
        throw new Error('Failed to fetch projects');
    }
    const projects: ProjectItem[] = await response.json();
    return projects;
};