import React, { useState, useEffect } from 'react';
import { ProjectItem } from '../types';
import { getProjects } from '../services/projectService';
import { ProjectCard, VirtualizedList, Search } from '../components';
import { SEARCH } from '../utils/Constants';

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

  const searchItem = (searchValue: string) => {
    setProjects(projects.filter((project) =>
      project.country.toLowerCase().includes(searchValue.toLowerCase())))
  };

  const renderItem = (project: any) => {
    return (<ProjectCard item={project} />);
  };

  return (
    <div>
      <div style={{
        margin: '30px',
        display: 'flex',
        justifyContent: 'center'
      }
      }>
        <Search buttonClick={(searchValue) => searchItem(searchValue)} placeholder={`${SEARCH} country here...`} />
      </div>
      <div style={{ flex: '1 1 auto', height: '100vh', alignItems: 'center' }}>
        <VirtualizedList items={projects} renderItem={(project) => renderItem(project)} />
      </div>
    </div>
  );

};
export default Marketplace;