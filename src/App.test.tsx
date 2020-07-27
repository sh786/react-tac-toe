import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('app renders without error', () => {
  const { container } = render(<App />);
  expect(container).toBeDefined();
});
