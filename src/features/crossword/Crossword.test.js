import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import Crossword from './Crossword.jsx';
import '@testing-library/jest-dom';
import { styles } from './styles.js';
import 'react-dom';

describe('GIVEN: The 5x5 crossword grid is empty,', ()=>{
  describe('WHEN: the user clicks on a square,', ()=>{
    it('THEN: the entire row is highlighted.',()=>{
      render(<Crossword />);

      const squares = screen.getAllByTestId('crossword-square');

      let neighboringSquareLeft = squares[1];
      expect(neighboringSquareLeft).toHaveStyle(styles.square);

      fireEvent.click(squares[2]);

      neighboringSquareLeft = squares[1];
      expect(neighboringSquareLeft).toHaveStyle(styles.neighbor);
    });
  });
});
