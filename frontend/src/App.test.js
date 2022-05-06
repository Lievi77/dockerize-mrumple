import { render, screen } from '@testing-library/react';
import App from './App';
//import Dashboard from "./components/Dashboard";

//Test that verifies the correct rendition of the screen's title in Landing page
test('renders SAL title' , () => {

  render(<App/>);

  //screen is bound to document.body
  const salTitle = screen.getByText(/REDDIT ANALYZER/i); //regex matcher

  expect(salTitle).toBeInTheDocument();
} );
