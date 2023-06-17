import { LoggedOutContent, LoginPage } from 'src/pages/Login/LoginPage';
import { mockStore, mockStoreLoggedIn } from 'src/testUtils';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { routes } from 'src/routes';
import Root from 'src/Root';
import strings from "../../../common/strings";

afterEach(() => {
  jest.clearAllMocks();
});

describe.skip('LoginPage.js', () => {
  describe('GIVEN: user is logged in', () => {
    beforeEach(() => {
      render(
        <Root store={mockStoreLoggedIn}>
          <LoginPage/>
        </Root>
      );
    });
    describe('WHEN: the page loads', () => {
      it('THEN: it shows the logged-in content.', () => {
        const page = document.getElementById('login-page');

        expect(page).toBeInTheDocument();
      });
    });
    describe('WHEN: the user clicks the button to log out',() => {
      it('THEN: the app logs the user out.', async () => {
        jest.spyOn(console, 'error').mockImplementationOnce(jest.fn());
        const button = screen.getByText('Logout');
        fireEvent.click(button);

        await waitFor(() => {
          expect(window.location.pathname).toEqual(routes.index);
        });
      });
    });
  });
  describe('GIVEN: user is NOT logged in', () => {
    beforeEach(() => {
      render(
        <Root store={mockStore}>
          <LoginPage/>
        </Root>
      );
    });
    describe('WHEN: the page loads', () => {
      it('THEN: it shows the logged-out content.', () => {
        const page = document.querySelector('.logged-out-section');

        expect(page).toBeInTheDocument();
      });
    });
  });
});
