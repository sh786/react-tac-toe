import React from 'react';
import { render } from '@testing-library/react';
import Nav from './Nav';

test('renders nav with "React-Tac-Toe"', () => {
  const { getByText } = render(<Nav />);
  const name = getByText('React-Tac-Toe');
  expect(name).toBeInTheDocument();
});

test('renders nav with "with TypeScript"', () => {
  const { getByText } = render(<Nav />);
  const name = getByText('with TypeScript');
  expect(name).toBeInTheDocument();
});

test('renders nav with "Player X', () => {
  const { getByText } = render(<Nav />);
  const name = getByText('Player X');
  expect(name).toBeInTheDocument();
});

test('renders nav with "Player 0', () => {
  const { getBy } = render(<Nav />);
  const name = getByText('Player O');
  expect(name).toBeInTheDocument();
});