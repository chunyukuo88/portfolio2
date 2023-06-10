import { renderWithQueryClient } from 'src/__msw__/testUtils';
import { fireEvent, screen } from '@testing-library/react';
import {mockStore, mockStoreLoggedIn} from 'src/testUtils';
import '@testing-library/jest-dom';
import 'react-router-dom';
import 'react-dom';

import { ExerciseHub } from 'src/pages/ExerciseHub/ExerciseHub';
import strings from 'src/common/strings';
import { routes } from 'src/routes';

const mockNavFn = jest.fn();
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    __esModule: true,
    ...originalModule,
    useNavigate: () => mockNavFn, // shows up as gray in JetBrains IDEs, but this is indeed being used. Proof: Change its spelling and tests break.
  };
});
const { ENGLISH } = strings;

describe('ExerciseHub.jsx', () => {
  describe('WHEN: the page loads', () => {
    test('THEN: it shows a back button.', () => {
      renderWithQueryClient(<ExerciseHub/>, mockStore);

      const backButton = screen.getByText(strings.backButton[ENGLISH]);

      expect(backButton).toBeVisible();
    });
  });
  describe('GIVEN: the user is not logged in,', () => {
    describe('WHEN: the user clicks the login button,', () => {
      test('THEN: they get routed to the login page appears', () => {
        renderWithQueryClient(<ExerciseHub/>, mockStore);

        const loginButton = screen.getByText(strings.login[ENGLISH]);

        fireEvent.click(loginButton);

        expect(mockNavFn).toBeCalledTimes(1);
        expect(mockNavFn).toBeCalledWith(routes.login);
      });
    });
    describe('WHEN: they click the option to see workouts,', () => {
      test('THEN: they are taken to the page for workouts', () => {
        renderWithQueryClient(<ExerciseHub/>, mockStore);

        const workoutsButton = screen.getByText(strings.workouts[ENGLISH]);

        fireEvent.click(workoutsButton);

        expect(mockNavFn).toBeCalledTimes(1);
        expect(mockNavFn).toBeCalledWith(routes.workouts);
      });
    });
  });
  describe('GIVEN: the user has logged in,', () => {
    describe('WHEN: the page loads,', () => {
      test('THEN: it a button saying "my workouts" rather than "workouts"', () => {
        renderWithQueryClient(<ExerciseHub/>, mockStoreLoggedIn);
        const myWorkouts = 'My ' + strings.workouts[ENGLISH];

        const workoutsButton = screen.getByText(myWorkouts);

        expect(workoutsButton).toBeVisible();
      });
    });
  });
});
