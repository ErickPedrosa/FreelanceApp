import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import test from 'node:test';
import '@testing-library/jest-dom';

test('should activate camera and capture photo', async () => {
  render(<App />);


  const activateButton = screen.getByText('Activate Camera');
  fireEvent.click(activateButton);


  const captureButton = await screen.findByText('Capture Photo');
  expect(captureButton).toBeInTheDocument();


  fireEvent.click(captureButton);
  expect(screen.getByText('Captured Photo:')).toBeInTheDocument();
});
