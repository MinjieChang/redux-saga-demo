import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux'


const count = handleActions({

  INCREASE: ({ count }) => {
    return { count: count + 1 };
  },


  DECREASE: ({ count }) => {
    return { count: count - 1 };
  }

}, { count: 0 });

const result = handleActions({

  SET_API_RESULT: ({ result }, payload) => {
    return { result: payload.result.data.staffs };
  },

}, { result: [] });

const color = handleActions({

  CHANGE_UI: ({ color }, payload) => {
    return { color: payload.payload.color };
  },

}, { color: '' });

const login = handleActions({

  LOGIN_SUCCESS: ({}, {payload}) => {
    return { data: payload.data };
  },
  LOGOUT: ({}, {payload}) => {
    return { data: '' };
  },

}, {data: ''});

export default combineReducers({count, result, color, login})
