import { renderWithQueryClient } from 'src/__msw__/testUtils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { mockStore } from 'src/testUtils';
import '@testing-library/jest-dom';
import 'react-router-dom';
import 'react-dom';

import { ExerciseHub } from 'src/pages/ExerciseHub/ExerciseHub';
import strings from 'src/common/strings';
import {routes} from "../../../routes";

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
  describe('GIVEN: the user is not logged in,', () => {
    describe('WHEN: they click the option to see workouts,', () => {
      test('THEN: they are taken to the page for workouts', () => {
        renderWithQueryClient(<ExerciseHub/>, mockStore);

        const workoutsButton = screen.getByText(strings.workouts.english);

        fireEvent.click(workoutsButton);

        expect(mockNavFn).toBeCalledTimes(1);
        expect(mockNavFn).toBeCalledWith(routes.workouts);
      });
    });
  });
});
