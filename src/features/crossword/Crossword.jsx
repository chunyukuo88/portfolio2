import * as React from 'react';

export function Crossword(){
  const emptyGrid = [
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
  ];
  const [ grid, setGrid ] = React.useState(emptyGrid);
  return (
      <main>
        <h1>Crossword</h1>
        <section>
          {
            emptyGrid.map(row => {
              // row.map(square => {
                return <div className='square'>ha</div>
              // })
            })
          }
        </section>
      </main>
  );
}