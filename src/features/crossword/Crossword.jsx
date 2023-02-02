import React, { useState } from 'react';
import { styles } from './styles.js';

export default function Crossword(){
  console.log('rendered');
  
  const emptyGrid = [
    [{ value: '', coords: [0,0], isFocus: false },{ value: '', coords: [0,1], isFocus: false },{ value: '', coords: [0,2], isFocus: false },{ value: '', coords: [0,3], isFocus: false },{ value: '', coords: [0,4], isFocus: false}],
    [{ value: '', coords: [1,0], isFocus: false },{ value: '', coords: [1,1], isFocus: false },{ value: '', coords: [1,2], isFocus: false },{ value: '', coords: [1,3], isFocus: false },{ value: '', coords: [1,4], isFocus: false}],
    [{ value: '', coords: [2,0], isFocus: false },{ value: '', coords: [2,1], isFocus: false },{ value: '', coords: [2,2], isFocus: false },{ value: '', coords: [2,3], isFocus: false },{ value: '', coords: [2,4], isFocus: false}],
    [{ value: '', coords: [3,0], isFocus: false },{ value: '', coords: [3,1], isFocus: false },{ value: '', coords: [3,2], isFocus: false },{ value: '', coords: [3,3], isFocus: false },{ value: '', coords: [3,4], isFocus: false}],
    [{ value: '', coords: [4,0], isFocus: false },{ value: '', coords: [4,1], isFocus: false },{ value: '', coords: [4,2], isFocus: false },{ value: '', coords: [4,3], isFocus: false },{ value: '', coords: [4,4], isFocus: false}],
  ];
  const [grid, setGrid] = useState(emptyGrid);

  const getStyleRuleName = (outerIndex, innerIndex) => {
  const isFocused = grid[outerIndex][innerIndex].isFocus === true;
  return (isFocused) ? 'currentSquare' : 'square';
  };

  const clearFocus = () => {
    const newGrid = JSON.parse(JSON.stringify(grid));
    newGrid.forEach(row => {
      row.forEach(square => {
        square.isFocus = false;
      });
    });
    return newGrid;
  };

  const clickHandler = (outerIndex, innerIndex) => {
    const newGrid = clearFocus();
    newGrid[outerIndex][innerIndex].isFocus = true;
    setGrid(newGrid);
  };

  const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

  const getNewCoordinates = (direction, outerIndex, innerIndex) => {
    switch (direction) {
      case arrowKeys[0]: return [outerIndex - 1, innerIndex];
      case arrowKeys[1]: return [outerIndex + 1, innerIndex];
      case arrowKeys[2]: return [outerIndex, innerIndex - 1];
      case arrowKeys[3]: return [outerIndex, innerIndex + 1];
    }
  };

  const processArrowKey = (direction, outerIndex, innerIndex) => {
    const newGrid = clearFocus();
    const [i, j] = getNewCoordinates(direction, outerIndex, innerIndex);
    newGrid[i][j].isFocus = true;
    return setGrid(newGrid);
  };

  const keyDownHandler = (event, outerIndex, innerIndex) => {
    if (arrowKeys.includes(event.key)) {
      return processArrowKey(event.key, outerIndex, innerIndex);
    }
    console.log('pressed ', event.key);
  };

  return (
      <main style={styles.main}>
        <section style={styles.section}>
          <h1 style={styles.title}>Crossword</h1>
          {
            grid.map((row, outerIndex) => (
              <div style={styles.row} key={outerIndex}>
                {
                  row.map((square, innerIndex) => {
                    const style = styles[getStyleRuleName(outerIndex, innerIndex)];
                    return (
                      <div
                        key={innerIndex}
                        role='button'
                        data-testid='crossword-square'
                        style={style}
                        tabIndex='1'
                        onClick={() => clickHandler(outerIndex, innerIndex)}
                        onKeyDown={(e) => keyDownHandler(e, outerIndex, innerIndex)}
                      >
                        {square.value}
                      </div>
                      );
                    }
                  )
                }
              </div>
            ))
          }
        </section>
      </main>
  );
}