import { useState } from 'react';
import { useMutation} from '@tanstack/react-query';

import { createHttpRequest, deleteBlog } from 'src/common/utils';
import { LoadingSpinner } from 'src/components/LoadingSpinner/LoadingSpinner';

export function TrashCan(props){
  const { article, token } = props;
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const mutation = useMutation((requestData) => deleteBlog(article.entityId, requestData));

  const deletionHandler = async (event) => {
    event.preventDefault();
    const requestData = createHttpRequest('DELETE', token, null);
   mutation.mutate(requestData);
  };

  const cancellationHandler = (event) => {
    event.preventDefault();
    setModalIsVisible(false);
  };

  const confirmationHandler = async (event) => {
    await deletionHandler(event);
    setModalIsVisible(false);
  };

  const Modal = () => (
    <div className='deletion-modal'>
      <p>Are you sure you want to delete this article?</p>
      <button onClick={confirmationHandler}>Yeah</button>
      <button onClick={cancellationHandler}>Nah</button>
    </div>
  );

  const style = {
    textAlign: 'center',
  };
  return (
    <div style={style}>
      {modalIsVisible && <Modal />}
      {mutation.isError ? <div style={{ color: 'red', margin: '0.5rem' }} >Failed to delete <span>{article.title}</span></div> : null}
      {mutation.isLoading ? <LoadingSpinner /> : null}
      {mutation.isSuccess ? <div><span>{article.title}</span> has been deleted.</div> : null}
      {modalIsVisible === false && <div className='trashcan' onClick={() => setModalIsVisible(true)}>🗑</div>}
    </div>
  );
}