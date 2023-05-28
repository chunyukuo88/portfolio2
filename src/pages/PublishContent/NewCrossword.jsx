import { useState } from 'react';
import { createHttpRequest, postData } from 'src/common/utils';

export function NewCrossword({ token }){
  const [solution, setSolution] = useState('');
  const [title, setTitle] = useState('');
  const [theme, setTheme] = useState('');
  const [clues, setClues] = useState({
    across: ['', '', '', '', ''],
    down: ['', '', '', '', ''],
  });

  const collateClues = (clues) => {
    const clueDelimiter = '&&';
    return clues
      .map((clue, index) => `${index + 1}. ${clue}`)
      .join(clueDelimiter);
  };

  const clearForm = () => {
    setClues({
      across: ['', '', '', '', ''],
      down: ['', '', '', '', ''],
    });
    setSolution('');
    setTitle('');
    setTheme('');
  };

  const mapData = () => {
    const formattedData = [
      {
        solution,
        author: 'Alex Gochenour',
        title,
        theme,
        cluesAcross: collateClues(clues.across),
        cluesDown: collateClues(clues.down),
      }
    ];
    return createHttpRequest('POST', token, formattedData);
  };

  const submissionHandler = async (event) => {
    event.preventDefault();
    const mappedData = mapData();
    await postData(process.env.REACT_APP_POST_CROSSWORD_INFO, mappedData);
    alert('Publication complete!');
    return clearForm();
  };

  const handleSolution = (event) => setSolution(event.target.value);
  const handleTitle = (event) => setTitle(event.target.value);
  const handleTheme = (event) => setTheme(event.target.value);

  const handleClueChange = (direction, index, value) => {
    setClues((prevClues) => {
      const updatedClues = { ...prevClues };
      updatedClues[direction][index] = value;
      return updatedClues;
    });
  };

  const clueNumbers = [1,2,3,4,5];

  const AcrossCluesInputs = () => (
    <>
      {clueNumbers.map((index) => (
        <label className='publish-panel-label' key={index}>
          <span className='label-text'>Across {index}: </span>
          <input
              className='publish-panel-input'
              data-testid={`crossword-panel-across-${index}`}
              type='text'
              onChange={(event) => handleClueChange('across', index - 1, event.target.value)}
              placeholder={`The clue for Across ${index}`}
              value={clues.across[index - 1]}
          />
        </label>
      ))}
    </>
  );

  const DownCluesInputs = () => (
    <>
      {clueNumbers.map((index) => (
        <label className='publish-panel-label' key={index}>
          <span className='label-text'>Down {index}: </span>
          <input
              className='publish-panel-input'
              data-testid={`crossword-panel-down-${index}`}
              type='text'
              onChange={(event) => handleClueChange('down', index - 1, event.target.value)}
              placeholder={`The clue for Down ${index}`}
              value={clues.down[index - 1]}
          />
        </label>
      ))}
    </>
  );

  return (
    <section className='content-card'>
      <h1 className='publish-panel-title'>Create a New Crossword</h1>
      <form
        className='content-form'
        onSubmit={submissionHandler}
      >
        <label className='publish-panel-label'>
          <span className='label-text'>Solution: </span>
          <input
            className='publish-panel-input'
            data-testid='crossword-panel-solution'
            type='text'
            onChange={handleSolution}
            placeholder='Flatten all rows into a string'
          />
        </label>
        <label className='publish-panel-label'>
          <span className='label-text'>Title: </span>
          <input
            className='publish-panel-input'
            data-testid='crossword-panel-title'
            type='text'
            onChange={handleTitle}
            placeholder='Three Arabic Words'
          />
        </label>
        <label className='publish-panel-label'>
          <span className='label-text'>Theme: </span>
          <input
            className='publish-panel-input'
            data-testid='crossword-panel-theme'
            type='text'
            onChange={handleTheme}
          />
        </label>
        <p className='label-text'>No need to include the numbers; numbers are added automatically.</p>
        <AcrossCluesInputs />
        <DownCluesInputs />
        <div className='button-wrapper'>
          <button className='publish-panel-button'>Publish</button>
        </div>
      </form>
    </section>
  );
}