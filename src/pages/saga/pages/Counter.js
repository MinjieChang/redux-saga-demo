import React from 'react';
import { connect } from 'react-redux';
import '../App.css';


const Counter = (props) => {
  const { dispatch, count } = props
  return  (
    <div className="counter">
      <div className="actions">
        <button onClick={() => dispatch({ type: 'INCREASE' })}>+</button>
        <button onClick={() => dispatch({ type: 'DECREASE' })}>-</button>
        <button onClick={() => dispatch({ type: 'INCREASE_ASYNC' })}>?</button>
      </div>
      <div className="display">{count}</div>
      
    </div>
  );
}


export default connect(state => ({count: state.count.count}))(Counter);
