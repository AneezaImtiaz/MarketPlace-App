import React, { useState, useEffect } from 'react';
import { ProjectItem } from '../types';
import { getProjects } from '../services/projectService';
import { ProjectCard, VirtualizedList } from '../components';

type MarketplaceProps = {};

const Marketplace: React.FC<MarketplaceProps> = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);

  const fetchProjects = async () => {
    try {
      const projectsData = await getProjects();
      setProjects(projectsData);
    } catch (e) { }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const renderItem = (project: any) => {
    return (<ProjectCard item={project} />);
  };

  return (
    <div style={{ flex: '1 1 auto', height: '100vh' }}>
      <VirtualizedList items={projects} renderItem={(project) => renderItem(project)} />
    </div>
  );

};
export default Marketplace;