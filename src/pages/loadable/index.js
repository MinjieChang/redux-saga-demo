import React, { Component } from 'react';
import loadable from 'react-loadable';
import Preload from './Preload';
import Map from './Map';
import './App.css';


const Loading = (props) => (
  <div className="loading">更在加载中...</div>
);

const MyWidget = loadable({
  loader: () => import('./SomeBigWidget'),
  loading: Loading
});


const LoadErrorWidget = loadable({
  loader: () => Promise.reject('load fail'),
  loading: ({error}) => {
    if (error) {
      return <div>加载失败</div>;
    }
    return <div>正在加载中...</div>;
  }
});


const LazyWidget = loadable({
  loader: () => delay(1000).then(() => import('./SomeBigWidget')),
  delay: 500,
  loading: props => {
    if (props.error) {
      return <div>加载失败</div>;
    }
    if (props.pastDelay) {
      return <div>正在加载中...</div>
    }
    if (props.timedOut) {
      return <div>超时啦...</div>
    }
    return null;
  },
  timeout: 5000
})


class App extends Component {
  render() {
    return (
      <div className="App">
        <MyWidget />
        {<div>
          <LoadErrorWidget />
        </div>}
        {<LazyWidget />}
        {<Preload />}
        {<Map />}
      </div>
    );
  }
}


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default App;

