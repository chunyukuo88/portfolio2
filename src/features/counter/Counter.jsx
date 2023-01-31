import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, incrementByAmount } from './counterSlice.js';
import strings from '../../common/strings.js';

export function Counter() {
  const count = useSelector((state) => state.counter.value);
  const [ incrementVal, setIncrementVal ] = useState(0);
  const language = useSelector((state) => state.language.value);
  const dispatch = useDispatch();
  return (
    <main>
      <button
        aria-label='Decrement value'
        onClick={() => dispatch(decrement())}
      >
        {strings.decrement[language]}
      </button>
      <button
        aria-label='Increment value'
        onClick={() => dispatch(increment())}
      >
        {strings.increment[language]}
      </button>
      <span>{count}</span>
      <button
        aria-label='Increment value by amount'
        onClick={() => dispatch(incrementByAmount(incrementVal))}
      >
        {strings.incrementByAmount[language]}
      </button>
      <input
        type="number"
        value={incrementVal}
        onChange={(event) => {
          const { value } = event.target;
          setIncrementVal(parseInt(value));
        }}/>
    </main>
  );
}
