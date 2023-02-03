import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'react-dom';

import Crossword, { emptyGrid } from './Crossword.jsx';
import { styles } from './styles.js';

describe('Crossword.jsx', ()=> {
  describe('GIVEN: The 5x5 crossword grid is empty,', ()=>{
    describe('WHEN: the user clicks on a square,', ()=>{
      it('THEN: the square becomes highlighted.',()=>{
        render(<Crossword grid={emptyGrid}/>);

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
        render(<Crossword grid={emptyGrid}/>);

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
        render(<Crossword grid={emptyGrid}/>);

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
        render(<Crossword grid={emptyGrid}/>);

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
  describe('GIVEN: The 5x5 crossword grid is correctly filled,', ()=>{
    describe('WHEN: The user clicks the submit button,', () => {
      test('THEN: It checks the solution with the server.', () => {
        
      });
      test('THEN: Confetti is displayed.', () => {
        //
      });
    });
  });
  describe('GIVEN: The 5x5 crossword grid is filled but not correct,', ()=>{
    describe('WHEN: The user clicks the submit button,', () => {
      test('THEN: A message is displayed indicating that the grid has mistakes.', () => {
        //
      });
    });
  });
});
