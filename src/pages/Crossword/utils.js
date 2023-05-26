export const isOutsideGrid = ([i, j], grid) => (
  i > grid.length - 1
  || i < 0
  || j > grid.length - 1
  || j < 0
);

export const nonAlphabetics = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Alt', 'Del', 'Backspace'];

export const getNewCoordinates = (direction, outerIndex, innerIndex) => {
  switch (direction) {
    case nonAlphabetics[0]: return [outerIndex - 1, innerIndex];
    case nonAlphabetics[1]: return [outerIndex + 1, innerIndex];
    case nonAlphabetics[2]: return [outerIndex, innerIndex - 1];
    case nonAlphabetics[3]: return [outerIndex, innerIndex + 1];
  }
};

export const getStyleRuleName = (outerIndex, innerIndex, userHasWon, focused) => {
  if (userHasWon) return 'squareVictory';
  if (!focused) return 'square';
  const isFocused = (focused[0] === outerIndex && focused[1] === innerIndex);
  return (isFocused) ? 'currentSquare' : 'square';
};
