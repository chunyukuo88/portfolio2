import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as utils from '../../common/utils';

import { mockStore } from '../../testUtils';
import ReactGA from 'react-ga4';
import Crossword from './Crossword.jsx';
import { styles } from './styles.js';
import strings from '../../common/strings';

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks(); // Clears out spies.
});

const crosswordsFromDatabase = [
  {
    author: "Alex Gochenour",
    cluesAcross: "1. Samsung Apple Google and,2. Corny Columbian snack,3. A moribund person,4. Not subtle,5. One way to pluralize 'serum'",
    cluesDown: "1. Nigerian financial hub,2. A stand of trees,3. Spanish word for 'has',4. A cake or an art,5. Origami or oil paint for example,",
    created_at: "2023-02-17T22:02:19.133891+00:00",
    id: 6,
    solution: "lgtooarepagonerovertseras",
    theme: "",
    title: "For Famous Flutist",
  },
  {
    author: "Alex Gochenour",
    cluesAcross: "1. Skewered meats&&2. My Alex (in Arabic)&&3. End all&&4. Awful giants&&5. Scrambled abyss",
    cluesDown: "1. Alternate to 1-ACROSS&&2. Song of lament&&3. Yogi or Smoky&&4. They connect wheels&&5. UW's School of",
    created_at: "2023-02-07 22:56:55+00",
    id: 6,
    solution: "kebabalexibeallogresbyssa",
    theme: "",
    title: "Three Arabic Words",
  },
];

function correctlyFillOutCrossword(cells) {
  fireEvent.click( cells[0]);
  fireEvent.keyDown(cells[0], { key: 'l', keyCode: 76 });
  fireEvent.click( cells[1]);
  fireEvent.keyDown(cells[1], { key: 'g', keyCode: 71 });
  fireEvent.click( cells[2]);
  fireEvent.keyDown(cells[2], { key: 't', keyCode: 84 });
  fireEvent.click( cells[3]);
  fireEvent.keyDown(cells[3], { key: 'o', keyCode: 79 });
  fireEvent.click( cells[4]);
  fireEvent.keyDown(cells[4], { key: 'o', keyCode: 79 });
  fireEvent.click( cells[5]);
  fireEvent.keyDown(cells[5], { key: 'a', keyCode: 65 });
  fireEvent.click( cells[6]);
  fireEvent.keyDown(cells[6], { key: 'r', keyCode: 82 });
  fireEvent.click( cells[7]);
  fireEvent.keyDown(cells[7], { key: 'e', keyCode: 69 });
  fireEvent.click( cells[8]);
  fireEvent.keyDown(cells[8], { key: 'p', keyCode: 80 });
  fireEvent.click( cells[9]);
  fireEvent.keyDown(cells[9], { key: 'a', keyCode: 65 });
  fireEvent.click( cells[10]);
  fireEvent.keyDown(cells[10], { key: 'g', keyCode: 71 });
  fireEvent.click( cells[11]);
  fireEvent.keyDown(cells[11], { key: 'o', keyCode: 79 });
  fireEvent.click( cells[12]);
  fireEvent.keyDown(cells[12], { key: 'n', keyCode: 78 });
  fireEvent.click( cells[13]);
  fireEvent.keyDown(cells[13], { key: 'e', keyCode: 69 });
  fireEvent.click( cells[14]);
  fireEvent.keyDown(cells[14], { key: 'r', keyCode: 82 });
  fireEvent.click( cells[15]);
  fireEvent.keyDown(cells[15], { key: 'o', keyCode: 79 });
  fireEvent.click( cells[16]);
  fireEvent.keyDown(cells[16], { key: 'v', keyCode: 86 });
  fireEvent.click( cells[17]);
  fireEvent.keyDown(cells[17], { key: 'e', keyCode: 69 });
  fireEvent.click( cells[18]);
  fireEvent.keyDown(cells[18], { key: 'r', keyCode: 82 });
  fireEvent.click( cells[19]);
  fireEvent.keyDown(cells[19], { key: 't', keyCode: 84 });
  fireEvent.click( cells[20]);
  fireEvent.keyDown(cells[20], { key: 's', keyCode: 83 });
  fireEvent.click( cells[21]);
  fireEvent.keyDown(cells[21], { key: 'e', keyCode: 69 });
  fireEvent.click( cells[22]);
  fireEvent.keyDown(cells[22], { key: 'r', keyCode: 82 });
  fireEvent.click( cells[23]);
  fireEvent.keyDown(cells[23], { key: 'a', keyCode: 65 });
  fireEvent.click( cells[24]);
  fireEvent.keyDown(cells[24], { key: 's', keyCode: 83 });
}

describe('Crossword.jsx', ()=> {
  describe('GIVEN: there are no problems with the crossword API,', ()=>{
    describe('WHEN: the first page loads', () => {
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
  });
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
    it('THEN: the side and top of the cube transform.', async () => {
      jest.spyOn(utils, 'getData').mockReturnValueOnce(
        new Promise((resolve, reject) => {
          resolve(crosswordsFromDatabase);
        })
      );
      render(
        <Provider store={mockStore}>
          <Router>
            <Crossword/>
          </Router>
        </Provider>
      );

      await waitFor(() => {
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
  });
  describe('WHEN: The user clicks the dropdown menu,', () => {
    it('THEN: It displays older crossword puzzles,', async () => {
      jest.spyOn(utils, 'getData').mockReturnValueOnce(
        new Promise((resolve, reject) => {
          resolve(crosswordsFromDatabase);
        })
      );
      render(
        <Provider store={mockStore}>
          <Router>
            <Crossword/>
          </Router>
        </Provider>
      );

      await waitFor(() => {
        const menuOptions = screen.getAllByRole('option');
        expect(menuOptions).toHaveLength(3);
        expect(menuOptions[0]).toHaveTextContent('-- Previous Puzzles --');
        expect(menuOptions[1]).toHaveTextContent('For Famous Flutist');
        expect(menuOptions[2]).toHaveTextContent('Three Arabic Words');
      });
    });
  });
  describe('WHEN: The user clicks an option from the dropdown menu,', () => {
    it('THEN: It sets today"s puzzle to be the option the user selected.', async () => {
      jest.spyOn(utils, 'getData').mockReturnValueOnce(
        new Promise((resolve, reject) => {
          resolve(crosswordsFromDatabase);
        })
      );
      render(
        <Provider store={mockStore}>
          <Router>
            <Crossword/>
          </Router>
        </Provider>
      );

      await waitFor(() => {
        let todaysPuzzle = screen.getByRole('heading', { level: 2 });
        expect(todaysPuzzle).toHaveTextContent(/For Famous Flutist/);

        const menu = document.querySelector('select');
        fireEvent.click(menu);
        const menuOptions = screen.getAllByRole('option');
        fireEvent.change(menu, { target: { value: menuOptions[1].innerHTML } });
        todaysPuzzle = screen.getByRole('heading', { level: 2 });

        expect(todaysPuzzle).toHaveTextContent(/For Famous Flutist/);
      });
    });
  });
  describe('GIVEN: The crossword grid is empty,', ()=>{
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
  describe('GIVEN: the user has filled in the grid,', () => {
    describe('WHEN: the user has only partially filled in the grid,', () => {
      it('THEN: does not trigger an animation.', async () => {
        jest.spyOn(utils, 'getData').mockReturnValueOnce(
          new Promise((resolve, reject) => {
            resolve(crosswordsFromDatabase);
          })
        );
        render(
          <Provider store={mockStore}>
            <Router>
              <Crossword />
            </Router>
          </Provider>
        );
        let cells = document.querySelectorAll('.crossword-square');
        await waitFor(() => {
          fireEvent.click(cells[0]);
          fireEvent.keyDown(cells[0], {key: 'k', keyCode: 75});
          cells = document.querySelectorAll('.crossword-square');

          expect(cells[0]).not.toHaveStyle(styles.squareVictory);
        });
      });
    });
    describe('WHEN: the user has filled it in correctly,', () => {
      it('THEN: it triggers an animation.', async () => {
        jest.spyOn(utils, 'getData').mockReturnValueOnce(
          new Promise((resolve, reject) => {
            resolve(crosswordsFromDatabase);
          })
        );
        render(
          <Provider store={mockStore}>
            <Router>
              <Crossword />
            </Router>
          </Provider>
        );

        let cells = document.querySelectorAll('.crossword-square');
        await waitFor(() => {
          correctlyFillOutCrossword(cells)
          cells = document.querySelectorAll('.crossword-square');
          expect(cells[0]).toHaveStyle(styles.squareVictory);
        });
      });
    });
  });
  describe('GIVEN: there is a problem with the crossword API,', ()=>{
    describe('WHEN: the page loads,', () => {
      it('THEN: displays error messages on the cube.', async () => {
        jest.spyOn(utils, 'getData').mockRejectedValueOnce(new Error('API is down'));
        render(
          <Provider store={mockStore}>
            <Router>
              <Crossword />
            </Router>
          </Provider>
        );
        const { ENGLISH, errorCrosswordUnavailable } = strings;
        await waitFor(() => {
          const errorMsgOnCube = screen.getByText(errorCrosswordUnavailable[ENGLISH]);

          expect(errorMsgOnCube).toBeInTheDocument();
        });
      });
    });
  });
});
