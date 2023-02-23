import { LoggedOutContent, LoginPage } from './LoginPage';
import { mockStore, mockStoreLoggedIn } from '../../testUtils';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { routes } from '../../routes';

afterEach(() => {
  jest.clearAllMocks();
});


describe('GIVEN: user is logged in', () => {
  describe('WHEN: the page loads', () => {
    it('THEN: it shows the logged-in content.', () => {
      render(
        <Provider store={mockStoreLoggedIn}>
          <Router>
            <LoginPage/>
          </Router>
        </Provider>
      );
      const page = document.getElementById('login-page');

      expect(page).toBeInTheDocument();
    });
  });
  describe('WHEN: the user clicks the button to log out',() => {
    it('THEN: the app logs the user out.', async () => {
      render(
        <Provider store={mockStoreLoggedIn}>
          <Router>
            <LoginPage/>
          </Router>
        </Provider>
      );
      const button = screen.getByText('Logout');
      fireEvent.click(button);

      await waitFor(() => {
        expect(window.location.pathname).toEqual(routes.index);
      });
    });
  });
});
describe('GIVEN: user is NOT logged in', () => {
  describe('WHEN: the page loads', () => {
    it('THEN: it shows the logged-out content.', () => {
      const { debug } = render(
        <Provider store={mockStore}>
          <Router>
            <LoginPage/>
          </Router>
        </Provider>
      );


      const page = document.querySelector('.logged-out-section');

      expect(page).toBeInTheDocument();
    });
  });
});
