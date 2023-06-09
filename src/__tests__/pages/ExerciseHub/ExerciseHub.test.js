import { renderWithQueryClient } from 'src/__msw__/testUtils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { mockStore } from 'src/testUtils';
import '@testing-library/jest-dom';
import 'react-router-dom';
import 'react-dom';

import { ExerciseHub } from 'src/pages/ExerciseHub/ExerciseHub';
import strings from 'src/common/strings';
import {routes} from "../../../routes";
import language from "../../../features/language/Language";

const mockNavFn = jest.fn();
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    __esModule: true,
    ...originalModule,
    useNavigate: () => mockNavFn, // shows up as gray in JetBrains IDEs, but this is indeed being used. Proof: Change its spelling and tests break.
  };
});
const { ENGLISH, CHINESE, RUSSIAN } = strings;

describe('ExerciseHub.jsx', () => {
  describe('WHEN: the page loads', () => {
    test.each`
    
    `('THEN: it shows a back button.', () => {

    });
  });
  describe('GIVEN: the user is not logged in,', () => {
    describe('WHEN: the user clicks the login button,', () => {
      test.each`
          language
          ${ENGLISH}
          ${RUSSIAN}
          ${CHINESE}
      `('THEN: they get routed to the login page appears', ({ language }) => {
        renderWithQueryClient(<ExerciseHub/>, mockStore);

        const loginButton = screen.getByText(strings.login[language]);

        fireEvent.click(loginButton);

        expect(mockNavFn).toBeCalledTimes(1);
        expect(mockNavFn).toBeCalledWith(routes.login);
      });
    });
    describe('WHEN: they click the option to see workouts in any language,', () => {
      test.each`
          language
          ${ENGLISH}
          ${CHINESE}
          ${RUSSIAN}
        `('THEN: they are taken to the page for workouts', ({ language }) => {
        renderWithQueryClient(<ExerciseHub/>, mockStore);

        const workoutsButton = screen.getByText(strings.workouts[language]);

        fireEvent.click(workoutsButton);

        expect(mockNavFn).toBeCalledTimes(1);
        expect(mockNavFn).toBeCalledWith(routes.workouts);
      });
    });
  });
  describe('GIVEN: the user has logged in,', () => {
    describe('WHEN: the page loads,', () => {
      test('THEN: it shows a welcome message with their name', () => {
        //
      });
      test('THEN: it a button saying "my workouts" rather than "workouts"', () => {
        //
      });
    });
  });
});
