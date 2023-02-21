import { LoginPage } from './LoginPage';
import { mockStore } from '../../testUtils';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
jest.mock('../../features/auth/useAuth');

describe('GIVEN: The user has not logged in', () => {
  describe('WHEN: The user enters correct username and password and submits', () => {
    it('THEN: the signIn function is invoked with their username and password', async () => {
      const signIn = jest.fn();
      const signOut = jest.fn();
      render(
        <Provider store={mockStore}>
          <Router>
            <LoginPage />
          </Router>
        </Provider>
      );
      const username = document.getElementById('username');
      const password = document.getElementById('password');
      const button = document.querySelector('.login-button');
      const un = 'foo';
      const pw = 'bar';

      fireEvent.change(username, { target: { value: un } });
      fireEvent.change(password, { target: { value: pw } });
      fireEvent.click(button);

      expect(signIn).toBeCalledWith(un, pw);
    });
  });
});