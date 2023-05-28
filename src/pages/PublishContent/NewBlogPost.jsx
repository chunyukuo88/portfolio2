import { useRef } from 'react';
import {createHttpRequest, postData } from 'src/common/utils';
import { useMutation } from '@tanstack/react-query';

export function NewBlogPost({ token }) {
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const imageUrlRef = useRef(null);


  const clearAllInputs = () => {
    titleRef.current.value = '';
    bodyRef.current.value = '';
    imageUrlRef.current.value = '';
  };

  const mutation = useMutation({
    mutationFn: async (blogData) => {
      return await postData(process.env.REACT_APP_POST_BLOG_ENTRY, blogData);
    }
  });

  const createDataObject = () => ({
    title: titleRef.current.value,
    creationTimeStamp: Date.now(),
    theme: bodyRef.current.value,
    imageUrl: imageUrlRef.current.value,
    likes: 0,
    views: 0,
  });

  const missingInfo = () => (!titleRef.current.value || !bodyRef.current.value)

  const submissionHandler = async (event) => {
    event.preventDefault();
    if (missingInfo()) return alert('No dice. Both title and body must be filled out.');
    const mappedData = createHttpRequest('POST', token, createDataObject());
    await mutation.mutateAsync(mappedData);
  };

  if (mutation.isSuccess) {
    clearAllInputs();
  }

  return (
    <section className='content-card'>
      {mutation.isError ? <h1 data-testid='failed-to-publish-blog' onClick={() => mutation.reset()}>Failed to publish blog post: {mutation.error}</h1> : null}
      {mutation.isSuccess ? <h1>The blog post has been published successfully.</h1> : null}
      <h1 className='publish-panel-title'>Write a Blog Post</h1>
      <form
        className='content-form'
        onSubmit={submissionHandler}
      >
        <label className='publish-panel-label'>
          <span className='label-text'>Title: </span>
          <input
            type='text'
            className='publish-panel-input'
            data-testid='blog-panel-title'
            ref={titleRef}
            placeholder='With other companies in mind'
          />
        </label>
        <label className='publish-panel-label'>
          <span className='label-text'>Body: </span>
          <textarea
            type='text'
            id='blog-body-input'
            className='publish-panel-input'
            data-testid='blog-panel-body'
            ref={bodyRef}
            placeholder='Max 512 MB'
          />
        </label>
        <label className='publish-panel-label'>
          <span className='label-text'>Image URL: </span>
          <input
            type='text'
            className='publish-panel-input'
            data-testid='blog-panel-img'
            ref={imageUrlRef}
            placeholder='Not required'
          />
        </label>
        <div className='button-wrapper'>
          <button
              className='publish-panel-button'
              data-testid='blog-submission-btn'
          >
            Publish
          </button>
        </div>
      </form>
    </section>
  );
}