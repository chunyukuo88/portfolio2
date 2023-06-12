import { Sidebar } from 'src/components/Sidebar/Sidebar';
import { render, screen } from '@testing-library/react';
import strings from 'src/common/strings';

const { ENGLISH } = strings;

describe('Sidebar.jsx', () => {
  describe('GIVEN: props to open and close the Sidebar,', () => {
    const setIsOpen = jest.fn();

    describe('WHEN: the isOpen prop is true,', () => {
      const isOpen = true;
      beforeEach(() => {
        render(<Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>);
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
      `('THEN: the menu items are also visible', ({ menuItemLabel }) => {
        const menuItem = screen.getByText(menuItemLabel);

        expect(menuItem).toBeVisible();
      });
    });
    describe('WHEN: the isOpen prop is false,', () => {
      const isOpen = false;
      beforeEach(() => {
        render(<Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>);
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
