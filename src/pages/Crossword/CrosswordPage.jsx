import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCommonGlobals } from 'src/common/hooks';
import { useQuery } from '@tanstack/react-query';

import { queryKeys } from 'src/common/strings';
import { Link } from 'react-router-dom';
import { CluesCube } from './CluesCube';
import ErrorBoundary from 'src/components/ErrorBoundary/ErrorBoundary';
import {
  declareVictory,
  resetVictoryState,
  selectCurrentGrid,
  selectUserHasWon,
  updateGrid,
  resetGrid,
} from 'src/features/crossword/crosswordSlice';

import { getCrosswords } from 'src/common/utils';
import strings from 'src/common/strings';
import { routes } from 'src/routes';
import { LinkStyling } from 'src/common/globalStyles';
import { styles } from './styles.js';
import './Crossword.css';
import { LoadingSpinner} from 'src/components/LoadingSpinner/LoadingSpinner';
import { isOutsideGrid, nonAlphabetics, getNewCoordinates, getStyleRuleName } from './utils';

export default function CrosswordPage(){
  const [ language ] = useCommonGlobals(routes.puzzle);
  const grid = useSelector(selectCurrentGrid);
  const userHasWon = useSelector(selectUserHasWon);
  const [focused, setFocused] = useState(undefined);
  const [todaysPuzzleIndex, setTodaysPuzzleIndex] = useState(0);
  const dispatch = useDispatch();

  const queryResult = useQuery({
    queryKey: [queryKeys.CROSSWORD],
    queryFn: getCrosswords,
  });
  const allPuzzles = queryResult.data;

  useLayoutEffect(() => {
    if (!allPuzzles) return;
    determineIfUserWon(grid);
  }, [grid]);

  const clickHandler = (outerIndex, innerIndex) => {
    setFocused([outerIndex, innerIndex]);
  };

  const processMovementKey = (key, outerIndex, innerIndex) => {
    const [i, j] = getNewCoordinates(key, outerIndex, innerIndex);
    if (isOutsideGrid([i, j], grid)) return;
    const previousSquare = document.getElementById(`${outerIndex},${innerIndex}`);
    previousSquare.blur();
    const newSquare = document.getElementById(`${i},${j}`);
    newSquare.focus();
    return setFocused([i,j]);
  };

  const cellValueIsCorrect = (grid, i, j, solutionIndex) => {
    const cellValue = grid[i][j].value.toLowerCase();
    const solutionValue = allPuzzles[todaysPuzzleIndex].solution[solutionIndex].toLowerCase();
    return !(cellValue === solutionValue);
  };

  const determineIfUserWon = (grid) => {
    let userHasWon = true;
    let solutionIndex = 0;
    outerLoop: for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        if (cellValueIsCorrect(grid, i, j, solutionIndex)) {
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
    if (outerIndex === 0) return <>{innerIndex + 1}</>;
    if (innerIndex === 0) return <>{outerIndex + 1}</>;
  };

  const optionHandler = (event) => {
    const { value } = event.target;
    const indexOfSelectedPuzzle = allPuzzles.findIndex(puzzle => puzzle.title === value);
    setTodaysPuzzleIndex(indexOfSelectedPuzzle);
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

  if (queryResult.isLoading) return <LoadingSpinner language={language} />;
  if (queryResult.isError) return <div>{strings.errorCrosswordUnavailable[language]}</div>;

  return (
    <>
      <div id='room-container'>
        <CluesCube language={language} todaysPuzzle={allPuzzles[todaysPuzzleIndex]} />
      </div>
      <section id='interactive-section' >
        <ErrorBoundary>
          {grid.map((row, outerIndex) => (
            <div style={styles.row} key={outerIndex}>
              {row.map((square, innerIndex) => {
                const style = styles[getStyleRuleName(outerIndex, innerIndex, userHasWon, focused)];
                return (
                  <div style={styles.squareWrapper} key={innerIndex}>
                    <div className='clue-number' style={styles.clueNumber}>{getClueNumber(outerIndex, innerIndex)}</div>
                    <div
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
