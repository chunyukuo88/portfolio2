import {LoggedOutContent, LoginPage} from './LoginPage';
import {mockStore, mockStoreLoggedIn} from '../../testUtils';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { useAuth } from '../../features/auth/useAuth';

jest.mock('../../features/auth/useAuth');
// jest.mock('../../features/auth/useAuth', () => {
//   const useAuth = () => ({
//     changePassword: jest.fn(),
//     signIn: jest.fn(),
//     signOut: jest.fn(),
//   });
//   return useAuth;
// });

afterEach(() => {
  jest.clearAllMocks();
});


describe('GIVEN: user is logged in', () => {
  describe('WHEN: the page loads', () => {
    it('THEN: it shows the logged-in content.', () => {
      useAuth.mockImplementationOnce(() => ({
        changePassword: jest.fn(),
        signIn: jest.fn(),
        signOut: jest.fn(),
      }));
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
});