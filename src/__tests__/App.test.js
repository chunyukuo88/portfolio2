import { renderWithQueryClient } from '../__msw__/testUtils';
import { mockStore } from 'src/testUtils';
import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';

import App from 'src/App';
import strings from 'src/common/strings';

const { ENGLISH } = strings;

describe('App.jsx integration tests.', () => {
  describe('GIVEN: The page has loaded', () => {
    describe('WHEN: the user clicks the dark mode toggle', () => {
      test('THEN: it toggles to light mode.', () => {
        renderWithQueryClient(<App />, mockStore);

        const hamburger = document.getElementById('main-menu-button-container');

        fireEvent.click(hamburger);

        const settingsMenuOption = screen.getByText(strings.settings[ENGLISH]);

        fireEvent.click(settingsMenuOption);

        const darkModeToggle = document.querySelectorAll('input')[0];

        let app = document.querySelector('main');

        expect(app).not.toHaveClass('light-mode');

        fireEvent.click(darkModeToggle);

        app = document.querySelector('main');

        expect(app).toHaveClass('light-mode');
      });
    });
  });
  describe('GIVEN: The page has loaded', () => {
    describe('WHEN: the user clicks the (cube) Spin toggle', () => {
      test('THEN: the cube spins more quickly.', () => {
        const fastSpinningCube = {
          animation: 'animate 1s linear infinite'
        };
        const slowSpinningCube = {
          animation: 'animate 4s linear infinite'
        };

        renderWithQueryClient(<App />, mockStore);

        const hamburger = document.getElementById('main-menu-button-container');

        fireEvent.click(hamburger);

        const settingsMenuOption = screen.getByText(strings.settings[ENGLISH]);

        fireEvent.click(settingsMenuOption);

        let cube = screen.getByTestId('primary-cube');

        expect(cube).toHaveStyle(slowSpinningCube);
        expect(cube).not.toHaveStyle(fastSpinningCube);

        const cubeSpinToggle = document.querySelectorAll('input')[1];

        fireEvent.click(cubeSpinToggle);

        cube = screen.getByTestId('primary-cube');

        expect(cube).toHaveStyle(fastSpinningCube);
        expect(cube).not.toHaveStyle(slowSpinningCube);
      });
    });
  });
});
