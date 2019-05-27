import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { delay } from 'redux-saga'
import '../App.css';


function fetchApi(props) {
  const { dispatch, result } = props
  const [showLoading, setShowLoading] = useState(false)
  const onFetchClick = () => {
    setShowLoading(true)
    // debugger
    dispatch({ type: 'FETCH_API' })
    delay(1500).then(()=>setShowLoading(false))
  }
  return  (
    <div className="counter">
      <div className="actions">
        <button onClick={onFetchClick}>fetchApi</button>
        {
            !!showLoading && <div>加载数据中....</div>
        }
        {
            !showLoading && !!result && !!result.length && <div>获得{result.length}条数据</div>
        }
      </div>
    </div>
  );
}


export default connect(state=>({result: state.result.result}))(fetchApi);
