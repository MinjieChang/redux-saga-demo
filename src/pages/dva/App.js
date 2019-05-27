import React from 'react';
import { connect } from 'react-redux';
import './App.css';


const App = ({
  dispatch, count
}) => (
  <div className="counter">
    <div className="actions">
      <button onClick={() => dispatch({ type: 'counter/increase' })}>+</button>
      <button onClick={() => dispatch({ type: 'counter/decrease' })}>-</button>
      <button onClick={() => dispatch({ type: 'counter/random' })}>?</button>
    </div>
    <div className="display">{count}</div>
  </div>
);


export default connect(v => v.counter)(App);
