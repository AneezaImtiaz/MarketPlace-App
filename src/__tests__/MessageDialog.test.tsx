import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MessageDialog } from '../components';

describe('MessageDialog', () => {
  it('should render the title and description', () => {
    const buttonClickMock = jest.fn();

    render(
      <MessageDialog
        title="Dialog Title"
        description="Dialog Description"
        button="Click Me"
        onButtonClick={buttonClickMock} />
    );

    expect(screen.getByText('Dialog Title')).toBeInTheDocument();
    expect(screen.getByText('Dialog Description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument();
  });

  it('should call onButtonClick when the button is clicked', () => {
    const onButtonClick = jest.fn();
    render(
      <MessageDialog
        title="Dialog Title"
        description="Dialog Description"
        button="Click Me"
        onButtonClick={onButtonClick}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Click Me' }));
    expect(onButtonClick).toHaveBeenCalledTimes(1);
  });

  it('should render the close button when provided and respond to click', () => {
    const onClose = jest.fn();
    render(
      <MessageDialog
        title="Dialog Title"
        description="Dialog Description"
        button="Click Me"
        onButtonClick={() => { }}
        closeButton="Close"
        onClose={onClose}
      />
    );

    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});