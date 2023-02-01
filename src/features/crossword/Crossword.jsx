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
  const [ grid, setGrid ] = React.useState(emptyGrid);
  return (
      <main style={styles.main}>
        <section style={styles.section}>
          <h1 style={styles.title}>Crossword</h1>
          {
            grid.map((row, outerIndex) => (
              <div style={styles.row} key={outerIndex}>
                {
                  row.map((square, innerIndex) => (
                    <div
                      key={innerIndex}
                      data-testid='crossword-square'
                      style={styles.square}
                    >
                      {square}
                    </div>
                    )
                  )
                }
              </div>
            ))
          }
        </section>
      </main>
  );
}