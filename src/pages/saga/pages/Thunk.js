import React from 'react';
import { connect } from 'react-redux';
import { thunk as increase } from '../saga.js'
import '../App.css';


const Counter = (props) => {
  const { increase, count } = props
  return  (
    <div className="counter">
      <div className="actions">
        <button onClick={() => increase({ type: 'THUNK_INCREASE' })}>+</button>
      </div>
      <div className="display">{count}</div>
    </div>
  );
}

export default connect(state => ({count: state.count.count}), {increase})(Counter);
