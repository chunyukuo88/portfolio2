import { Sidebar } from 'src/components/Sidebar/Sidebar';
import { fireEvent, screen } from '@testing-library/react';
import strings from 'src/common/strings';
import { renderWithQueryClient } from 'src/__msw__/testUtils';
import { mockStore } from 'src/testUtils';

const { ENGLISH } = strings;

const setPrimaryContentKey = jest.fn();

describe('Sidebar.jsx', () => {
  describe('GIVEN: props to specify whether the Sidebar is open,', () => {
    describe('WHEN: the isOpen prop is true,', () => {
      beforeEach(() => {
        renderWithQueryClient(<Sidebar isOpen={true} setPrimaryContentKey={setPrimaryContentKey} />, mockStore);
      });
      test('THEN: the bar has the appropriate CSS class to make it pop out.', () => {
        const visibleSidebar = document.querySelector('.sidebar-open');

        expect(visibleSidebar).toBeVisible();
      });

      test.each`
        menuItemLabel
        ${strings.aboutMe[ENGLISH]}
        ${strings.siteInfo[ENGLISH]}
        ${strings.settings[ENGLISH]}
      `('THEN: the menu items are also visible', ({ menuItemLabel }) => {
        const menuItem = screen.getByText(menuItemLabel);

        expect(menuItem).toBeVisible();
      });
      describe('WHEN: The user clicks the a menu item', () => {
        test.each`
          menuItemLabel                 |   key
          ${strings.aboutMe[ENGLISH]}   |   ${'aboutMe'}
          ${strings.siteInfo[ENGLISH]}  |   ${'siteInfo'}
        `('THEN: the content beneath the sidebar is adjusted accordingly.', ({ menuItemLabel, key }) => {
          const settingsMenuOption = screen.getByText(menuItemLabel);
          let darkModeSetting = screen.queryByText(strings.darkMode[ENGLISH]);

          expect(darkModeSetting).toBeNull();

          fireEvent.click(settingsMenuOption);

          expect(setPrimaryContentKey).toBeCalledWith(key);
        });
      });
      describe('WHEN: The user clicks on Resume', () => {
        it('THEN: does not change the content', () => {
          const resume = screen.getByText(strings.resume[ENGLISH]);
          let darkModeSetting = screen.queryByText(strings.darkMode[ENGLISH]);

          expect(darkModeSetting).toBeNull();

          fireEvent.click(resume);

          expect(setPrimaryContentKey).not.toBeCalled();
        });
      });
    });
    describe('WHEN: the isOpen prop is false,', () => {
      beforeEach(() => {
        renderWithQueryClient(<Sidebar isOpen={false} setPrimaryContentKey={setPrimaryContentKey} />, mockStore);
      });

      test('THEN: the bar has the appropriate CSS class to make it pop out.', () => {
        const visibleSidebar = document.querySelector('.sidebar-open');

        expect(visibleSidebar).toBeNull();
      });
      test.each`
        menuItemLabel
        ${strings.aboutMe[ENGLISH]}
        ${strings.siteInfo[ENGLISH]}
        ${strings.resume[ENGLISH]}
      `('THEN: the menu items are NOT visible', ({ menuItemLabel }) => {
        const menuItem = screen.queryByText(menuItemLabel);

        expect(menuItem).toBeNull();
      });
    });
  });
});
