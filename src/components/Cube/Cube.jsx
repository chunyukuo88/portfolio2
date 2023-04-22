import './Cube.css';

export function Cube() {
    const multiple = 3;
    const styles = {
        cube: {
            position: "relative",
            width: `${multiple * 100}px`,
            height: `${multiple * 100}px`,
            transformStyle: "preserve-3d",
            transform: "rotateX(-30deg)",
            animation: "animate 4s linear infinite",
        },
        "cubeDivSpan": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(#151515,#00ec00)",
        },
        "cubeDivSpanNthChild1": {
            transform: `rotateY(calc(${1 * 90}deg)) translateZ(${multiple * 50}px)`,
        },
        "cubeDivSpanNthChild2": {
            transform: `rotateY(calc(${2 * 90}deg)) translateZ(${multiple * 50}px)`,
        },
        "cubeDivSpanNthChild3": {
            transform: `rotateY(calc(${3 * 90}deg)) translateZ(${multiple * 50}px)`,
        },
        "cubeDivSpanNthChild4": {
            transform: `rotateY(calc(${4 * 90}deg)) translateZ(${multiple * 50}px)`,
        },
        "cubeLid": {
            position: "absolute",
            top: 0,
            left: 0,
            width: `${multiple * 100}px`,
            height: `${multiple * 100}px`,
            background: "#222",
            transform: `rotateX(90deg) translateZ(${multiple * 50}px)`,
        },
    };

    return (
        <div className='cube' style={styles.cube} role='presentation' aria-hidden='true'>
          <div className='cube-lid' style={styles.cubeLid} />
          <div>
            <span style={{...styles.cubeDivSpan, ...styles.cubeDivSpanNthChild1}} />
            <span style={{...styles.cubeDivSpan, ...styles.cubeDivSpanNthChild2}} />
            <span style={{...styles.cubeDivSpan, ...styles.cubeDivSpanNthChild3}} />
            <span style={{...styles.cubeDivSpan, ...styles.cubeDivSpanNthChild4}} />
          </div>
        </div>
    );
}
