import React, { useState, useEffect } from 'react';
import { ProjectItem, CartItem } from '../types';
import { getProjects } from '../services/projectService';
import { ProjectCard, VirtualizedList, NoDataFoundModal } from '../components';
import { getCartItems } from '../utils/CartUtils';
import { CART_INFO, NO_DATA_MODAL } from '../utils/Constants';
import { cartStyles } from '../styles';

type CartProps = {};

const Cart: React.FC<CartProps> = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  const fetchProjects = async () => {
    try {
      const projectsData = await getProjects();
      const t = getCartItems();
      setProjects(projectsData.filter(item => t.find(i => i.projectId === item.id)));
    } catch (e) { }
  };

  useEffect(() => {
    setCart(getCartItems());
    fetchProjects();

  }, []);

  const renderNoData = () => {
    return (
      <NoDataFoundModal
        title={NO_DATA_MODAL.title}
        description={NO_DATA_MODAL.description}
      />
    );
  };

  const renderItem = (project: any) => {
    return (
      <ProjectCard
        item={project}
        cartIconClick={(projectId) => setProjects(projects?.filter(i => i?.id !== projectId))}
      />
    )
  };

  const getTotalVolume = (): number => {
    let totalVolume = 0;
    cart.map((item) => totalVolume = totalVolume + item.volume)
    return totalVolume;
  };

  return (
    projects.length ?
      <div>
        <div className={cartStyles.content}>
          <div>
            <p>{`${CART_INFO.numberOfItems}: ${cart.length}`}</p>
            <p>{`${CART_INFO.totalVolume}: ${getTotalVolume()}`}</p>
          </div>
          <button className={cartStyles.button}>{CART_INFO.checkout}</button>
        </div>

        <div style={{ height: '100vh' }}>
          <VirtualizedList items={projects} renderItem={(project) => renderItem(project)} />
        </div>
      </div>
      : <div className={cartStyles.container}> {renderNoData()} </div>
  );

};
export default Cart;