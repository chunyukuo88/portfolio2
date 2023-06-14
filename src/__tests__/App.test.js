import { renderWithQueryClient } from '../__msw__/testUtils';
import { mockStore } from 'src/testUtils';
import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';

import App from 'src/App';
import strings from 'src/common/strings';

const { ENGLISH } = strings;

describe('GIVEN: ', () => {
  describe('WHEN: ', () => {
    test('THEN: ', () => {
      renderWithQueryClient(<App />, mockStore);

      const hamburger = document.getElementById('main-menu-button-container');

      fireEvent.click(hamburger);

      const settingsMenuOption = screen.getByText(strings.settings[ENGLISH]);

      fireEvent.click(settingsMenuOption);

      const darkModeToggle = document.querySelectorAll('.switch-container')[0];

      // Assert that a certain element has dark mode styling.
      fireEvent.click(darkModeToggle);
      // Assert that a certain element has light mode styling.
    });
  });
});
