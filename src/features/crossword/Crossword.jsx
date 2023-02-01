import React from 'react';
import './Crossword.css';

export default function Crossword(){
  const emptyGrid = [
    ['o','o','o','o','o'],
    ['o','o','o','o','o'],
    ['o','o','o','o','o'],
    ['o','o','o','o','o'],
    ['o','o','o','o','o'],
  ];
  const [ grid, setGrid ] = React.useState(emptyGrid);
  return (
      <main>
        <section>
          <h1>Crossword</h1>
          {
            grid.map((row, outerIndex) => (
              <div className='crossword-row' key={outerIndex}>
                {
                  row.map((square, innerIndex) => (
                    <div key={innerIndex} className='crossword-square'>
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