import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styles } from './styles.js';
import strings from '../../common/strings';
import { getData } from '../../common/utils';
import {
  updateGrid, 
  declareVictory, 
  selectCurrentGrid, 
  selectUserHasWon
} from '../../features/crossword/crosswordSlice';
import { Link } from 'react-router-dom';
import './Crossword.css';
import { routes } from '../../routes';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import { useCommonGlobals } from '../../common/hooks';

export default function Crossword(){
  const [ language ] = useCommonGlobals(routes.puzzle);
  const grid = useSelector(selectCurrentGrid);
  const userHasWon = useSelector(selectUserHasWon);
  const [focused, setFocused] = useState(undefined);
  const [crosswordData, setCrosswordData] = useState(undefined);
  const [frontFaceClicked, setFrontFaceClicked] = useState(false);
  const dispatch = useDispatch();

  useEffect( () => {
    getData(process.env.REACT_APP_GET_CROSSWORD_INFO)
      .then(data => {
        const newestPuzzle = data[data.length - 1];
        setCrosswordData(newestPuzzle);
      })
      .catch((e) => new Error(e));
  }, []);

  useLayoutEffect(() => {
    crosswordData && determineIfUserWon(grid);
  }, [grid]);

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
    }
  };

  const isOutsideGrid = ([i, j]) => (
    i > grid.length - 1
    || i < 0
    || j > grid.length - 1
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

  const determineIfUserWon = (grid) => {
    let userHasWon = true;
    let solutionIndex = 0;
    outerLoop: for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        if (!(grid[i][j].value.toLowerCase() === crosswordData.solution[solutionIndex].toLowerCase())) {
          userHasWon = false;
          break outerLoop;
        } else {
          solutionIndex++;
        }
      };
    };
    if (userHasWon) return dispatch(declareVictory(userHasWon));
    return userHasWon;
  };

  const auxKeys = [ 'Delete', 'Backspace', 'Alt', 'Shift', 'Control', 'Escape', 'Meta', 'ContextMenu', 'Enter', 'Home', 'End', 'ScrollLock', 'PageUp', 'PageDown', 'Insert'];
  const keyDownHandler = (event, outerIndex, innerIndex) => {
    const { key } = event;
    if (auxKeys.includes(key)) return;
    if (nonAlphabetics.includes(key)) {
      return processMovementKey(key, outerIndex, innerIndex);
    }
    const updatedGrid = JSON.parse(JSON.stringify(grid));
    updatedGrid[outerIndex][innerIndex].value = key;
    return dispatch(updateGrid(updatedGrid));
  };

  const CluesAcross = ({ crosswordData }) => {
    const cluesAcross = crosswordData.cluesAcross.split(',');
    return (
      <div className='clues-box'>
        <h3 className={frontFaceClicked ? 'clues-direction-clicked' : 'clues-direction'}>Across:</h3>
        {cluesAcross.map((clue, key) => <div className='clue' key={key}>{clue}</div>)}
      </div>
    );
  };

  const CluesDown = ({ crosswordData }) => {
    const cluesDown = crosswordData.cluesDown.split(',');
    return (
      <div className='clues-box'>
        <h3 className={frontFaceClicked ? 'clues-direction-clicked' : 'clues-direction'}>Down:</h3>
        {cluesDown.map((clue, key) => <div className='clue' key={key}>{clue}</div>)}
      </div>
    );
  };

  const getClueNumber = (outerIndex, innerIndex) => {
    if (outerIndex === 0) return <>{innerIndex + 1}</>
    if (innerIndex === 0) return <>{outerIndex + 1}</>
  };

  const convertTimestamp = (date) => new Date(date).toLocaleDateString();

  const Title = () => {
    return crosswordData
      ? <section id='crossword-info'>
          <h2>{`'${crosswordData.title}'`}</h2>
          <h3>By {crosswordData.author}</h3>
          <h3>{convertTimestamp(crosswordData.created_at)}</h3>
        </section>
      : <Loading />;
  };

  const linkStyle = {
    color: 'black',
    textDecoration: 'none',
    textTransform: 'uppercase',
    width: '3rem',
  };

  const Loading = () => <p>{strings.loading[language]}</p>;

  return (
    <>
      <div id='room-container'>
        <ErrorBoundary>
          <main id='back-wall'>
              <section id='content-cube' >
                <div
                  data-testid='top-face'
                  className={frontFaceClicked ? 'top-face-clicked' : 'top-face-not-clicked'}
                >
                  {crosswordData
                    ? <CluesDown crosswordData={crosswordData}/>
                    : <Loading />
                  }
                </div>
                <div
                  data-testid='west-face'
                  className={frontFaceClicked ? 'west-face-clicked' : 'west-face-not-clicked'}
                >
                  {crosswordData
                    ? <CluesAcross crosswordData={crosswordData}/>
                    : <Loading />
                  }
                </div>
                <div
                  role='button'
                  onClick={() => setFrontFaceClicked(!frontFaceClicked)}
                  id='cube-face-front'
                >
                  <Title />
                </div>
              </section>
              <div id='side-wall' />
          </main>
          <div id='floor' />
        </ErrorBoundary>
      </div>
      <section id='interactive-section' >
        <ErrorBoundary>
          {grid.map((row, outerIndex) => (
            <div style={styles.row} key={outerIndex}>
              {row.map((square, innerIndex) => {
                const style = styles[getStyleRuleName(outerIndex, innerIndex)];
                return (
                  <div style={styles.squareWrapper} key={innerIndex}>
                    <div className='clue-number' style={styles.clueNumber}>{getClueNumber(outerIndex, innerIndex)}</div>
                    <div
                      data-testid='crossword-square'
                      id={`${outerIndex},${innerIndex}`}
                      autoComplete='off'
                      maxLength='1'
                      style={style}
                      tabIndex={-1}
                      readOnly={userHasWon}
                      onClick={() => clickHandler(outerIndex, innerIndex)}
                      onKeyDown={(e) => keyDownHandler(e, outerIndex, innerIndex)}
                    >
                      {grid[outerIndex][innerIndex].value}
                    </div>
                  </div>
                )})}
            </div>
          ))}
        </ErrorBoundary>
        <div style={{ marginTop: '2rem', width: '3rem', zIndex: 10000}}>
          <Link style={linkStyle} to={routes.index}>{strings.homePage[language]}</Link>
        </div>
      </section>
    </>
  );
}