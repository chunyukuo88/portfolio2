import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styles } from './styles.js';
import strings from '../../common/strings';
import ReactGA from 'react-ga4';
import { getData } from '../../common/utils';
import { updateGrid, declareVictory } from '../../features/crossword/crosswordSlice';
import { LinkStyling } from '../../common/globalStyles';
import { Link } from 'react-router-dom';
import './Crossword.css';
import { routes } from '../../routes';


export default function Crossword(){
  const grid = useSelector((state) => state.crossword.grid);
  const userHasWon = useSelector((state) => state.crossword.userWon);
  const language = useSelector((state) => state.language.value);
  const [focused, setFocused] = useState(undefined);
  const [crosswordData, setCrosswordData] = useState(undefined);
  const dispatch = useDispatch();

  useEffect( () => {
    ReactGA.send({ hitType: 'pageview', page: '/puzzle' });
    getData(process.env.REACT_APP_GET_CROSSWORD_INFO)
      .then(data => {
        const newestPuzzle = data[data.length - 1];
        setCrosswordData(newestPuzzle);
      })
      .catch((e) => new Error(e));
  }, []);


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

  const determineIfUserWon = () => {
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

  const keyDownHandler = (event, outerIndex, innerIndex) => {
    const { key } = event;
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
      <div style={styles.cluesBox}>
        <h3>Across:</h3>
        {cluesAcross.map((clue, key) => <div style={styles.clue} key={key}>{clue}</div>)}
      </div>
    );
  };

  const CluesDown = ({ crosswordData }) => {
    const cluesDown = crosswordData.cluesDown.split(',');
    return (
      <div style={styles.cluesBox}>
        <h3>Down:</h3>
        {cluesDown.map((clue, key) => <div style={styles.clue} key={key}>{clue}</div>)}
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
      ? <>
        <h2 style={styles.title}>{crosswordData.title}</h2>
        <h3>By {crosswordData.author}</h3>
        <h3>{convertTimestamp(crosswordData.created_at)}</h3>
      </>
      : strings.loading[language];
  };

  return (
    <>
      <section id='interactive-section' >
        <div>
            {grid.map((row, outerIndex) => (
              <div style={styles.row} key={outerIndex}>
                {row.map((square, innerIndex) => {
                  const style = styles[getStyleRuleName(outerIndex, innerIndex)];
                  return (
                    <div style={styles.squareWrapper} key={innerIndex}>
                      <div className='clue-number' style={styles.clueNumber}>{getClueNumber(outerIndex, innerIndex)}</div>
                      <input
                        data-testid='crossword-square'
                        id={`${outerIndex},${innerIndex}`}
                        autoComplete='off'
                        maxLength='1'
                        style={style}
                        tabIndex={-1}
                        readOnly={userHasWon}
                        onClick={() => clickHandler(outerIndex, innerIndex)}
                        onChange={determineIfUserWon}
                        onKeyDown={(e) => keyDownHandler(e, outerIndex, innerIndex)}
                      />
                    </div>
                  )})}
              </div>
            ))}
          </div>
        <div style={{ zIndex: 10000}}>
          <Link style={LinkStyling} to={routes.index}>{strings.homePage[language]}</Link>
        </div>
      </section>
      <main id='back-wall'>
          <section id='content-cube' >
            <div id='cube-face-up' >
              {crosswordData
                ? <CluesDown crosswordData={crosswordData}/>
                : <p>{strings.loading[language]}</p>
              }
            </div>
            <div id='cube-face-west' >
              {crosswordData
                ? <CluesAcross crosswordData={crosswordData}/>
                : <p>{strings.loading[language]}</p>
              }
            </div>
            <div id='cube-face-front' >
              <Title />
            </div>
          </section>
          <div id='side-wall' />
      </main>
      <div id='floor' />
    </>
  );
}