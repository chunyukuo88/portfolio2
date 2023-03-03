import React, { useState } from 'react';
import './PublishContent.css';
import { useSelector } from 'react-redux';
import { createHttpRequest, postData } from '../../common/utils';
import { LinkStyling } from '../../common/globalStyles';
import { Link } from 'react-router-dom';
import strings from '../../common/strings';

function PublishContent() {
  const token = useSelector ((state) => state.auth.token);
  const language = useSelector((state) => state.language.value);
  const [solution, setSolution] = useState('');
  const [title, setTitle] = useState('');
  const [theme, setTheme] = useState('');
  const [cluesAcross, setAcrossClues] = useState('');
  const [cluesDown, setDownClues] = useState('');

  const submissionHandler = async (event) => {
    event.preventDefault();
    const formattedData = [
      {
        solution,
        author: 'Alex Gochenour',
        title,
        theme,
        cluesAcross,
        cluesDown,
      }
    ];
    const mappedData = createHttpRequest('POST', token, formattedData);
    await postData(process.env.REACT_APP_POST_CROSSWORD_INFO, mappedData);
  };

  const handleSolution = (event) => setSolution(event.target.value);
  const handleTitle = (event) => setTitle(event.target.value);
  const handleTheme = (event) => setTheme(event.target.value);
  const handleAcrossClues = (event) => setAcrossClues(event.target.value);
  const handleDownClues = (event) => setDownClues(event.target.value);

  const testRedis = async () => {
    const data = {
      title: 'Another bomb!',
      theme: 'Who killed heavy!',
      imageUrl: 'Test image URL 2',
      likes: 0,
      views: 0,
    };
    const mappedData = createHttpRequest('POST', token, data);
    try {
      await postData('https://50wd0yhu15.execute-api.us-east-1.amazonaws.com/blog/write', mappedData)
    } catch (e) {
      console.error('errorz: ', e);
    }

  };

  return (
    <section className='publish-panel'>
      <Link style={LinkStyling} to='/'>{strings.homePage[language]}</Link>
      <h1 className='publish-panel-title'>Create a New Crossword</h1>
      <form onSubmit={submissionHandler}>
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
        <label className='publish-panel-label'>
          <span className='label-text'>Across: </span>
          <input
            className='publish-panel-input'
            data-testid='crossword-panel-across'
            type='text'
            onChange={handleAcrossClues}
            placeholder='A comma-delineated string'
          />
        </label>
        <label className='publish-panel-label'>
          <span className='label-text'>Down: </span>
          <input
            className='publish-panel-input'
            data-testid='crossword-panel-down'
            type='text'
            onChange={handleDownClues}
            placeholder='A comma-delineated string'
          />
        </label>
        <div className='button-wrapper'>
          <button className='publish-panel-button'>Publish</button>
        </div>
      </form>
      <button onClick={async () => await testRedis()}>
        Test Redis
      </button>
    </section>
  );
}

export default PublishContent;
