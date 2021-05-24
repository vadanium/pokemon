import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import MyPokemon from '../pages/MyPokemon'

test('renders my pokemon page with no pokemon', () => {
  render(
  <Router>
    <Router basename={process.env.PUBLIC_URL}>
      <MyPokemon />
    </Router>
  </Router>);

const nodata = screen.getByText(/Catch more pokemon/i);
expect(nodata).toBeInTheDocument();
});