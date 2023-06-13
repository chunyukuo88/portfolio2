import { SettingsMenu } from 'src/components/SettingsMenu/SettingsMenu';
import * as utils from 'src/components/SettingsMenu/utils';

import { renderWithQueryClient } from 'src/__msw__/testUtils';
import { fireEvent, screen } from '@testing-library/react';
import { mockStore } from 'src/testUtils';
import strings from 'src/common/strings';

const { ENGLISH } = strings;

const setIsOpen = jest.fn();
const isOpen = true;

describe('SettingsMenu.jsx', () => {
  describe('GIVEN: props to specify whether the SettingsMenu is open', () => {
    describe('WHEN: the isOpen prop is true,', () => {
      test('THEN: the menu is visible.', () => {
        renderWithQueryClient(
          <SettingsMenu isOpen={isOpen} setIsOpen={setIsOpen}/>,
          mockStore
        );

        const settingsMenu = document.querySelector('.settings-open');

        expect(settingsMenu).toBeVisible();
      });
    });
    describe('WHEN: the isOpen prop is false,', () => {
      test('THEN: the menu is not visible.', () => {
        const isOpen = false;
        renderWithQueryClient(
          <SettingsMenu isOpen={isOpen} setIsOpen={setIsOpen}/>,
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
        const spy = jest.spyOn(utils, 'toggleTheme');
        renderWithQueryClient(
          <SettingsMenu isOpen={isOpen} setIsOpen={setIsOpen}/>,
          mockStore
        );

        const theme = screen.getByText(strings.darkMode[ENGLISH]);

        fireEvent.click(theme);

        expect(spy).toBeCalledTimes(1);
      });
    });
  });
});