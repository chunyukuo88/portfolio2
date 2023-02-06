import React, {useState, useMemo } from 'react';
import { styles } from './styles.js';
import { createClient } from '@supabase/supabase-js'
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

// export const emptyGrid = [
//   [ { value: '' },{ value: '' },{ value: '' },{ value: '' },{ value: '' } ],
//   [ { value: '' },{ value: '' },{ value: '' },{ value: '' },{ value: '' } ],
//   [ { value: '' },{ value: '' },{ value: '' },{ value: '' },{ value: '' } ],
//   [ { value: '' },{ value: '' },{ value: '' },{ value: '' },{ value: '' } ],
//   [ { value: '' },{ value: '' },{ value: '' },{ value: '' },{ value: '' } ],
// ];

export const emptyGrid = [
  [ { value: '' },{ value: '' } ],
  [ { value: '' },{ value: '' } ],
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

  const crosswordPromise = useMemo(async () => {
    return await getData();
  }, []);

  let crosswordData;
  crosswordPromise.then((data) => {
    crosswordData = data;
  });

  const { width, height } = useWindowSize();
  const { grid } = props;
  const [ gridCopy, setGridCopy] = useState([...JSON.parse(JSON.stringify(grid))]);
  const [focused, setFocused] = useState(undefined);
  const [userHasWon, setUserHasWon] = useState(false);

  const getStyleRuleName = (outerIndex, innerIndex) => {
    if (!focused) return 'square';
    const isFocused = (focused[0] === outerIndex && focused[1] === innerIndex);
    return (isFocused) ? 'currentSquare' : 'square';
  };

  const clickHandler = (outerIndex, innerIndex) => {
    setFocused([outerIndex, innerIndex]);
  };

  const nonAlphabetics = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Alt', 'Del', 'Backspace' ];

  const getNewCoordinates = (direction, outerIndex, innerIndex) => {
    switch (direction) {
      case nonAlphabetics[0]: return [outerIndex - 1, innerIndex];
      case nonAlphabetics[1]: return [outerIndex + 1, innerIndex];
      case nonAlphabetics[2]: return [outerIndex, innerIndex - 1];
      case nonAlphabetics[3]: return [outerIndex, innerIndex + 1];
      default: return [outerIndex, innerIndex];
    }
  };

  const isOutsideGrid = ([i, j]) =>  (
    i > gridCopy.length - 1
    || i < 0
    || j > gridCopy.length - 1
    || j < 0
  );

  const processMovementKey = (key, outerIndex, innerIndex) => {
    const [i, j] = getNewCoordinates(key, outerIndex, innerIndex);
    if (isOutsideGrid([i, j])) return;
    const previousSquare = document.getElementById(`${outerIndex},${innerIndex}`);
    previousSquare.blur();
    const newSquare = document.getElementById(`${i},${j}`);
    newSquare.focus();
    return setFocused([i,j]);
  };

  const determineIfUserWon = () => {
    let userHasWon = true;
    let solutionIndex = 0;
    outerLoop: for (let i = 0; i < gridCopy.length; i++) {
      for (let j = 0; j < gridCopy.length; j++) {
        if (!(gridCopy[i][j].value.toLowerCase() === crosswordData[0].solution[solutionIndex].toLowerCase())) {
          userHasWon = false;
          break outerLoop;
        } else {
          solutionIndex++;
        }
      };
    };
    return userHasWon;
  };

  const keyDownHandler = (event, outerIndex, innerIndex) => {
    const { key } = event;
    if (nonAlphabetics.includes(key)) {
      return processMovementKey(key, outerIndex, innerIndex);
    }
    gridCopy[outerIndex][innerIndex].value = key;
    return setGridCopy(gridCopy);
  };

  return (
      <main style={styles.main}>
        <section style={styles.section}>
          <h1 style={styles.title}>Crossword</h1>
          { (userHasWon) ? <Confetti width={width} height={height} tweenDuration={1000}/> : null}
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
                        onChange={() =>setUserHasWon(determineIfUserWon)}
                        onKeyDown={(e) => keyDownHandler(e, outerIndex, innerIndex)}
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
