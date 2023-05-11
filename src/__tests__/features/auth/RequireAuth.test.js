import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { mockStoreLoggedIn } from '../../testUtils';
import { BrowserRouter as Router} from 'react-router-dom';
import { RequireAuth } from '../../../features/auth/RequireAuth';

describe('GIVEN: The user is logged in', () => {
  describe('WHEN: The page in this test renders', () => {
    it('THEN: the content of the protected route is shown.', () => {
      const protectedContentString = 'Some protected content.';

      render(
        <Provider store={mockStoreLoggedIn}>
          <Router>
            <RequireAuth>
              <div id='protected-content'>
                {protectedContentString}
              </div>
            </RequireAuth>
          </Router>
        </Provider>
      );

      const protectedContent = document.getElementById('protected-content');

      expect(protectedContent).toBeInTheDocument();
    });
  });
});