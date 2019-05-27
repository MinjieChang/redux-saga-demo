import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import Counter from './pages/Counter'
import FetchApi from './pages/FetchApi'
import SyncAction from './pages/SyncAction'
import Flow from './pages/Flow'
import './App.css';


const App = (props) => {
  const { match } = props
  const {path} = match
  return  (
    <div className="counter">
      <div><Link to={`${match.path}/count`}>计数器_saga</Link></div>
      <div><Link to={`${match.path}/thunk`}>计数器_thunk</Link></div>
      <div><Link to={`${match.path}/fetchApi`}>捕获api调用</Link></div>
      <div><Link to={`${match.path}/syncAction`}>捕获同步action</Link></div>
      <br></br>
      <div style={{height: '20px'}}><Link to={`${match.path}/flow`}>流程控制</Link></div>

      <Switch>
        <Route exact path={`${path}/count`} component={Counter} />
        <Route exact path={`${path}/thunk`} component={()=><div>thunk</div>} />
        <Route exact path={`${path}/fetchApi`} component={FetchApi} />
        <Route exact path={`${path}/syncAction`} component={SyncAction} />
        <Route exact path={`${path}/flow`} component={Flow} />
        <Redirect to={`${path}/count`}></Redirect>
      </Switch>
    </div>
  );
}


export default connect(v => v)(App);
