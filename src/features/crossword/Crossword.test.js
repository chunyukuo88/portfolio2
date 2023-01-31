import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Crossword } from './Crossword.jsx';
import '@testing-library/jest-dom'
import 'react-dom';

describe('GIVEN: The 5x5 crossword grid is empty,', ()=>{
  describe('WHEN: the user clicks on a square,', ()=>{
    it('THEN: the entire row is highlighted.', ()=>{
      // const { debug } = render(Crossword());
      const { debug } = render(<Crossword />);
      //
      // const squares = document.querySelectorAll('.square');
      // const neighboringSquareLeft = squares[1];
      // const neighboringSquareRight = squares[3];
      //
      // expect(neighboringSquareLeft).toHaveStyle('background-color: white');


      // const clickedSquare = squares[2];
      // fireEvent.click(clickedSquare);


    });
    // tests('THEN: the square is highlighted a different color.', ()=>{
    //   const props = {
    //     something: 'yay',
    //   };
    //   render(Crossword(props));
    //
    //   const main = document.querySelector('main');
    //
    //   expect(main.innerHTML).toEqual('yay');
    // });
  });
});