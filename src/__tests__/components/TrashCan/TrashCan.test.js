import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { TrashCan } from 'src/components/TrashCan/TrashCan';

import { deleteBlog } from 'src/common/utils';
import { mockStoreLoggedIn } from 'src/testUtils';
import Root from 'src/Root';

jest.mock('src/common/utils', () => ({
  createHttpRequest: () => {},
  deleteBlog: jest.fn(),
}));

describe('TrashCan.js', () => {
  describe('WHEN: the administrator clicks on a little trashcan, ', () => {
    describe('AND: the administrator clicks the confirmation button,', () => {
      it('THEN: the blog article gets deleted.',  () => {
        const article = {};
        const token = 'foo';
        render(
          <Root store={mockStoreLoggedIn}>
            <TrashCan
              article={article}
              token={token}
            />
          </Root>
        );

        const trashcanEmoji = screen.getByText('🗑');
        fireEvent.click(trashcanEmoji);
        const confirmationButton = screen.getByText('Yeah');
        fireEvent.click(confirmationButton);
        expect(deleteBlog).toBeCalledTimes(1);
      });
    });
  });
  describe('GIVEN: the administrator clicks the trashcan,', () => {
    describe('WHEN: the confirmation and cancellation buttons are visible,', () => {
      it('THEN: the trashcan disappears.',  () => {
        const article = {};
        const token = 'foo';
        render(
          <Root store={mockStoreLoggedIn}>
            <TrashCan
              article={article}
              token={token}
            />
          </Root>
        );

        let cancelButton = screen.queryByText('Nah');
        let confirmationButton = screen.queryByText('Yeah');
        let trashcan = screen.queryByText('🗑');

        expect(cancelButton).toBeNull();
        expect(confirmationButton).toBeNull();
        expect(trashcan).toBeVisible();

        fireEvent.click(trashcan);

        cancelButton = screen.queryByText('Nah');
        confirmationButton = screen.queryByText('Yeah');
        trashcan = screen.queryByText('🗑');

        expect(cancelButton).toBeVisible();
        expect(confirmationButton).toBeVisible();
        expect(trashcan).toBeNull();

        fireEvent.click(cancelButton);

        cancelButton = screen.queryByText('Nah');
        confirmationButton = screen.queryByText('Yeah');
        trashcan = screen.queryByText('🗑');

        expect(cancelButton).toBeNull();
        expect(confirmationButton).toBeNull();
        expect(trashcan).toBeVisible();
      });
    });
  });
});
