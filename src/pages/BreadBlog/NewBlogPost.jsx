import { useRef, useState } from 'react';
import { createHttpRequest, postData } from 'src/common/utils';
import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from 'src/globalState';
import { environments } from 'src/common/strings';
import './NewBlogPost.css';

export function NewBlogPost() {
  const token = useSelector(selectCurrentToken);
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const imageUrlRef = useRef(null);
  const [plusBtnVisible, setPlusBtnVisible] = useState(true);

  const clearAllInputs = () => {
    titleRef.current.value = '';
    bodyRef.current.value = '';
    imageUrlRef.current.value = '';
  };

  const url = (process.env.NODE_ENV === environments.PROD)
    ? process.env.REACT_APP_CREATE_BLOG_PROD
    : process.env.REACT_APP_CREATE_BLOG;
  
  const mutation = useMutation({
    mutationFn: async (blogData) => {
      return await postData(url, blogData);
    }
  });

  const createDataObject = () => {
    return {
      title: titleRef.current.value,
      body: bodyRef.current.value,
      imageUrl: imageUrlRef.current.value,
    };
  };

  const missingInfo = () => (!titleRef?.current?.value || !bodyRef?.current?.value);

  const submissionHandler = async (event) => {
    event.preventDefault();
    if (missingInfo()) return alert('No dice. Both title and body must be filled out.');
    const mappedData = createHttpRequest('POST', token, createDataObject());
    await mutation.mutateAsync(mappedData);
  };

  if (mutation.isSuccess) {
    clearAllInputs();
  }

  const errorMsgClickHandler = () => mutation.reset();

  const showInputs = () => setPlusBtnVisible(false);

  const Inputs = () => (
    <section className='content-card'>
      {mutation.isError
        ? <h1 data-testid='failed-to-publish-blog' onClick={errorMsgClickHandler}>
            Failed to publish blog post: {mutation.error}
          </h1>
        : null
      }
      {mutation.isSuccess
        ? <h1>The blog post has been published successfully.</h1>
        : null
      }
      <h1 className='publish-panel-title'>Write a Blog Post</h1>
      <details>
        <summary>Note</summary>
        The date of publication is added on the back end and cannot be changed from the UI.
      </details>
      <form
        className='content-form'
        onSubmit={submissionHandler}
      >
        <label className='publish-panel-label'>
          <span className='label-text'>Title: </span>
          <input
            type='text'
            className='publish-panel-input'
            ref={titleRef}
            placeholder='Make it pithy.'
          />
        </label>
        <label className='publish-panel-label'>
          <span className='label-text'>Body: </span>
          <textarea
            type='text'
            id='blog-body-input'
            className='publish-panel-input'
            ref={bodyRef}
            placeholder='Max 512 MB'
          />
        </label>
        <label className='publish-panel-label'>
          <span className='label-text'>Image URL: </span>
          <input
            type='text'
            className='publish-panel-input'
            ref={imageUrlRef}
            placeholder='Not required'
          />
        </label>
        <div className='button-wrapper'>
          <button id='publish-panel-button'>Publish</button>
        </div>
      </form>
    </section>
  );

  const PlusButton = () => <h2 role='button' onClick={showInputs}>+</h2>;

  return <>{plusBtnVisible ? <PlusButton/> : <Inputs/>}</>;
}
