import {useRef, useState} from 'react';
import {createHttpRequest, updateBlogPost} from "../../common/utils";
import {useMutation} from "@tanstack/react-query";

export function Pencil(props){
  const { article, token, aspect } = props;
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const inputRef = useRef(null);

  const mutation = useMutation((requestData) => updateBlogPost(article.entityId, requestData));

  // TODO: Validation

  const updateHandler = async () => {
    console.log('updateHandler()');
    const data = {
      [aspect]: inputRef.current.value,
    };
    const requestData = createHttpRequest('PUT', token, data);
    mutation.mutate(requestData);
  };

  const cancellationHandler = () => {
    setModalIsVisible(false);
  };

  const confirmationHandler = async () => {
    await updateHandler();
    setModalIsVisible(false);
  };

  const Modal = () => (
    <div className='update-modal'>
      <h1>Update the content of this aspect:</h1>
      <input ref={inputRef} type="text"/>
      <div className='update-buttons-container'>
        <button onClick={confirmationHandler}>Yeah</button>
        <button onClick={cancellationHandler}>Nah</button>
      </div>
    </div>
  );

  const UpdateSuccessMsg = () => (
    <>
      <div>The <span>{aspect}</span> has been updated with the following content:</div>
      <div>{`"${inputRef.current.value}"`}</div>
    </>
  );
  
  return (
    <>
      {modalIsVisible && <Modal />}
      {mutation.isSuccess && <UpdateSuccessMsg />}
      {!modalIsVisible && <div className='pencil' onClick={() => setModalIsVisible(true)}>✏️</div>}
    </>
  );
}
