import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import Crossword from './Crossword.jsx';
import '@testing-library/jest-dom';
import { styles } from './styles.js';
import 'react-dom';

describe('GIVEN: The 5x5 crossword grid is empty,', ()=>{
  describe('WHEN: the user clicks on a square,', ()=>{
    it('THEN: the square becomes highlighted.',()=>{
      render(<Crossword />);

      const squares = screen.getAllByTestId('crossword-square');

      let neighboringSquareLeft = squares[1];
      expect(neighboringSquareLeft).toHaveStyle(styles.square);

      const clicked = squares[2];
      fireEvent.click(clicked);

      expect(clicked).toHaveStyle(styles.currentSquare);
    });
  });
  describe('WHEN: the user clicks in the center of the grid, then presses an arrow key,', () => {
    it('THEN: the square first clicked becomes white again, and the new square becomes highlighted.', () => {
      render(<Crossword />);

      const squares = screen.getAllByTestId('crossword-square');

      let centerSquare = squares[12];
      expect(centerSquare).toHaveStyle(styles.square);

      fireEvent.click(centerSquare);
      centerSquare = squares[12];
      let squareAboveCenter = squares[7];

      expect(centerSquare).toHaveStyle(styles.currentSquare);
      expect(squareAboveCenter).toHaveStyle(styles.square);

      fireEvent.keyDown(centerSquare, { key: 'ArrowUp', which: 38, keyCode: 38 });
      squareAboveCenter = squares[7];

      expect(squareAboveCenter).toHaveStyle(styles.currentSquare);
    });
  });
  describe('WHEN: the user is at the right edge of the crossword and presses the right keyboard button,', () => {
    it('THEN: nothing happens.', () => {
      // Corresponds to the TODO on line 47 of Crossword.jsx.
    });
  });
});
