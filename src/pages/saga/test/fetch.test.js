import test from 'tape'
import { put, call } from 'redux-saga/effects'
import {fetchApi, fetchFn, fetchAddress} from '../saga'

test('fetchApi Saga test', assert => {
	const gen = fetchApi()

    // now what ?
	assert.deepEqual(
		gen.next().value,
		call(fetchFn, fetchAddress),
		'fetchApi Saga must call fetchFn(fetchAddress)'
    )
    
    const result = {}

	assert.deepEqual(
		gen.next(result).value,
		put({ type: 'SET_API_RESULT' , result}),
		'fetchApi Saga must dispatch an SET_API_RESULT action'
	)

	assert.deepEqual(
		gen.next(),
		{ done: true, value: undefined },
		'fetchApi Saga must be done'
	)

	assert.end()
})
