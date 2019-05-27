import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import loadable from 'react-loadable';


const Loadable = lazy(() => import('./pages/loadable'));
const Saga = lazy(() => import('./pages/saga'));
const Dva = lazy(() => import('./pages/dva'));


const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/loadable" component={Loadable} />
      <Route path="/saga" component={Saga} />
      <Route path="/dva" component={Dva} />
    </div>
  </Router>
);



const Home = () => (
  <ul>
    {/* <li><a href="/loadable">loadable</a></li> */}
    <li><a href="/saga">saga</a></li>
    <li><a href="/dva">dva</a></li>
  </ul>
);


export default App;


function lazy(loader) {
  const Loading = ({ error }) => {
    if (error) {
      console.error(error);
      return null;
    }
    return (
      <div className="loading">正在加载中...</div>
    );
  };
  return loadable({ loader, loading: Loading });
}
