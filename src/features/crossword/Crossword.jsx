import React, { useEffect, useState } from 'react';
import { styles } from './styles.js';
import { getData } from './utils';

export default function Crossword(props){
  useEffect( () => {
    getData().then(data => {
      const newestPuzzle = data[data.length - 1];
      setCrosswordData(newestPuzzle);
    });
  }, []);

  const { grid } = props;
  const [ gridCopy, setGridCopy] = useState([...JSON.parse(JSON.stringify(grid))]);
  const [focused, setFocused] = useState(undefined);
  const [userHasWon, setUserHasWon] = useState(false);
  const [crosswordData, setCrosswordData] = useState(undefined);

  const getStyleRuleName = (outerIndex, innerIndex) => {
    if (userHasWon) return 'squareVictory';
    if (!focused) return 'square';
    const isFocused = (focused[0] === outerIndex && focused[1] === innerIndex);
    return (isFocused) ? 'currentSquare' : 'square';
  };

  const clickHandler = (outerIndex, innerIndex) => {
    setFocused([outerIndex, innerIndex]);
  };

  const nonAlphabetics = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Alt', 'Del', 'Backspace'];

  const getNewCoordinates = (direction, outerIndex, innerIndex) => {
    switch (direction) {
      case nonAlphabetics[0]: return [outerIndex - 1, innerIndex];
      case nonAlphabetics[1]: return [outerIndex + 1, innerIndex];
      case nonAlphabetics[2]: return [outerIndex, innerIndex - 1];
      case nonAlphabetics[3]: return [outerIndex, innerIndex + 1];
      default: return [outerIndex, innerIndex];
    }
  };

  const isOutsideGrid = ([i, j]) => (
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
        if (!(gridCopy[i][j].value.toLowerCase() === crosswordData.solution[solutionIndex].toLowerCase())) {
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

  const Clues = ({ crosswordData }) => {
    const cluesAcross = crosswordData.cluesAcross.split(',');
    const cluesDown = crosswordData.cluesDown.split(',');

    return (
      <>
        <h3>Across:</h3>
        {cluesAcross.map(clue => <div key={clue[0]}>{clue}</div>)}
        <h3>Down:</h3>
        {cluesDown.map(clue => <div key={clue[0]}>{clue}</div>)}
      </>
    );
  };
  const getClueNumber = (outerIndex, innerIndex) => {
    if (outerIndex === 0) return <>{innerIndex + 1}</>
    if (innerIndex === 0) return <>{outerIndex + 1}</>
  };

  return (
      <main style={styles.main}>
        <section style={styles.section}>
          <h1 style={styles.title}>Crossword</h1>
          { (userHasWon) ? <h1>Victory! Gud jerb</h1> : null}
          {
            gridCopy.map((row, outerIndex) => (
              <div style={styles.row} key={outerIndex}>
                {
                  row.map((square, innerIndex) => {
                    const style = styles[getStyleRuleName(outerIndex, innerIndex)];
                    return (
                      <div style={styles.squareWrapper} key={innerIndex}>
                        <div className='clue-number' style={styles.clueNumber}>{getClueNumber(outerIndex, innerIndex)}</div>
                        <input
                          autoComplete='off'
                          data-testid='crossword-square'
                          id={`${outerIndex},${innerIndex}`}
                          maxLength='1'
                          onClick={() => clickHandler(outerIndex, innerIndex)}
                          onChange={() => setUserHasWon(determineIfUserWon)}
                          onKeyDown={(e) => keyDownHandler(e, outerIndex, innerIndex)}
                          style={style}
                          tabIndex={-1}
                          readOnly={userHasWon}
                        />
                      </div>
                    )}
                  )
                }
              </div>
            ))
          }
          {crosswordData ? <Clues crosswordData={crosswordData}/> : <p>Loading...</p>}
        </section>
      </main>
  );
}
