import React, { useState } from 'react';
import { createHttpRequest, postData } from '../../common/utils';


export function NewBlogPost({ token }) {
  const [ title, setTitle ] = useState('');
  const [ body, setBody ] = useState('');
  const [ imageUrl, setImageUrl ] = useState('');
  const [] = useState('');

  const submissionHandler = async (event) => {
    event.preventDefault();
    const data = {
      title,
      theme: body,
      imageUrl,
      likes: 0,
      views: 0,
    };
    const mappedData = createHttpRequest('POST', token, data);
    try {
      await postData(process.env.REACT_APP_POST_BLOG_ENTRY, mappedData)
    } catch (e) {
      console.error('An error occurred whilst attempting to publish some rubbish content: ', e);
    }
  };

  const handleTitle = (event) => setTitle(event.target.value);
  const handleBody = (event) => setBody(event.target.value);
  const handleImg = (event) => setImageUrl(event.target.value);

  return (
    <section>
      <h1 className='publish-panel-title'>Write a Blog Post</h1>
      <form onSubmit={submissionHandler}>
        <label>
          <span className='label-text'>Title: </span>
          <input
            type="text"
            className='publish-panel-input'
            data-testid='blog-panel-title'
            onChange={handleTitle}
            placeholder='With other companies in mind'
          />
        </label>
        <label>
          <span className='label-text'>Body: </span>
          <input
            type="text"
            className='publish-panel-input'
            data-testid='blog-panel-body'
            onChange={handleBody}
            placeholder='Max 512 MB'
          />
        </label>
        <label>
          <span className='label-text'>Image URL: </span>
          <input
            type="text"
            className='publish-panel-input'
            data-testid='blog-panel-img'
            onChange={handleImg}
            placeholder='Not required'
          />
        </label>
        <div className='button-wrapper'>
          <button className='publish-panel-button'>Publish</button>
        </div>
      </form>
    </section>
  )
}