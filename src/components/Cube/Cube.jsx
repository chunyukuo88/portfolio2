import './Cube.css';
import { useEffect, useRef, useState } from 'react';
import { useMousePosition } from 'src/common/hooks';

export function Cube() {
    const lidRef = useRef(null);
    const [multiple, setMultiple] = useState(1);
    const mousePosition = useMousePosition();
    const transitionInterval = '3s';

    const mouseMovementHandler = () => {
        if (mousePosition.y < 50) return setMultiple(0.5);
        if (mousePosition.y < 100) return setMultiple(1);
        if (mousePosition.y < 150) return setMultiple(1.5);
        if (mousePosition.y < 200) return setMultiple(2);
        if (mousePosition.y < 250) return setMultiple(2.5);
        if (mousePosition.y < 300) return setMultiple(3);
        if (mousePosition.y < 350) return setMultiple(3.5);
        if (mousePosition.y < 400) return setMultiple(4);
        setMultiple(4.5);
    };

    const styles = {
        cube: {
            position: 'relative',
            width: `${multiple * 100}px`,
            height: `${multiple * 100}px`,
            transformStyle: 'preserve-3d',
            transform: 'rotateX(-30deg)',
            animation: 'animate 4s linear infinite',
            transition: transitionInterval,
        },
        'cubeDivSpan': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(#151515,rgb(0, ${multiple * 26}, 0))`,
        },
        'cubeDivSpanNthChild1': {
            transform: `rotateY(calc(${1 * 90}deg)) translateZ(${multiple * 50}px)`,
            transition: transitionInterval,
        },
        'cubeDivSpanNthChild2': {
            transform: `rotateY(calc(${2 * 90}deg)) translateZ(${multiple * 50}px)`,
            transition: transitionInterval,
        },
        'cubeDivSpanNthChild3': {
            transform: `rotateY(calc(${3 * 90}deg)) translateZ(${multiple * 50}px)`,
            transition: transitionInterval,
        },
        'cubeDivSpanNthChild4': {
            transform: `rotateY(calc(${4 * 90}deg)) translateZ(${multiple * 50}px)`,
            transition: transitionInterval,
        },
        'cubeLid': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${multiple * 100}px`,
            height: `${multiple * 100}px`,
            background: '#222',
            transform: `rotateX(90deg) translateZ(${multiple * 50}px)`,
            transition: transitionInterval,
        },
    };

    useEffect(() => {
        window.addEventListener('mousemove', mouseMovementHandler);
        return () => {
            window.removeEventListener('mousemove', mouseMovementHandler);
        }
    }, [mousePosition]);

    return (
        <div className='cube' style={styles.cube} role='presentation' aria-hidden='true'>
            <div ref={lidRef} className='cube-lid' style={styles.cubeLid} />
            <div>
                <span style={{...styles.cubeDivSpan, ...styles.cubeDivSpanNthChild1}} />
                <span style={{...styles.cubeDivSpan, ...styles.cubeDivSpanNthChild2}} />
                <span style={{...styles.cubeDivSpan, ...styles.cubeDivSpanNthChild3}} />
                <span style={{...styles.cubeDivSpan, ...styles.cubeDivSpanNthChild4}} />
            </div>
        </div>
    );
}
