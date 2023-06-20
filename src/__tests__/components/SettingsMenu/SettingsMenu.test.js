import { SettingsMenu } from 'src/components/SettingsMenu/SettingsMenu';
import { renderWithQueryClient } from 'src/__msw__/testUtils';
import { fireEvent, screen } from '@testing-library/react';
import { mockStoreSettingsOpen, mockStore } from 'src/testUtils';
import strings from 'src/common/strings';

const { ENGLISH } = strings;

// TODO: These need redone; coverage should be achieved via integration tests.

describe.skip('SettingsMenu.jsx', () => {
  describe('GIVEN: The global state indicates that the settings should be visible', () => {
    describe('WHEN: component loads,', () => {
      test('THEN: the component is visible.', () => {
        renderWithQueryClient(
          <SettingsMenu />,
          mockStoreSettingsOpen
        );

        const settingsMenu = document.querySelector('.settings-closed');

        expect(settingsMenu).toBeVisible();
      });
    });
    describe('WHEN: the isOpen prop is false,', () => {
      test('THEN: the menu is not visible.', () => {
        renderWithQueryClient(
          <SettingsMenu />,
          mockStore
        );

        const settingsMenu = document.querySelector('.settings-open');

        expect(settingsMenu).toBeNull();
      });
    });
  });
  describe('GIVEN: the page loads', () => {
    describe('WHEN: the user clicks the day/night toggle,', () => {
      test('THEN: the color theme changes.', () => {
        renderWithQueryClient(
          <SettingsMenu />,
          mockStoreSettingsOpen
        );

        const theme = screen.getByText(strings.darkMode[ENGLISH]);

        fireEvent.click(theme);

        const component = document.querySelector('.settings-open__light-mode');

        expect(component).toBeVisible();
      });
    });
  });
});