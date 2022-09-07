import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('App Renders', () => {
  render(<App />);
  
  expect(screen.getByText(/Landings List/i)).toBeInTheDocument();
  expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  expect(screen.getByAltText("logo")).toBeInTheDocument();
  expect(screen.getAllByRole("textbox").length).toBe(3)
});


