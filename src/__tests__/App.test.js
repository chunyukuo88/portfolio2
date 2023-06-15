import { renderWithQueryClient } from '../__msw__/testUtils';
import { mockStore } from 'src/testUtils';
import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';

import App from 'src/App';
import strings from 'src/common/strings';

const { ENGLISH } = strings;

jest.spyOn(console, 'log').mockImplementation(jest.fn());

describe('GIVEN: ', () => {
  describe('WHEN: ', () => {
    test('THEN: ', () => {
      renderWithQueryClient(<App />, mockStore);

      const hamburger = document.getElementById('main-menu-button-container');

      fireEvent.click(hamburger);

      const settingsMenuOption = screen.getByText(strings.settings[ENGLISH]);

      fireEvent.click(settingsMenuOption);

      const darkModeToggle = document.querySelectorAll('.switch-container')[0];

      let app = document.querySelector('main');

      expect(app).not.toHaveClass('light-mode');

      fireEvent.click(darkModeToggle);

      app = document.querySelector('main');

      expect(app).toHaveClass('light-mode');
    });
  });
});
