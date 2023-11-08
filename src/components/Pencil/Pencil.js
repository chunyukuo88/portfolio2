import { useRef, useState } from 'react';
import { LoadingSpinner } from 'src/components/LoadingSpinner/LoadingSpinner';
import { createHttpRequest, updateBlogPost } from 'src/common/utils';
import { useMutation } from '@tanstack/react-query';
import { primaryColor } from 'src/common/strings';
import './Pencil.css';

export function Pencil(props) {
  const { article, token, aspect } = props;
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const inputRef = useRef(null);

  const mutation = useMutation((requestData) => updateBlogPost(article.page, requestData));

  // TODO: Validation

  const updateHandler = async () => {
    article[aspect] = inputRef.current.value;
    const requestData = createHttpRequest('PUT', token, article);
    mutation.mutate(requestData);
  };

  const cancellationHandler = () => {
    setModalIsVisible(false);
  };

  const confirmationHandler = async () => {
    await updateHandler();
    setModalIsVisible(false);
  };

  const style = { fontSize: '1rem', width: '85%', height: '85%' };

  const Modal = () => (
    <div className='update-modal'>
      <p>Update the {aspect}</p>
      <textarea style={style} ref={inputRef} type='text' defaultValue={article[aspect]}/>
      <div>
        <span onClick={confirmationHandler} role='button'>Confirm</span>
        <span onClick={cancellationHandler} role='button'>Nvrmnd</span>
      </div>
    </div>
  );

  const PencilSvg = () => (
    <svg className='pencil-svg' xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 230 230" version="1.1">
      <path d="M 57.070 34.025 C 50.048 36.550, 45.061 40.059, 38.881 46.821 C 33.165 53.075, 29.338 60.036, 28.404 65.878 C 27.592 70.951, 30.266 76.550, 36.607 83.059 C 39.050 85.566, 40.749 87.918, 40.382 88.285 C 39.395 89.271, 41.984 92, 43.907 92 C 45.888 92, 56.684 102.649, 55.700 103.633 C 54.808 104.525, 56.879 107, 58.518 107 C 59.218 107, 75.768 122.943, 95.295 142.429 C 115.565 162.655, 132.452 178.695, 134.650 179.809 C 136.767 180.883, 141.200 182.590, 144.500 183.603 C 147.800 184.617, 150.725 185.736, 151 186.091 C 151.639 186.916, 187.838 198.780, 190.500 199.037 C 194.432 199.417, 195 198.998, 195 195.719 C 195 192.888, 184.748 160.177, 182.082 154.500 C 181.565 153.400, 180.375 150.025, 179.436 147 C 178.497 143.975, 177.060 140.178, 176.242 138.562 C 175.424 136.947, 158.610 119.470, 138.877 99.725 C 119.145 79.981, 103 63.245, 103 62.535 C 103 60.883, 100.530 58.803, 99.633 59.700 C 98.649 60.684, 88 49.888, 88 47.907 C 88 46.040, 85.283 43.383, 84.339 44.327 C 84.002 44.664, 81.426 42.862, 78.613 40.322 C 73.586 35.783, 66.951 32.030, 64 32.058 C 63.175 32.066, 60.056 32.951, 57.070 34.025 M 117.491 108.817 C 129.587 121.018, 139.678 131, 139.916 131 C 140.927 131, 100.899 90.475, 97.500 88.057 C 96.400 87.274, 105.396 96.617, 117.491 108.817 M 148.500 140 C 150.648 142.200, 152.631 144, 152.906 144 C 153.181 144, 151.648 142.200, 149.500 140 C 147.352 137.800, 145.369 136, 145.094 136 C 144.819 136, 146.352 137.800, 148.500 140 M 166.648 156.760 C 166.288 157.343, 162.804 158.390, 158.905 159.086 C 151.297 160.446, 150 161.720, 150 167.832 C 150 170.322, 150.295 170.520, 153.750 170.346 C 155.813 170.242, 159.300 170.950, 161.500 171.920 C 166.323 174.045, 178.059 183.203, 179.618 186.058 C 180.692 188.024, 180.820 187.974, 182.833 184.803 C 183.986 182.986, 184.486 181.347, 183.943 181.160 C 183.401 180.972, 182.227 179.397, 181.333 177.660 C 180.440 175.922, 177.814 172.025, 175.498 169 C 173.183 165.975, 170.392 161.745, 169.296 159.600 C 168.200 157.456, 167.008 156.177, 166.648 156.760"
            stroke="none"
            fill={primaryColor}
            fill-rule="evenodd"/>
    </svg>
  );

  const pencilClickHandler = () => setModalIsVisible(true);

  return (
    <>
      {modalIsVisible ? <Modal /> : null}
      {mutation.isLoading ? <LoadingSpinner /> : null}
      {!modalIsVisible
        ? <div onClick={pencilClickHandler}><PencilSvg /></div>
        : null}
    </>
  );
}
