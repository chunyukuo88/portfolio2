import React, { useContext, useState } from 'react';
import { Auth } from 'aws-amplify';
import Root from '../../Root';
import { useAuth } from './useAuth';
import { render, screen } from '@testing-library/react';
import { mockStore } from '../../testUtils';

describe('GIVEN: user has not logged in', () => {
  describe('WHEN: this hook is invoked,', () => {
    it('THEN: isLoggedIn equals false', () => {
      function SomeComponent() {
        const { isLoggedIn } = useAuth();
        return <p>{`User is logged in: ${isLoggedIn}`}</p>;
      }

      render(
        <Root store={mockStore}>
          <SomeComponent />
        </Root>
      );
      const expectedText = screen.getByText('User is logged in: false');

      expect(expectedText).toBeInTheDocument();
    });
  });
});