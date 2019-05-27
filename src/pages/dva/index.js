import React from 'react';
import { create } from 'dva-core';
import { Provider } from 'react-redux';
import counterModel from './counter';
import App from './App.js';


const app = create();

app.model(counterModel);
app.start();


export default () => (
  <Provider store={app._store}>
    <App />
  </Provider>
);
