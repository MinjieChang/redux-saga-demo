import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { delay } from 'redux-saga'
import { chooseColor } from '../saga'
import '../App.css';


function SyncAction(props) {
  const { dispatch, color } = props
  const onChangeColor = () => {
    dispatch(chooseColor(color ? '' : 'red'))
  }
  return  (
    <div className="counter">
      <div className="actions">
        <button style={{backgroundColor: color ? color : ''}} onClick={onChangeColor}>changeColor</button>
      </div>
    </div>
  );
}


export default connect(state=>({color: state.color.color}))(SyncAction);
