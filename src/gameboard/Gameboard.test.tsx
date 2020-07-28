import React from 'react';
import { render } from '@testing-library/react';
import Gameboard from './Gameboard';

test('renders Gameboard', () => {
  const { container } = render(<Gameboard />);
  expect(container).toBeDefined();
});