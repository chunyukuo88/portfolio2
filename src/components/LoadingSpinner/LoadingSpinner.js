import strings from '../../common/strings';
import './LoadingSpinner.css';

export function LoadingSpinner({ language }){
  return (
    <div id='loading-spinner'>{strings.loading[language]}</div>
  );
}
