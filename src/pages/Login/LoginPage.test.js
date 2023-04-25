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
  beforeEach(() => {
    render(
      <Provider store={mockStoreLoggedIn}>
        <Router>
          <LoginPage/>
        </Router>
      </Provider>
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
      <Provider store={mockStore}>
        <Router>
          <LoginPage/>
        </Router>
      </Provider>
    );
  });
  describe('WHEN: the page loads', () => {
    it('THEN: it shows the logged-out content.', () => {
      const page = document.querySelector('.logged-out-section');

      expect(page).toBeInTheDocument();
    });
    it('THEN: the position of the cursor affects the size and color of the cube.', async () => {
      const baseStyleRules = {
        position: 'relative',
        transform: 'rotateX(-30deg)',
        animation: 'animate 4s linear infinite',
        transition: '3s',
      };
      const backButton = document.querySelector('.back-to-home');
      const small = { height: '100px', width: '100px' };
      const lessSmall = { height: '150px', width: '150px' };
      const notSmall = { height: '200px', width: '200px' };
      const significant = { height: '250px', width: '250px' };
      const big = { height: '300px', width: '300px' };
      const bigg = { height: '350px', width: '350px' };
      const bigger = { height: '400px', width: '400px' };
      const evenBigger = { height: '450px', width: '450px' };

      fireEvent.mouseOver(backButton);
      let cube = document.querySelector('.cube');
      expect(cube).toHaveStyle({ ...baseStyleRules, ...small });

      await waitFor(() => {
        fireEvent.mouseMove(document, { clientY: 50 });
        cube = document.querySelector('.cube');
        expect(cube).toHaveStyle({ ...baseStyleRules, ...small });
      });
      await waitFor(() => {
        fireEvent.mouseMove(document, { clientY: 100 });
        cube = document.querySelector('.cube');
        expect(cube).toHaveStyle({ ...baseStyleRules, ...lessSmall });
      });
      await waitFor(() => {
        fireEvent.mouseMove(document, { clientY: 150 });
        cube = document.querySelector('.cube');
        expect(cube).toHaveStyle({ ...baseStyleRules, ...notSmall });
      });
      await waitFor(() => {
        fireEvent.mouseMove(document, { clientY: 200 });
        cube = document.querySelector('.cube');
        expect(cube).toHaveStyle({ ...baseStyleRules, ...significant });
      });
      await waitFor(() => {
        fireEvent.mouseMove(document, { clientY: 250 });
        cube = document.querySelector('.cube');
        expect(cube).toHaveStyle({ ...baseStyleRules, ...big });
      });
      await waitFor(() => {
        fireEvent.mouseMove(document, { clientY: 300 });
        cube = document.querySelector('.cube');
        expect(cube).toHaveStyle({ ...baseStyleRules, ...bigg });
      });
      await waitFor(() => {
        fireEvent.mouseMove(document, { clientY: 350 });
        cube = document.querySelector('.cube');
        expect(cube).toHaveStyle({ ...baseStyleRules, ...bigger });
      });
      await waitFor(() => {
        fireEvent.mouseMove(document, { clientY: 400 });
        cube = document.querySelector('.cube');
        expect(cube).toHaveStyle({ ...baseStyleRules, ...evenBigger });
      });
    });
  });
});
