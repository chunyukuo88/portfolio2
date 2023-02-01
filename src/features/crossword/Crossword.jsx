import React from 'react';
import { styles } from './styles.js';

export default function Crossword(){
  const emptyGrid = [
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
  ];
  const [ currentSquare, setCurrentSquare ] = React.useState([undefined, undefined]);
  const [ grid, setGrid ] = React.useState(emptyGrid);

  const getStyleRuleName = (outerIndex, innerIndex) => {
    return (currentSquare[0] === outerIndex && currentSquare[1] === innerIndex)
      ? 'currentSquare'
      : 'square';
  }

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
                          onClick={() => setCurrentSquare([outerIndex, innerIndex])}
                        >
                          {square}
                        </div>
                      )
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