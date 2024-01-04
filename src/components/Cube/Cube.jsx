import './Cube.css';

export function Cube() {
  const secondsForSingleRotation = 4;

  const style = {
    animation: `animate ${secondsForSingleRotation}s linear infinite`,
  };

  return (
    <div
      data-testid='primary-cube'
      className='cube'
      style={style}
      role='presentation'
      aria-hidden='true'
    >
      <div className='cube-lid' />
      <div>
        <span/>
        <span/>
        <span/>
        <span/>
      </div>
    </div>
  );
}
