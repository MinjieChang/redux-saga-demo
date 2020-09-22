import { delay } from 'redux-saga'
import { put, takeEvery, all, call, take, select, fork, cancel } from 'redux-saga/effects'

// ----------------------------  take 与 takeEvery  -----------------------
function* takeTask() {
	yield take('INCREASE')
	console.log('INCREASE')

	// while(true) {
	// 	yield take('INCREASE')
	// 	console.log('INCREASE')
	// }

	// yield takeEvery('INCREASE', function* takeEve(){ // 必须得带yield
	// 	console.log('takeEve')
	// })
}

// ----------------------------  异步counter  -----------------------

// worker saga
export function* incrementAsync() {
	yield call(delay, 500) //  => { CALL: {fn: delay, args: [1000]}}
	yield put({ type: 'INCREASE' }) // => { PUT: {type: 'INCREMENT'} }
}

// watcher saga
export function* watchIncrementAsync() {
	yield takeEvery('INCREASE_ASYNC', incrementAsync)
}

// ----------------------------  thunk  -----------------------

export function thunk(data) {
	return (dispatch) => {
		delay(200).then(() => {
			dispatch({type: 'THUNK_INCREASE'})
		})
	}
}

// ----------------------------  异步请求 api  -----------------------

export const fetchAddress = 'http://localhost:8000/api/staff/getStaffs'
export const fetchFn = (url) => fetch(url).then(res => res.json())

export function* fetchApi() {
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

function* changeColorSaga() {
	while(true){
		const color = yield select((state) => state.color)
		console.log('color', color)
		const action = yield take(CHOOSE_COLOR);
		yield put(changeUI(action.payload.color));
	}
}

function* changeColorSagaTwo() {
	yield takeEvery(CHOOSE_COLOR, function* chooseColor(action){
		yield put(changeUI(action.payload.color));
	})
}

// ----------------------------  take流控制  -----------------------

export const fetchLoginFn = (url) => fetch(url, {
	method: 'post',
	body: JSON.stringify({
		email: "1121134@qq.com",
		password: "12345678a"
	}),
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
}).then(res => res.json())

export const loginAddress = 'http://localhost:8000/api/account/login'

function* loginFlow() {
	while (true) {
	  yield take('LOGIN')
	  const {data, errorCode} = yield call(fetchLoginFn, loginAddress)
	  if(data){
			console.log('LOGIN_SUCCESS')
			yield put({type: 'LOGIN_SUCCESS', payload: {data}})
			// 等待退出动作
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
		// fork return a Task object
		const task = yield fork(authorize)
		const action = yield take(['LOGOUT', 'LOGIN_ERROR'])
		if(action.type === 'LOGOUT') {
			console.log('logout99999')
			yield cancel(task)
			yield call(function* () {
				console.log('clearCookie')
			})
		}
	}
}


export default function* rootSaga() {
	yield all([takeTask(), watchIncrementAsync(), thunk(), watchFetchApi(), changeColorSaga(), loginFlow(), loginFork()])
}
