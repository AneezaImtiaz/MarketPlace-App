import React from 'react';
import { render, screen } from '@testing-library/react';
import { NoDataFoundModal } from '../components';
import { noDataModalStyles } from '../styles';

// Mock the CSS module
jest.mock('../styles', () => ({
  noDataModalStyles: {
    noDataDialog: 'noDataDialog',
  },
}));

describe('NoDataModal', () => {
  it('renders the title and description', () => {
    const title = 'Test Title';
    const description = 'Test Description';

    render(<NoDataFoundModal title={title} description={description} />);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('applies the correct class from the styles object', () => {
    const title = 'Test Title';
    const description = 'Test Description';

    render(<NoDataFoundModal title={title} description={description} />);

    const dialogElement = screen.getByText(title).parentElement;
    expect(dialogElement).toHaveClass(noDataModalStyles.noDataDialog);
  });
});