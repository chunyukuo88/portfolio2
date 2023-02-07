import React from 'react';
import {fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'react-dom';

import Crossword from './Crossword.jsx';
import { styles } from './styles.js';
import { emptyGridTwoByTwo, emptyGridFiveByFive } from './utils';

jest.mock('./utils', () => {
  const originalModule = jest.requireActual('./utils');
  return {
    __esModule: true,
    ...originalModule,
    getData: () => new Promise((res, rej) => {
      res({
        author: 'Alex Gochenour',
        cluesAcross: '1. A type of application testing,2. 1990s music token',
        cluesDown: '1. Hit this when it\'s hot,2. Becton Dickinson and Company',
        created_at: '2023-02-05T22:22:03+00:00',
        id: 1,
        solution: 'abcd',
        theme: 'Test',
        title: 'Test',
      });
    }),
  };
});

describe('Crossword.jsx', ()=> {
  describe('GIVEN: The 5x5 crossword grid is empty,', ()=>{
    describe('WHEN: the user clicks on a square,', ()=>{
      it('THEN: the square becomes highlighted.',()=>{
        render(<Crossword grid={emptyGridTwoByTwo}/>);

        const squares = screen.getAllByTestId('crossword-square');

        let neighboringSquareLeft = squares[1];
        expect(neighboringSquareLeft).toHaveStyle(styles.square);

        const clicked = squares[2];
        fireEvent.click(clicked);

        expect(clicked).toHaveStyle(styles.currentSquare);
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
        render(<Crossword grid={emptyGridFiveByFive}/>);

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
        render(<Crossword grid={emptyGridTwoByTwo}/>);

        const squares = screen.getAllByTestId('crossword-square');

        let upplerLeftCorner = squares[0];
        expect(upplerLeftCorner).toHaveStyle(styles.square);

        fireEvent.click(upplerLeftCorner);
        upplerLeftCorner = squares[0];
        expect(upplerLeftCorner).toHaveStyle(styles.currentSquare);

        fireEvent.keyDown(upplerLeftCorner, { key: 'ArrowLeft', which: 38, keyCode: 38 });
        upplerLeftCorner = squares[0];
        expect(upplerLeftCorner).toHaveStyle(styles.currentSquare);
      });
    });
    describe('WHEN: The user tries to enter a non-alphabet character,', () => {
      it('THEN: nothing happens.', () => {
        render(<Crossword grid={emptyGridTwoByTwo}/>);

        let squares = screen.getAllByTestId('crossword-square');
        let upperLeftCorner = squares[0];
        expect(upperLeftCorner.value).toEqual('');

        fireEvent.keyPress(upperLeftCorner, { key: 'Digit1', which: 18, keyCode: 18 });
        squares = screen.getAllByTestId('crossword-square');
        upperLeftCorner = squares[0];

        expect(upperLeftCorner.value).toEqual('');
      });
    });
  });
  describe('GIVEN: a 2x2 crossword grid,', ()=>{
    describe('WHEN: the first page loads', () => {
      it('THEN: displays a loading message', () => {
        render(<Crossword grid={emptyGridTwoByTwo}/>);

        const loading = screen.getAllByText('Loading...')[0];

        expect(loading).toBeInTheDocument();
      });
      it('THEN: displays the numbers corresponding to the clues', () => {
        render(<Crossword grid={emptyGridTwoByTwo}/>);

        const numberOne = screen.getAllByText('1')[0];
        const numberTwos = screen.getAllByText('2');

        expect(numberOne).toBeInTheDocument();
        expect(numberTwos[0]).toBeInTheDocument();
        expect(numberTwos[1]).toBeInTheDocument();
      });
    });
    describe('WHEN: the crossword data has been fetched,', () => {
      it('THEN: displays the title and clues', () => {
        render(<Crossword grid={emptyGridTwoByTwo}/>);

        const clue = screen.getByText('1. A type of application testing');
        expect(clue).toBeInTheDocument();
      });
    });
    describe.skip('WHEN: The user has correctly filled it out,', () => {
      render(<Crossword grid={emptyGridTwoByTwo}/>);
      const squares = screen.getAllByTestId('crossword-square');
      const upperLeftCorner = squares[0];
      const upperRightCorner = squares[1];
      const lowerLeftCorner = squares[2];
      const lowerRightCorner = squares[3];
      fireEvent.click(upperLeftCorner);
      fireEvent.keyPress(upperLeftCorner, { key: 'KeyA', which: 65, keyCode: 65 });
      fireEvent.click(upperRightCorner);
      fireEvent.keyPress(upperRightCorner, { key: 'KeyB', which: 66, keyCode: 66 });
      fireEvent.click(lowerLeftCorner);
      fireEvent.keyPress(upperLeftCorner, { key: 'KeyC', which: 67, keyCode: 67 });
      fireEvent.click(lowerRightCorner);
      fireEvent.keyPress(lowerRightCorner, { key: 'KeyD', which: 68, keyCode: 68 });
      test('THEN: the victory banner is displayed.', () => {
        const victoryBanner = screen.queryByText('Victory! Gud jerb');

        expect(victoryBanner).toBeInTheDocument();
      });
      test('THEN: the grid is immutable.', () => {
        fireEvent.click(upperLeftCorner);
        fireEvent.keyPress(upperLeftCorner, { key: 'Del', which: 46, keyCode: 46 });
        fireEvent.keyPress(upperLeftCorner, { key: 'Backspace', which: 8, keyCode: 8 });
        fireEvent.keyPress(upperLeftCorner, { key: 'KeyB', which: 66, keyCode: 66 });

        expect(upperLeftCorner.value).toEqual('a');
      });
      test('THEN: all squares have the victory styling.', () => {
        expect(upperLeftCorner).toHaveStyle(styles.squareVictory);
        expect(upperRightCorner).toHaveStyle(styles.squareVictory);
        expect(lowerLeftCorner).toHaveStyle(styles.squareVictory);
        expect(lowerRightCorner).toHaveStyle(styles.squareVictory);
      });
    });
  });
});
