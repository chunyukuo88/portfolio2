import { mockStoreLoggedIn } from 'src/testUtils';
import { render, fireEvent, screen } from '@testing-library/react';
import { ChangePassword } from 'src/pages/Login/ChangePassword';
import Root from 'src/Root';
afterEach(() => {
  jest.clearAllMocks();
});

describe('GIVEN: there are no problems with the auth provider', () => {
  describe('WHEN: the user enters valid username, old password, and new password,', () => {
    it('THEN: the changePassword', () => {
      const changePassword = jest.fn();
      render(
        <Root store={mockStoreLoggedIn}>
          <ChangePassword changePassword={changePassword}/>
        </Root>
      );

      const [username, oldPassword, newPassword] = ['username', 'oldPassword', 'newPassword'];
      const usernameInput = document.getElementById('username');
      const oldPasswordInput = document.getElementById('old-password');
      const newPasswordInput = document.getElementById('new-password');
      const button = document.getElementById('reset-password-button');

      fireEvent.change(usernameInput, { target: { value : username } });
      fireEvent.change(oldPasswordInput, { target: { value : oldPassword } });
      fireEvent.change(newPasswordInput, { target: { value : newPassword } });
      fireEvent.click(button);

      expect(changePassword).toBeCalledWith(username, oldPassword, newPassword);
    });
  });
  describe('WHEN: either the username or passwords are invalid,', () => {
    it.skip('THEN: an error message indicating as much is displayed.', () => {
      const changePassword = jest.fn(async () => {
        return {
          originalStatus: {
            status: 401,
          },
        };
      });
      render(
        <Root store={mockStoreLoggedIn}>
          <ChangePassword changePassword={changePassword}/>
        </Root>
      );
      const [username, oldPassword, newPassword] = ['username', 'oldPassword', 'newPassword'];
      const usernameInput = document.getElementById('username');
      const oldPasswordInput = document.getElementById('old-password');
      const newPasswordInput = document.getElementById('new-password');
      const button = document.getElementById('reset-password-button');
      fireEvent.change(usernameInput, { target: { value : username } });
      fireEvent.change(oldPasswordInput, { target: { value : oldPassword } });
      fireEvent.change(newPasswordInput, { target: { value : newPassword } });

      fireEvent.click(button);
      const errMsg = screen.getByText('Unauthorized');

      expect(errMsg).toBeInTheDocument();
    });
  });
});

describe('GIVEN: the auth provider server has a problem', () => {
  describe('WHEN: the user enters valid username, old password, and new password,', () => {
    it.skip('THEN: the changePassword', async () => {
      const changePassword = jest.fn(async () => {
        return new Error('problem on the server');
      });
      render(
        <Root store={mockStoreLoggedIn}>
          <ChangePassword changePassword={changePassword}/>
        </Root>
      );

      const [username, oldPassword, newPassword] = ['username', 'oldPassword', 'newPassword'];
      const usernameInput = document.getElementById('username');
      const oldPasswordInput = document.getElementById('old-password');
      const newPasswordInput = document.getElementById('new-password');
      const button = document.getElementById('reset-password-button');

      fireEvent.change(usernameInput, { target: { value : username } });
      fireEvent.change(oldPasswordInput, { target: { value : oldPassword } });
      fireEvent.change(newPasswordInput, { target: { value : newPassword } });
      fireEvent.click(button);

      const errMsg = screen.getByText('No server response');

      expect(errMsg).toBeInTheDocument();
    });
  });
});
