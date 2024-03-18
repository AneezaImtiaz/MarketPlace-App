import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProjectCard } from '../components';
import { ProjectItem } from '../types';
import * as CartUtils from '../utils/CartUtils';

// Mock the imported CartUtils functions
jest.mock('../utils/CartUtils', () => ({
  getCartItems: jest.fn(),
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
}));

describe('ProjectCard', () => {
  const projectItem: ProjectItem = {
    id: 1,
    image: 'image-url',
    country: 'Test Country',
    description: 'Test Description',
    distribution_weight: 0.5,
    earliest_delivery: 'Test Delivery',
    offered_volume_in_tons: 12,
    name: '',
    price_per_ton: 0,
    supplier_name: '',
    sdgs: []
  };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders project information', () => {
    render(<ProjectCard item={projectItem} />);

    expect(screen.getByText('Test Country')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Distribution Weight: 0.5')).toBeInTheDocument();
    expect(screen.getByText('Earliest delivery: Test Delivery')).toBeInTheDocument();
  });

  it('handles add to cart', async () => {
    const getCartItemsMock = CartUtils.getCartItems as jest.Mock;
    getCartItemsMock.mockReturnValue([]);

    render(<ProjectCard item={projectItem} />);

    const cartIcon = screen.getByTestId('cartIcon');
    fireEvent.click(cartIcon);

    expect(CartUtils.addToCart).toHaveBeenCalledWith({
      projectId: projectItem.id,
      volume: 1, // Default volume state
    });
  });

  it('handles remove from cart', () => {
    const getCartItemsMock = CartUtils.getCartItems as jest.Mock;
    getCartItemsMock.mockReturnValue([{ projectId: projectItem.id, volume: 1 }]);

    render(<ProjectCard item={projectItem} />);

    const cartIcon = screen.getByTestId('cartIcon');
    fireEvent.click(cartIcon);

    expect(CartUtils.removeFromCart).toHaveBeenCalledWith(projectItem.id);
  });
});