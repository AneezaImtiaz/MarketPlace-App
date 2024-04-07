import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SEARCH } from '../utils/Constants';
import { Search } from '../components';

describe('Search', () => {
  test('renders an input with the given placeholder', () => {
    const placeholderText = 'Search...';
    render(<Search buttonClick={() => { }} placeholder={placeholderText} />);

    expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
  });

  test('calls buttonClick with the correct value when button is clicked', () => {
    const buttonClickMock = jest.fn();
    const testValue = 'Query';

    render(<Search buttonClick={buttonClickMock} />);

    const input = screen.getByPlaceholderText(`${SEARCH}...`);
    const button = screen.getByRole('button', { name: SEARCH });

    // Simulate user typing into the input field
    fireEvent.change(input, { target: { value: testValue } });

    // Simulate user clicking the search button
    fireEvent.click(button);

    expect(buttonClickMock).toHaveBeenCalledWith(testValue);
  });

  test('updates the value as the user types', () => {
    render(<Search buttonClick={() => { }} />);

    const input = screen.getByPlaceholderText(`${SEARCH}...`);
    const testValue = 'New Value';

    // Simulate user typing into the input field
    fireEvent.change(input, { target: { value: testValue } });

    expect(input).toHaveValue(testValue);
  });
});