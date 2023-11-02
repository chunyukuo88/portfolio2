import { selectCubeSpinSpeed } from '../../globalState/cubeSpin/cubeSpinSlice';
import { useSelector } from 'react-redux';
import './Cube.css';

export function Cube() {
  const shouldSpinSlowly = useSelector(selectCubeSpinSpeed);

  const rotationSpeed = shouldSpinSlowly ? 4 : 1;

  const style = {
    animation: `animate ${rotationSpeed}s linear infinite`,
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
