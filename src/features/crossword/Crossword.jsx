import React, {useState, useEffect} from 'react';
import { styles } from './styles.js';
import { createClient } from '@supabase/supabase-js'
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

export const emptyGrid = [
  [{ coords: [0,0], value: '' },{ coords: [0,1], value: '' },{ coords: [0,2], value: '' },{ coords: [0,3], value: '' },{ coords: [0,4], value: '' } ],
  [{ coords: [1,0], value: '' },{ coords: [1,1], value: '' },{ coords: [1,2], value: '' },{ coords: [1,3], value: '' },{ coords: [1,4], value: '' } ],
  [{ coords: [2,0], value: '' },{ coords: [2,1], value: '' },{ coords: [2,2], value: '' },{ coords: [2,3], value: '' },{ coords: [2,4], value: '' } ],
  [{ coords: [3,0], value: '' },{ coords: [3,1], value: '' },{ coords: [3,2], value: '' },{ coords: [3,3], value: '' },{ coords: [3,4], value: '' } ],
  [{ coords: [4,0], value: '' },{ coords: [4,1], value: '' },{ coords: [4,2], value: '' },{ coords: [4,3], value: '' },{ coords: [4,4], value: '' }],
];

export default function Crossword(props){
  const supabase = createClient(
    'https://czzbyiyicvjcorsepbfp.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6emJ5aXlpY3ZqY29yc2VwYmZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ1MTExNjgsImV4cCI6MTk5MDA4NzE2OH0.y06BXLuGUGK4HbOq6seg2l6ndzbbG46-NjOzGj2xRJo'
  );
  const getData = async () => {
    const { data, err } = await supabase
      .from('Crossword-Solutions')
      .select('*')
    if (err) console.error('you broke it: ', err);
    return data;
  };

  const crosswordPromise = React.useMemo(async () => {
    return await getData();
  }, []);

  let crosswordData;
  crosswordPromise.then((data) => {
    crosswordData = data;
  });

  const { width, height } = useWindowSize();
  const { grid } = props;
  const [ gridCopy, setGridCopy] = useState(JSON.parse(JSON.stringify(grid)));
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
      default: return [outerIndex, innerIndex];
    }
  };

  const isOutsideGrid = ([i, j]) =>  (
    i > gridCopy.length - 1
    || i < 0
    || j > gridCopy.length - 1
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

  const userWon = () => {
    const crosswordSolution = crosswordData[0].solution;
    let userHasWon = false;
    let solutionIndex = 0;
    outerLoop: for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        const currentSquare = gridCopy[i][j]['value'];
        console.log('currentSquare: ', currentSquare);
        console.log('solution square: ', crosswordSolution[solutionIndex].toLowerCase())
        if (!currentSquare.toLowerCase() === crosswordSolution[solutionIndex].toLowerCase()) {
          userHasWon = false;
          break outerLoop;
        } else {
          solutionIndex++;
        }
      };
    };
    console.log('currentSquare.value: ', userHasWon);
    return userHasWon;
  };

  const keyDownHandler = (event, outerIndex, innerIndex) => {
    const { key } = event;
    if (movementKeys.includes(key)) {
      return processMovementKey(key, outerIndex, innerIndex);
    }
  };

  const changeHandler = (event, outerIndex, innerIndex) => {
    const updatedGrid = JSON.parse(JSON.stringify(gridCopy));
    updatedGrid[outerIndex][innerIndex].value = event.target.value;
    setGridCopy(updatedGrid);
    if (userWon() === true) {
      console.log('user has won!');
    }

  };

  return (
      <main style={styles.main}>
        <section style={styles.section}>
          <h1 style={styles.title}>Crossword</h1>
          {/*<Confetti*/}
          {/*  width={width}*/}
          {/*  height={height}*/}
          {/*  tweenDuration={1000}*/}
          {/*/>*/}
          {
            gridCopy.map((row, outerIndex) => (
              <div style={styles.row} key={outerIndex}>
                {
                  row.map((square, innerIndex) => {
                    const style = styles[getStyleRuleName(outerIndex, innerIndex)];
                    return (
                      <input
                        autoComplete='off'
                        data-testid='crossword-square'
                        id={`${outerIndex},${innerIndex}`}
                        key={innerIndex}
                        maxLength='1'
                        onClick={() => clickHandler(outerIndex, innerIndex)}
                        onChange={(e) => changeHandler(e, outerIndex, innerIndex)}
                        onKeyDown={(e) => keyDownHandler(e, outerIndex, innerIndex)}
                        style={style}
                        tabIndex={-1}
                        value={gridCopy[outerIndex][innerIndex].value}
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
