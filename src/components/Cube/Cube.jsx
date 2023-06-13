import './Cube.css';

export function Cube() {
  return (
    <div className='cube' role='presentation' aria-hidden='true'>
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
