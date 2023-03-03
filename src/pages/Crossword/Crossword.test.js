import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { mockStore } from '../../testUtils';
import ReactGA from 'react-ga4';
import Crossword from './Crossword.jsx';
import { styles } from './styles.js';
// import { getData } from '../../common/utils';
//
// jest.mock('../../common/utils', () => ({
//   getData: jest.fn(),
// }));

describe('Crossword.jsx', ()=> {
  describe('GIVEN: the user is not logged in,', () => {
    describe('WHEN: The page loads', () => {
      it('THEN: React-ga4 dispatches the event to Google Analytics.', () => {
        const spy = jest.spyOn(ReactGA, 'send');
        render(
          <Provider store={mockStore}>
            <Router>
              <Crossword/>
            </Router>
          </Provider>
        );

        expect(spy).toBeCalledTimes(1);
      });
    });
    describe('WHEN: The user clicks the front face of the cube,', () => {
      it('THEN: the side and top of the cube transform.', () => {
        render(
          <Provider store={mockStore}>
            <Router>
              <Crossword/>
            </Router>
          </Provider>
        );

        const frontFace = document.getElementById('cube-face-front');
        let westFace = screen.getAllByTestId('west-face')[0];
        let topFace = screen.getAllByTestId('top-face')[0];
        expect(westFace).toHaveClass('west-face-not-clicked');
        expect(topFace).toHaveClass('top-face-not-clicked');

        fireEvent.click(frontFace);
        westFace = screen.getAllByTestId('west-face')[0];
        topFace = screen.getAllByTestId('top-face')[0];

        expect(westFace).toHaveClass('west-face-clicked');
        expect(topFace).toHaveClass('top-face-clicked');
      });
    });
    describe('GIVEN: The 5x5 crossword grid is empty,', ()=>{
      describe('WHEN: the user clicks on a square,', ()=>{
        it('THEN: the square becomes highlighted.',()=>{
          render(
            <Provider store={mockStore}>
              <Router>
                <Crossword />
              </Router>
            </Provider>
          );

          const squares = screen.getAllByTestId('crossword-square');

          let neighboringSquareLeft = squares[1];
          expect(neighboringSquareLeft).toHaveStyle(styles.square);

          const clicked = squares[2];
          fireEvent.click(clicked);

          expect(clicked).toHaveStyle(styles.currentSquare);
        });
      });
      describe('WHEN: the user clicks on a square and types a letter,', ()=>{
        it('THEN: the square displays the value of that letter.',()=>{
          render(
            <Provider store={mockStore}>
              <Router>
                <Crossword />
              </Router>
            </Provider>
          );

          const squares = screen.getAllByTestId('crossword-square');

          const upperLeft = squares[0];
          fireEvent.click(upperLeft);
          fireEvent.keyPress(upperLeft, { key: 'Digit1', which: 18, keyCode: 18 })

          expect(upperLeft).toHaveStyle(styles.currentSquare);
        });
      });
      describe('WHEN: the user clicks in the center of the grid, then presses an arrow key,', () => {
        it.each`
        key             | which           | keyCode    | resultIndex
        ${'ArrowUp'}    | ${38}           | ${38}      | ${7}
        ${'ArrowDown'}  | ${40}           | ${40}      | ${17}
        ${'ArrowLeft'}  | ${37}           | ${37}      | ${11}
        ${'ArrowRight'} | ${39}           | ${39}      | ${13}
      `('THEN: the square first clicked becomes white again, and the new square becomes highlighted.',
          ({key, which, keyCode, resultIndex}) => {
            render(
              <Provider store={mockStore}>
                <Router>
                  <Crossword />
                </Router>
              </Provider>
            );

            const squares = screen.getAllByTestId('crossword-square');

            let centerSquare = squares[12];
            expect(centerSquare).toHaveStyle(styles.square);

            fireEvent.click(centerSquare);
            centerSquare = squares[12];
            let resultantSquare = squares[resultIndex];

            expect(centerSquare).toHaveStyle(styles.currentSquare);
            expect(resultantSquare).toHaveStyle(styles.square);

            fireEvent.keyDown(centerSquare, { key, which, keyCode });
            resultantSquare = squares[resultIndex];

            expect(resultantSquare).toHaveStyle(styles.currentSquare);
          });
      });
      describe('WHEN: the user is at the left edge of the crossword and presses the left keyboard button,', () => {
        it('THEN: nothing happens.', () => {
          render(
            <Provider store={mockStore}>
              <Router>
                <Crossword />
              </Router>
            </Provider>
          );

          const squares = screen.getAllByTestId('crossword-square');

          let upperLeftCorner = squares[0];
          expect(upperLeftCorner).toHaveStyle(styles.square);

          fireEvent.click(upperLeftCorner);
          upperLeftCorner = squares[0];
          expect(upperLeftCorner).toHaveStyle(styles.currentSquare);

          fireEvent.keyDown(upperLeftCorner, { key: 'ArrowLeft', which: 38, keyCode: 38 });
          upperLeftCorner = squares[0];
          expect(upperLeftCorner).toHaveStyle(styles.currentSquare);
        });
      });
      describe('WHEN: The user tries to enter a non-alphabet character,', () => {
        it.each`
          key             | which           | keyCode
          ${'Enter'}      | ${13}           | ${13}
          ${'Alt'}        | ${18}           | ${18}
          ${'Control'}    | ${17}           | ${17}
          ${'Escape'}     | ${27}           | ${27}
        `('THEN: nothing happens.', ({ key, which, keyCode }) => {
          render(
            <Provider store={mockStore}>
              <Router>
                <Crossword />
              </Router>
            </Provider>
          );

          let upperLeftCorner = document.getElementById('0,0');
          expect(upperLeftCorner.innerHTML).toEqual('');

          fireEvent.keyPress(upperLeftCorner, { key, which, keyCode });
          upperLeftCorner = document.getElementById('0,0');

          expect(upperLeftCorner.innerHTML).toEqual('');
        });
      });
    });
    describe('GIVEN: a 2x2 crossword grid,', ()=>{
      describe('WHEN: the first page loads', () => {
        it('THEN: displays a loading message', () => {
          render(
            <Provider store={mockStore}>
              <Router>
                <Crossword />
              </Router>
            </Provider>
          );

          const loading = screen.getAllByText('Loading...')[0];

          expect(loading).toBeInTheDocument();
        });
        it('THEN: displays the numbers corresponding to the clues', () => {
          render(
            <Provider store={mockStore}>
              <Router>
                <Crossword />
              </Router>
            </Provider>
          );

          const numberOne = screen.getAllByText('1')[0];
          const numberTwos = screen.getAllByText('2');

          expect(numberOne).toBeInTheDocument();
          expect(numberTwos[0]).toBeInTheDocument();
          expect(numberTwos[1]).toBeInTheDocument();
        });
      });
      // describe('WHEN: The user has correctly filled it out,', () => {
      //   test.skip('THEN: all squares have the victory styling.', async () => {
      //     const mockData = [{
      //       id: 1,
      //       solution: 'abcd',
      //       cluesAcross: '1. Some clue,2. Some other clue',
      //       cluesDown: '1. Moris,2. Borris',
      //       title: 'foo',
      //       author: 'bar',
      //       created_at: Date.now(),
      //     }];
      //     getData.mockResolvedValueOnce(mockData);
      //     const { debug } = render(
      //       <Provider store={mockStore}>
      //         <Router>
      //           <Crossword />
      //         </Router>
      //       </Provider>
      //     );
      //
      //     let squares = screen.getAllByTestId('crossword-square');
      //     let upperLeftCorner = squares[0];
      //     let upperRightCorner = squares[1];
      //     let lowerLeftCorner = squares[2];
      //     let lowerRightCorner = squares[3];
      //
      //     fireEvent.click(upperLeftCorner);
      //     fireEvent.keyPress(upperLeftCorner, { key: 'KeyA', which: 65, keyCode: 65 });
      //     fireEvent.click(upperRightCorner);
      //     fireEvent.keyPress(upperRightCorner, { key: 'KeyB', which: 66, keyCode: 66 });
      //     fireEvent.click(lowerLeftCorner);
      //     fireEvent.keyPress(upperLeftCorner, { key: 'KeyC', which: 67, keyCode: 67 });
      //     fireEvent.click(lowerRightCorner);
      //     fireEvent.keyPress(lowerRightCorner, { key: 'KeyD', which: 68, keyCode: 68 });
      //
      //     expect(upperLeftCorner).toHaveStyle(styles.squareVictory);
      //     expect(upperRightCorner).toHaveStyle(styles.squareVictory);
      //     expect(lowerLeftCorner).toHaveStyle(styles.squareVictory);
      //     expect(lowerRightCorner).toHaveStyle(styles.squareVictory);
      //   });
      // });
    });
  });
});
