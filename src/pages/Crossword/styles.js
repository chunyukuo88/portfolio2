export const styles = {
  squareWrapper: {
    position: 'relative',
  },
  clue: {
    textAlign: 'left',
  },
  cluesBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '32rem',
  },
  clueNumber: {
    color: 'gray',
    fontSize: '0.75rem',
    left: '0.25rem',
    position: 'absolute',
    top: '0.25rem',
    zIndex: '3',
  },
  gridWrapper: {

  },
  gridAndSettings: {
    display: 'flex',
    flexDirection: 'row',
  },
  crosswordSettings: {
    backgroundColor: 'orange',
    width: '4rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  square: {
    backgroundColor: 'white',
    caretColor: 'transparent',
    fontSize: '2rem',
    height: '3rem',
    outline: 'solid black 1px',
    position: 'relative',
    textAlign: 'center',
    textTransform: 'capitalize',
    width: '3rem',
    zIndex: '2',
  },
  squareVictory: {
    backgroundColor: 'lightGreen',
    caretColor: 'transparent',
    fontSize: '3rem',
    height: '3rem',
    outline: 'solid black 1px',
    position: 'relative',
    textAlign: 'center',
    textTransform: 'capitalize',
    transform: 'rotate(360deg)',
    transition: '1s',
    userSelect: 'none',
    width: '3rem',
    zIndex: '2',
  },
  currentSquare: {
    backgroundColor: 'cyan',
    caretColor: 'transparent',
    fontSize: '2rem',
    height: '3rem',
    outline: 'solid black 1px',
    position: 'relative',
    textAlign: 'center',
    textTransform: 'capitalize',
    width: '3rem',
    zIndex: '2',
  },
  main: {
      height: '80vh',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
  },
  title: {
      color: 'white',
  },
  section: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
  },
};
