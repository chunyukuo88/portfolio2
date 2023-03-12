import { memo, useState } from 'react';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';

export const CluesCube = memo(function ({ language, todaysPuzzle }) {
  const [frontFaceClicked, setFrontFaceClicked] = useState(false);
  const clueDelimiter = '&&';

  const convertTimestamp = (date) => new Date(date).toLocaleDateString();

  const CluesAcross = ({todaysPuzzle}) => {
    const cluesAcross = todaysPuzzle.cluesAcross.split(clueDelimiter);
    return (
      <div className='clues-box'>
        <h3 className={frontFaceClicked ? 'clues-direction-clicked' : 'clues-direction'}>Across:</h3>
        {cluesAcross.map((clue, key) => <div className='clue' key={key}>{clue}</div>)}
      </div>
    );
  };

  const CluesDown = ({todaysPuzzle}) => {
    const cluesDown = todaysPuzzle.cluesDown.split(clueDelimiter);
    return (
      <div className='clues-box'>
        <h3 className={frontFaceClicked ? 'clues-direction-clicked' : 'clues-direction'}>Down:</h3>
        {cluesDown.map((clue, key) => <div className='clue' key={key}>{clue}</div>)}
      </div>
    );
  };

  const Title = () => {
    return todaysPuzzle
      ? <section id='crossword-info'>
          <h2>{`'${todaysPuzzle.title}'`}</h2>
          <h3>By {todaysPuzzle.author}</h3>
          <h3>{convertTimestamp(todaysPuzzle.created_at)}</h3>
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
            {todaysPuzzle
              ? <CluesDown todaysPuzzle={todaysPuzzle}/>
              : <LoadingSpinner language={language} />
            }
          </div>
          <div
            data-testid='west-face'
            className={frontFaceClicked ? 'west-face-clicked' : 'west-face-not-clicked'}
          >
            {todaysPuzzle
              ? <CluesAcross todaysPuzzle={todaysPuzzle}/>
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