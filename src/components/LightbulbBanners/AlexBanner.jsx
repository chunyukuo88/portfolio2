import './AlexBanner.css';

export default function AlexBanner(){
  const outerGrid = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ];

  return (
    <section id='alex-banner-grid'>
      {
        outerGrid.map((row, outerIndex) => {
          const rowNum = `ar${outerIndex}`;
          return (
            <div key={rowNum}>
              {
                row.map((cell, innerIndex) => {
                  const coords = `ac${outerIndex}_${innerIndex}`;
                  return (
                    <div
                      id={coords}
                      key={coords}
                      className='alex-banner-cell'
                    />
                  )
                })
              }
            </div>
          )
        })
      }
    </section>
  );
}
