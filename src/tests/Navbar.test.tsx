import { render, screen } from '@testing-library/react';
import Navbar from "../components/Navbar"
import menu from "../data/menu"
import {BrowserRouter as Router } from 'react-router-dom';
import {useQueryClient} from '@tanstack/react-query';

test('Navbar Renders', () => {
  render(<Router><Navbar /></Router>);
  var numLinks = 0
  menu.forEach(menuElement=>{
    const textToFind = menuElement.title
    expect(screen.getByText(textToFind)).toBeInTheDocument();
    menuElement.features.forEach(feature=>{
      const featureToFind = feature.label
      expect(screen.getByText(featureToFind)).toBeInTheDocument();
      numLinks++
    })
  })
  expect(screen.getAllByRole("link").length).toBe(numLinks)
});