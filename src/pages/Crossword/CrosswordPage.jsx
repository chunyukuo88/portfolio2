import { useEffect, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CluesCube } from './CluesCube';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';

import { useDispatch, useSelector } from 'react-redux';
import { useCommonGlobals } from '../../common/hooks';
import { getData } from '../../common/utils';
import {
  declareVictory,
  resetVictoryState,
  selectCurrentGrid,
  selectUserHasWon,
  updateGrid,
  resetGrid,
} from '../../features/crossword/crosswordSlice';

import { routes } from '../../routes';
import { styles } from './styles.js';
import strings from '../../common/strings';
import './Crossword.css';
import {LinkStyling} from "../../common/globalStyles";

export default function CrosswordPage(){
  const [ language ] = useCommonGlobals(routes.puzzle);
  const grid = useSelector(selectCurrentGrid);
  const userHasWon = useSelector(selectUserHasWon);
  const [focused, setFocused] = useState(undefined);
  const [hasError, setHasError] = useState(false);
  const [todaysPuzzle, setTodaysPuzzle] = useState(null);
  const [allPuzzles, setAllPuzzles] = useState(null);
  const dispatch = useDispatch();

  useEffect( () => {
    getData(process.env.REACT_APP_GET_ALL_CROSSWORDS)
      .then(data => {
        setAllPuzzles(data);
        setTodaysPuzzle(data[0]);
      })
      // TODO Add error card.
      .catch((e) => setHasError(true));
  }, []);

  useLayoutEffect(() => {
    todaysPuzzle && determineIfUserWon(grid);
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
        if (!(grid[i][j].value.toLowerCase() === todaysPuzzle.solution[solutionIndex].toLowerCase())) {
          userHasWon = false;
          break outerLoop;
        } else {
          solutionIndex++;
        }
      }
    }
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

  const getClueNumber = (outerIndex, innerIndex) => {
    if (outerIndex === 0) return <>{innerIndex + 1}</>
    if (innerIndex === 0) return <>{outerIndex + 1}</>
  };

  const optionHandler = (event) => {
    const { value } = event.target;
    const selectedPuzzle = allPuzzles.find(puzzle => puzzle.title === value);
    setTodaysPuzzle(selectedPuzzle);
    dispatch(resetGrid());
    return dispatch(resetVictoryState(false));
  };

  const DropdownMenu = () => (
    <select
      onChange={optionHandler}
      name="all-puzzles"
      id="all-puzzles-select"
    >
      <option value="">-- Previous Puzzles --</option>
      {allPuzzles ? allPuzzles.map(puzzle => (
        <option key={puzzle.solution} value={puzzle.title}>
          {puzzle.title}
        </option>
      )) : null}
    </select>
  );

  const Instructions = () => (
    <section className='crossword-instructions' aria-label='Crossword instructions'>
      <h5 aria-level='5'>Welcome to the crossword. I make these by hand. Click the title on the front face of the cube to the right to toggle the clues.</h5>
    </section>
  );

  return (
    <>
      <div id='room-container'>
        {todaysPuzzle && !hasError
          ? <CluesCube language={language} todaysPuzzle={todaysPuzzle} />
          : <div>{strings.errorCrosswordUnavailable[language]}</div>
        }
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
                      className='crossword-square'
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
        <DropdownMenu />
        <Instructions />
      </section>
      <nav className='back-to-home'>
        <Link style={LinkStyling} to={routes.index}>
          {strings.homePage[language]}
        </Link>
      </nav>
    </>
  );
}
