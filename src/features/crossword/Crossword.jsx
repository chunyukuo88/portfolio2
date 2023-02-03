import React, { useState, useRef } from 'react';
import { styles } from './styles.js';

export const emptyGrid = [
  [{ coords: [0,0] },{ coords: [0,1] },{ coords: [0,2] },{ coords: [0,3] },{ coords: [0,4]} ],
  [{ coords: [1,0] },{ coords: [1,1] },{ coords: [1,2] },{ coords: [1,3] },{ coords: [1,4]} ],
  [{ coords: [2,0] },{ coords: [2,1] },{ coords: [2,2] },{ coords: [2,3] },{ coords: [2,4]} ],
  [{ coords: [3,0] },{ coords: [3,1] },{ coords: [3,2] },{ coords: [3,3] },{ coords: [3,4]} ],
  [{ coords: [4,0] },{ coords: [4,1] },{ coords: [4,2] },{ coords: [4,3] },{ coords: [4,4]}],
];

export default function Crossword(props){
  const [grid, setGrid] = useState(props.grid);
  const [focused, setFocused] = useState(undefined);

  const getStyleRuleName = (outerIndex, innerIndex) => {
    if (!focused) return 'square';
    const isFocused = (focused[0] === outerIndex && focused[1] === innerIndex);
    return (isFocused) ? 'currentSquare' : 'square';
  };

  const clickHandler = (outerIndex, innerIndex) => {
    setFocused([outerIndex, innerIndex]);
  };

  const movementKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

  const getNewCoordinates = (direction, outerIndex, innerIndex) => {
    switch (direction) {
      case movementKeys[0]: return [outerIndex - 1, innerIndex];
      case movementKeys[1]: return [outerIndex + 1, innerIndex];
      case movementKeys[2]: return [outerIndex, innerIndex - 1];
      case movementKeys[3]: return [outerIndex, innerIndex + 1];
    }
  };

  const isOutsideGrid = ([i, j]) =>  (
    i > grid.length - 1
    || i < 0
    || j > grid.length - 1
    || j < 0
  );

  const processMovementKey = (direction, outerIndex, innerIndex) => {
    const [i, j] = getNewCoordinates(direction, outerIndex, innerIndex);
    if (isOutsideGrid([i, j])) return;
    const previousSquare = document.getElementById(`${outerIndex},${innerIndex}`);
    previousSquare.blur();
    const newSquare = document.getElementById(`${i},${j}`);
    newSquare.focus();
    return setFocused([i,j]);
  };

  const changeHandler = (event, outerIndex, innerIndex) => {
    const { key } = event;
    if (movementKeys.includes(key)) {
      return processMovementKey(key, outerIndex, innerIndex);
    }
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
                      <input
                        autoComplete="off"
                        data-testid='crossword-square'
                        id={`${outerIndex},${innerIndex}`}
                        key={innerIndex}
                        maxLength="1"
                        onClick={() => clickHandler(outerIndex, innerIndex)}
                        onKeyDown={(e) => changeHandler(e, outerIndex, innerIndex)}
                        style={style}
                        tabIndex={-1}
                      />
                    )}
                  )
                }
              </div>
            ))
          }
        </section>
      </main>
  );
}
