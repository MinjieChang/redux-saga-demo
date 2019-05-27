export default {
  namespace: 'counter',


  state: {
    count: 0
  },


  reducers: {
    increase({ count }) {
      return { count: count + 1 };
    },

    decrease({ count }) {
      return { count: count - 1 };
    }
  },


  effects: {
    *random({ count }, { put }) {
      yield sleep(1000);
      if (Math.random() > 0.5) {
        yield put({ type: 'increase' });
      } else {
        yield put({ type: 'decrease' });
      }
    }
  }
};


function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

