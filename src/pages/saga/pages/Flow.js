import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { delay } from 'redux-saga'
import '../App.css';


function fetchApi(props) {
  const { dispatch, login } = props
  const [showLoading, setShowLoading] = useState(false)
  const onLogin = () => {
    dispatch({type: 'LOGIN'})
    // dispatch({type: 'LOGIN_REQUEST'})
  }
  const onLogout = () => {
    dispatch({type: 'LOGOUT'})
  }
  return  (
    <div className="counter">
      <div className="actions">
        <button onClick={onLogin}>登录</button>
        <button onClick={onLogout}>退出</button>
        {
          login && <div style={{fontSize: '30px'}}>登录成功</div>
        }
      </div>
    </div>
  );
}

export default connect(state=>({login: state.login.data}))(fetchApi);
