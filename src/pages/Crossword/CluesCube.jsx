import { memo, useState } from 'react';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';

export const CluesCube = memo(function ({ language, crosswordData }) {
  const [frontFaceClicked, setFrontFaceClicked] = useState(false);
  const clueDilimiter = '&&';

  const convertTimestamp = (date) => new Date(date).toLocaleDateString();

  const CluesAcross = ({crosswordData}) => {
    const cluesAcross = crosswordData.cluesAcross.split(clueDilimiter);
    return (
      <div className='clues-box'>
        <h3 className={frontFaceClicked ? 'clues-direction-clicked' : 'clues-direction'}>Across:</h3>
        {cluesAcross.map((clue, key) => <div className='clue' key={key}>{clue}</div>)}
      </div>
    );
  };

  const CluesDown = ({crosswordData}) => {
    const cluesDown = crosswordData.cluesDown.split(clueDilimiter);
    return (
      <div className='clues-box'>
        <h3 className={frontFaceClicked ? 'clues-direction-clicked' : 'clues-direction'}>Down:</h3>
        {cluesDown.map((clue, key) => <div className='clue' key={key}>{clue}</div>)}
      </div>
    );
  };

  const Title = () => {
    return crosswordData
      ? <section id='crossword-info'>
          <h2>{`'${crosswordData.title}'`}</h2>
          <h3>By {crosswordData.author}</h3>
          <h3>{convertTimestamp(crosswordData.created_at)}</h3>
        </section>
      : <LoadingSpinner language={language} />;
  };

  return (
    <>
      <main id='back-wall'>
        <section id='content-cube'>
          <div
            data-testid='top-face'
            className={frontFaceClicked ? 'top-face-clicked' : 'top-face-not-clicked'}
          >
            {crosswordData
              ? <CluesDown crosswordData={crosswordData}/>
              : <LoadingSpinner language={language} />
            }
          </div>
          <div
            data-testid='west-face'
            className={frontFaceClicked ? 'west-face-clicked' : 'west-face-not-clicked'}
          >
            {crosswordData
              ? <CluesAcross crosswordData={crosswordData}/>
              : <LoadingSpinner language={language} />
            }
          </div>
          <div
            role='button'
            onClick={() => setFrontFaceClicked(!frontFaceClicked)}
            id='cube-face-front'
          >
            <Title/>
          </div>
        </section>
        <div id='side-wall'/>
      </main>
      <div id='floor'/>
    </>
  );
});