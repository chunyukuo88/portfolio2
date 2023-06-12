import { SettingsMenu } from 'src/components/SettingsMenu/SettingsMenu';
import { fireEvent, render, screen } from '@testing-library/react';
import * as utils from 'src/components/SettingsMenu/utils';
import strings from 'src/common/strings';

describe('SettingsMenu.jsx', () => {
  describe('GIVEN: props to specify whether the SettingsMenu is open', () => {
    describe('WHEN: the isOpen prop is true,', () => {
      const isOpen = true;
      test('THEN: the menu is visible.', () => {
        render(<SettingsMenu isOpen={isOpen} setIsOpen={setIsOpen}/>);
      });
    });
  });
  describe('GIVEN: the page loads', () => {
    describe('WHEN: the user clicks the day/night toggle,', () => {
      test('THEN: the color theme changes.', () => {
        const spy = jest.spyOn(utils, 'toggleTheme');
        render(<SettingsMenu />);

        const theme = screen.getByText('Theme');

        fireEvent.click(theme);

        expect(spy).toBeCalledTimes(1);
      });
    });
  });
});