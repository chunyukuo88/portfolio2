import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mockStoreLoggedIn } from '../../testUtils';
import '../../common/utils';

import PublishCrosswordPanel from './PublishCrosswordPanel';

let mockFn = jest.fn();
jest.mock('../../common/utils', () => {
  const originalModule = jest.requireActual('../../common/utils');
  return {
    __esModule: true,
    ...originalModule,
    postData: () => mockFn(),
  };
});

describe('GIVEN: the user is logged in,', () => {
  describe('WHEN: The page loads,', () => {
    test('THEN: there is a panel allowing the user to publish new crosswords.', () => {
      render(
        <Provider store={mockStoreLoggedIn}>
          <Router>
            <PublishCrosswordPanel/>
          </Router>
        </Provider>
      );
      const publishPanel = screen.getByText('Create a New Crossword');

      expect(publishPanel).toBeInTheDocument();
    });
  });
  describe('WHEN: The has filled in all the fields and submits,', () => {
    test('THEN: the data they entered is sent to the API.', () => {
      render(
        <Provider store={mockStoreLoggedIn}>
          <Router>
            <PublishCrosswordPanel/>
          </Router>
        </Provider>
      );

      const solution = screen.getByTestId('crossword-panel-solution');
      const title = screen.getByTestId('crossword-panel-title');
      const theme = screen.getByTestId('crossword-panel-theme');
      const across = screen.getByTestId('crossword-panel-across');
      const down = screen.getByTestId('crossword-panel-down');
      const button = screen.getByText('Publish');

      fireEvent.change(solution, { target: { value: 'solution' } });
      fireEvent.change(title, { target: { value: 'title' } });
      fireEvent.change(theme, { target: { value: 'theme' } });
      fireEvent.change(across, { target: { value: 'across' } });
      fireEvent.change(down, { target: { value: 'down' } });
      fireEvent.click(button);

      expect(mockFn).toBeCalledTimes(1);
    });
  });
});
