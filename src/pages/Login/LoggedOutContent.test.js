import { mockStore } from '../../testUtils';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { LoggedOutContent } from './LoggedOutContent';
import { routes } from '../../routes';

describe('LoggedOutContent', () => {
  describe('GIVEN: The there are no problems signing in', () => {
    describe('WHEN: The user enters correct username and password and submits', () => {
      it('THEN: the signIn function is invoked with their username and password', async () => {
        const signIn = jest.fn();
        render(
          <Provider store={mockStore}>
            <Router>
              <LoggedOutContent signIn={signIn} />
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
      it('THEN: the user gets routed to the index.', () => {
        const signIn = jest.fn();
        render(
          <Provider store={mockStore}>
            <Router>
              <LoggedOutContent signIn={signIn} />
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
        expect(window.location.pathname).toEqual(routes.index);
      });
    });
  });
  describe('GIVEN: The there are problems signing in', () => {
    describe('WHEN: The user enters invalid username and password and submits', () => {
      it('THEN: the an error is displayed', async () => {
        const signIn = jest.fn(() => {
          return Promise.reject({ originalStatus: { status: 401 }});
        });
        render(
          <Provider store={mockStore}>
            <Router>
              <LoggedOutContent signIn={signIn} />
            </Router>
          </Provider>
        );
        const username = screen.getByTestId('username-input');
        const password = screen.getByTestId('password-input');
        const button = document.querySelector('.login-button');
        const un = 'foo';
        const pw = 'bar';

        fireEvent.change(username, { target: { value: un } });
        fireEvent.change(password, { target: { value: pw } });
        fireEvent.click(button);

        await waitFor(() => {
          const errorMsg = screen.getByText('Unauthorized');
          expect(errorMsg).toBeInTheDocument();
        });
      });
    });
    describe('WHEN: Any other error occurs', () => {
      it('THEN: displays an error simply stating that the page has failed', async () => {
        const signIn = jest.fn(() => {
          return Promise.reject({ originalStatus: { status: 402 }});
        });
        render(
          <Provider store={mockStore}>
            <Router>
              <LoggedOutContent signIn={signIn} />
            </Router>
          </Provider>
        );
        const username = screen.getByTestId('username-input');
        const password = screen.getByTestId('password-input');
        const button = document.querySelector('.login-button');
        const un = 'foo';
        const pw = 'bar';

        fireEvent.change(username, { target: { value: un } });
        fireEvent.change(password, { target: { value: pw } });
        fireEvent.click(button);

        await waitFor(() => {
          const errorMsg = screen.getByText('LoginPage failed');
          expect(errorMsg).toBeInTheDocument();
        });
      });
    });
  });
});
