import { Sidebar } from 'src/components/Sidebar/Sidebar';
import { fireEvent, screen } from '@testing-library/react';
import strings from 'src/common/strings';
import { renderWithQueryClient } from 'src/__msw__/testUtils';
import { mockStore } from 'src/testUtils';

const { ENGLISH } = strings;

describe('Sidebar.jsx', () => {
  describe('GIVEN: props to specify whether the Sidebar is open,', () => {
    describe('WHEN: the isOpen prop is true,', () => {
      const isOpen = true;
      beforeEach(() => {
        renderWithQueryClient(<Sidebar isOpen={isOpen} />, mockStore);
      });

      test('THEN: the bar has the appropriate CSS class to make it pop out.', () => {
        const visibleSidebar = document.querySelector('.sidebar-open');

        expect(visibleSidebar).toBeVisible();
      });

      test.each`
        menuItemLabel
        ${strings.aboutMe[ENGLISH]}
        ${strings.aboutSite[ENGLISH]}
        ${strings.resume[ENGLISH]}
        ${strings.funStuff[ENGLISH]}
        ${strings.settings[ENGLISH]}
      `('THEN: the menu items are also visible', ({ menuItemLabel }) => {
        const menuItem = screen.getByText(menuItemLabel);

        expect(menuItem).toBeVisible();
      });
      describe('WHEN: The user clicks the Settings menu option', () => {
        test('THEN: the Settings menu pops up.', () => {
          const settingsMenuOption = screen.getByText(strings.settings[ENGLISH]);
          let darkModeSetting = screen.queryByText(strings.darkMode[ENGLISH]);

          expect(darkModeSetting).toBeNull();

          fireEvent.click(settingsMenuOption);
          darkModeSetting = screen.getByText(strings.darkMode[ENGLISH]);

          expect(darkModeSetting).toBeVisible();
        });
      });
    });
    describe('WHEN: the isOpen prop is false,', () => {
      const isOpen = false;
      beforeEach(() => {
        renderWithQueryClient(<Sidebar isOpen={isOpen} />, mockStore);
      });

      test('THEN: the bar has the appropriate CSS class to make it pop out.', () => {
        const visibleSidebar = document.querySelector('.sidebar-open');

        expect(visibleSidebar).toBeNull();
      });
      test.each`
        menuItemLabel
        ${strings.aboutMe[ENGLISH]}
        ${strings.aboutSite[ENGLISH]}
        ${strings.resume[ENGLISH]}
      `('THEN: the menu items are NOT visible', ({ menuItemLabel }) => {
        const menuItem = screen.queryByText(menuItemLabel);

        expect(menuItem).toBeNull();
      });
    });
  });
});
