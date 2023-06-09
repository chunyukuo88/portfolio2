import { renderWithQueryClient } from 'src/__msw__/testUtils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { mockStore } from 'src/testUtils';
import '@testing-library/jest-dom';

import { ExerciseHub } from 'src/pages/ExerciseHub/ExerciseHub';
import strings from 'src/common/strings';


describe('ExerciseHub.jsx', () => {
  describe('GIVEN: the user is not logged in,', () => {
    describe('WHEN: they click the option to see workouts,', () => {
      test('THEN: they are taken to the page for workouts', () => {
        renderWithQueryClient(<ExerciseHub/>, mockStore);

        const workoutsButton = screen.getByText(strings.workouts.english);

        fireEvent.click(workoutsButton);

        // TODO: WIP - Consult App.test.js for mocking navigation functions
      });
    });
  });
});
