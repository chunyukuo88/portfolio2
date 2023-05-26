import * as utils from 'src/common/utils';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import Root from 'src/Root';
import { mockStore } from 'src/testUtils';
import CrosswordPage from 'src/pages/Crossword/CrosswordPage';

describe('GIVEN: there are no puzzles', () => {
  describe('WHEN: The user clicks on the dropdown of available puzzles,', () => {
    it('THEN: There are none to choose from.', async() => {
      jest.spyOn(utils, 'getCrosswords').mockReturnValueOnce(
        new Promise((resolve, reject) => {
          resolve([]);
        })
      );
      render(
        <Root store={mockStore}>
          <CrosswordPage/>
        </Root>
      );
      await waitFor(() => {
        const menu = document.querySelector('select');
        fireEvent.click(menu);
        const menuOptions = screen.getAllByRole('option');

        expect(menuOptions).toHaveLength(1);
      });
    });
  });
});