import { mockStoreLoggedIn } from '../../testUtils';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { ChangePassword } from './ChangePassword';

describe('GIVEN: ', () => {
  describe('WHEN: the component loads', () => {
    it('THEN: it displays inputs and button', () => {
      render(
        <Provider store={mockStoreLoggedIn}>
          <Router>
            <ChangePassword />
          </Router>
        </Provider>
      );

      const username = document.getElementById('username');
      const oldPasswordInput = document.getElementById('old-password');
      const newPasswordInput = document.getElementById('new-password');

      expect(username).toBeInTheDocument();
      expect(oldPasswordInput).toBeInTheDocument();
      expect(newPasswordInput).toBeInTheDocument();
    });
  });
});
