import LanguageIcon from 'src/common/icons/language.svg';

const inlineStyle = {
  cursor: 'pointer',
  height: '1rem',
  margin: 0
};

function Language() {
  return (
    <img
      role='button'
      id='language-button'
      alt={'globe, representing language button'}
      style={inlineStyle}
      src={LanguageIcon}
    />
  );
}

export default Language;
