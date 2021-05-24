import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Home from '../pages/Home'

test('renders home', () => {
  render(
  <Router>
    <Router basename={process.env.PUBLIC_URL}>
      <Home />
    </Router>
  </Router>);

  const home = screen.getByText(/pokemon list/i);
  expect(home).toBeInTheDocument();

  const mypokemon = screen.getByText(/my pokemon/i);
  expect(mypokemon).toBeInTheDocument();

  const credit = screen.getByText(/credit/i);
  expect(credit).toBeInTheDocument();
});
