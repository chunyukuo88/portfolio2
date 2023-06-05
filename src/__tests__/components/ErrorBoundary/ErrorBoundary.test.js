import { useState } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary/ErrorBoundary';
import { fireEvent, render } from '@testing-library/react';

function BuggyCounter() {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter(counter + 1);
  };

  if (counter === 3) {
    throw new Error('I crashed!');
  }

  return <button onClick={handleClick}>{counter}</button>;
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe('ErrorBoundary', () => {
  describe('GIVEN: ErrorBoundary wraps a component', () => {
    describe('WHEN: The child component has an error', () => {
      it('THEN: the error message of the ErrorBoundary is displayed', () => {
        jest.spyOn(console, 'error').mockImplementationOnce(jest.fn());
        render(
          <ErrorBoundary>
            <BuggyCounter />
          </ErrorBoundary>
        );
        const button = document.querySelector('button');
        fireEvent.click(button);
        fireEvent.click(button);
        fireEvent.click(button);

        const errorBoundaryMsg = document.querySelector('h1');

        expect(errorBoundaryMsg).toBeInTheDocument();
      });
    });
    describe('WHEN: The child component does not have an error', () => {
      it('THEN: the error message of the ErrorBoundary is NOT displayed', () => {
        jest.spyOn(console, 'error').mockImplementationOnce(jest.fn());
        render(
          <ErrorBoundary>
            <BuggyCounter />
          </ErrorBoundary>
        );
        const button = document.querySelector('button');
        fireEvent.click(button);
        fireEvent.click(button);

        const errorBoundaryMsg = document.querySelector('h1');

        expect(errorBoundaryMsg).not.toBeInTheDocument();
      });
    });
  });
  describe('GIVEN: ErrorBoundary does not wrap a component', () => {
    describe('WHEN: the getDerivedStateFromError() static method is invoked,', () => {
      it('THEN: returns an object indicating that there is an error', () => {
        jest.spyOn(console, 'error').mockImplementationOnce(jest.fn());
        const expectedResult = { hasError: true };
        const error = new Error('some error');

        const result = ErrorBoundary.getDerivedStateFromError(error);

        expect(result).toEqual(expectedResult);
      });
    });
  });
});
