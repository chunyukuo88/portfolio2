import './Cube.css';
import { useEffect, useRef, useState } from 'react';
import { useMousePosition } from '../../common/hooks';

export function Cube() {
    const lidRef = useRef(null);
    const [multiple, setMultiple] = useState(1);
    const mousePosition = useMousePosition();

    const mouseMovementHandler = (event) => {
        // const lid = lidRef.current;
        // if (!lid) return;
        // const lidRectangle = lid.getBoundingClientRect();
        // const distanceToLid = Math.sqrt(
        //     (Math.pow(event.clientX - lidRectangle.left - lidRectangle.width) / 2, 2) +
        //     (Math.pow(event.clientY - lidRectangle.top - lidRectangle.height) / 2, 2)
        // );
        if (mousePosition.y < 100) return setMultiple(1);
        if (mousePosition.y < 200) return setMultiple(2);
        if (mousePosition.y < 300) return setMultiple(3);
        if (mousePosition.y < 400) return setMultiple(4);
        // if (distanceToLid < 50) {
        //     console.log('< 50: ', distanceToLid);
        //     return setMultiple(1);
        // }
        // if (distanceToLid === 100) {
        //     console.log('< 100');
        //     return setMultiple(2);
        // }
        // if (distanceToLid === 150) {
        //     console.log('< 150');
        //     return setMultiple(3);
        // }
    };

    const styles = {
        cube: {
            position: 'relative',
            width: `${multiple * 100}px`,
            height: `${multiple * 100}px`,
            transformStyle: 'preserve-3d',
            transform: 'rotateX(-30deg)',
            animation: 'animate 4s linear infinite',
        },
        'cubeDivSpan': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(#151515,#00ec00)',
        },
        'cubeDivSpanNthChild1': {
            transform: `rotateY(calc(${1 * 90}deg)) translateZ(${multiple * 50}px)`,
        },
        'cubeDivSpanNthChild2': {
            transform: `rotateY(calc(${2 * 90}deg)) translateZ(${multiple * 50}px)`,
        },
        'cubeDivSpanNthChild3': {
            transform: `rotateY(calc(${3 * 90}deg)) translateZ(${multiple * 50}px)`,
        },
        'cubeDivSpanNthChild4': {
            transform: `rotateY(calc(${4 * 90}deg)) translateZ(${multiple * 50}px)`,
        },
        'cubeLid': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${multiple * 100}px`,
            height: `${multiple * 100}px`,
            background: '#222',
            transform: `rotateX(90deg) translateZ(${multiple * 50}px)`,
        },
    };

    useEffect(() => {
        window.addEventListener('mousemove', mouseMovementHandler);
        return () => {
            window.removeEventListener('mousemove', mouseMovementHandler);
        }
    }, [mousePosition]);

    return (
        <>
            <h1>{JSON.stringify(mousePosition)}</h1>
            <div className='cube' style={styles.cube} role='presentation' aria-hidden='true'>
              <div ref={lidRef} className='cube-lid' style={styles.cubeLid} />
              <div>
                <span style={{...styles.cubeDivSpan, ...styles.cubeDivSpanNthChild1}} />
                <span style={{...styles.cubeDivSpan, ...styles.cubeDivSpanNthChild2}} />
                <span style={{...styles.cubeDivSpan, ...styles.cubeDivSpanNthChild3}} />
                <span style={{...styles.cubeDivSpan, ...styles.cubeDivSpanNthChild4}} />
              </div>
            </div>
        </>
    );
}
