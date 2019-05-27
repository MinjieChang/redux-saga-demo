import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import saga from './saga';
import App from './App';


const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, sagaMiddleware)
)

sagaMiddleware.run(saga);



export default (props) => (
  <Provider store={store}>
    <App {...props} />
  </Provider>
);
