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
});
