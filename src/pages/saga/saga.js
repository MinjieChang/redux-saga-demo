// import { put, takeEvery, all, call } from 'redux-saga/effects';



// export default function* incrementAsync () {
//   yield takeEvery('RANDOM', change);
// }


// export function* change() {
//   yield delay(1000);
//   yield put({ type: 'INCREASE' });
//   if (Math.random() > 0.5) {
//     console.log('random increase');
//   } else {
//     console.log('random decrease');
//     yield put({ type: 'DECREASE' });
//   }
// }



// function delay(time) {
//   return new Promise(resolve => setTimeout(resolve, time));
// }

import { delay } from 'redux-saga'
import { put, takeEvery, all, call, take, select, fork, cancel } from 'redux-saga/effects'

function* helloSaga() {
	console.log('hello sagas')
}

// ----------------------------  异步counter  -----------------------

//不论 put 还是 call 都不执行任何 dispatch 或异步调用，它们只是简单地返回 plain Javascript 对象。
export function* incrementAsync() {
	yield call(delay, 1000) //  => { CALL: {fn: delay, args: [1000]}}
	yield put({ type: 'INCREASE' }) // => { PUT: {type: 'INCREMENT'} }
}

export function* watchIncrementAsync() {
	yield takeEvery('INCREASE_ASYNC', incrementAsync)
}

// ----------------------------  异步调用api  -----------------------

export const fetchFn = (url) =>fetch(url).then(res=>res.json())
export const fetchAddress = 'http://localhost:8000/api/staff/getStaffs'

export function* fetchApi(){
  const result = yield call(fetchFn, fetchAddress)
  yield put({ type: 'SET_API_RESULT', result })
}

export function* watchFetchApi() {
	yield takeEvery('FETCH_API', fetchApi)
}

// ----------------------------  捕获同步 aciton  -----------------------

const CHOOSE_COLOR = 'CHOOSE_COLOR';
const CHANGE_UI = 'CHANGE_UI';

export const chooseColor = (color) => ({
	type: CHOOSE_COLOR,
	payload: { color },
});
const changeUI = (color) => ({
	type: CHANGE_UI,
	payload: { color },
});

function* changeColorSaga2() {
	while(true){
		const state = yield select((state)=>state.color)
		console.log('state', state)
		const action = yield take(CHOOSE_COLOR);
		yield put(changeUI(action.payload.color));
	}
}

function* changeColorSaga() {
	yield takeEvery(CHOOSE_COLOR, function* chooseColor(action){
		console.log(action, 9999999)
		yield put(changeUI(action.payload.color));
	})
}

// ----------------------------  take流控制  -----------------------
export const fetchLoginFn = (url) =>fetch(url, {
	method: 'post',
	body: JSON.stringify({
		email: "1121134@qq.com",
		password: "12345678a"
	}),
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
}).then(res=>res.json())
export const loginAddress = 'http://localhost:8000/api/account/login'
function* loginFlow() {
	while (true) {
	  yield take('LOGIN')
	  const {data, errorCode} = yield call(fetchLoginFn, loginAddress)
	  // 或者
	//   const {data, errorCode} = loginAddress(loginAddress)
	  if(data){
		console.log(data,'data')
		yield put({type: 'LOGIN_SUCCESS', payload: {data}})
		yield take('LOGOUT')
		console.log('LOGOUT++++')
	  }else{
		console.log(errorCode, "errorCode")
	  }
	}
}

// ----------------------------  fork 和 cancle  -----------------------
function* authorize() {
	  const {data, errorCode} = yield call(fetchLoginFn, loginAddress)
	  console.log(data, 'LOGIN_SUCCESS++++++')
	  if(data){
		  yield put({type: 'LOGIN_SUCCESS', payload: {data}})
	  } else {
		  yield put({type: 'LOGIN_ERROR', payload: {errorCode}})
	  }
}

function* loginFork() {
	while(true) {
		yield take('LOGIN_REQUEST')
		console.log('login99999')
		// fork return a Task object
		const task = yield fork(authorize)
		const action = yield take(['LOGOUT', 'LOGIN_ERROR'])
		if(action.type === 'LOGOUT'){
			console.log('logout99999')
			yield cancel(task)
			yield call(function* (){
				console.log('clearCookie')
			})
		}
	}
}


export default function* rootSaga() {
	yield all([helloSaga(), watchIncrementAsync(), watchFetchApi(), changeColorSaga(), loginFlow(), loginFork()])
}
