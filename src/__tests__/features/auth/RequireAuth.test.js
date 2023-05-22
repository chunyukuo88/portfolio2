import { render } from '@testing-library/react';
import { mockStoreLoggedIn } from 'src/testUtils';
import { RequireAuth } from 'src/features/auth/RequireAuth';
import Root from 'src/Root';

describe('GIVEN: The user is logged in', () => {
  describe('WHEN: The page in this test renders', () => {
    it('THEN: the content of the protected route is shown.', () => {
      const protectedContentString = 'Some protected content.';

      render(
        <Root store={mockStoreLoggedIn}>
            <RequireAuth>
              <div id='protected-content'>
                {protectedContentString}
              </div>
            </RequireAuth>
        </Root>
      );

      const protectedContent = document.getElementById('protected-content');

      expect(protectedContent).toBeInTheDocument();
    });
  });
});