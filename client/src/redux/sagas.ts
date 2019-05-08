import { all, put, takeLatest } from 'redux-saga/effects'

import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import gql from 'graphql-tag'
import { getBalanceFailed, getBalanceSucceded } from 'src/redux/actions'

const client = new ApolloClient({
	link: createHttpLink({
		uri: 'http://localhost:3100/graphql',
		credentials: 'include',
	}),
	cache: new InMemoryCache(),
})

function* getBalance() {
	try {
		const data = yield client.query({
			query: gql`
				query GetBalance {
					balance {
						id
						credit
						currency
					}
				}
			`,
		})

		if (data && data.data && data.data.balance) {
			const { balance } = data.data

			yield put(getBalanceSucceded(balance.credit))
		} else {
			console.log('getting balance failed')
			put(getBalanceFailed())
		}
	} catch (e) {
		console.log('error getting balance? ', e.message)
	}
}

function* watchGetBalance() {
	yield takeLatest('GET_BALANCE', getBalance)
}

export default function* rootSaga() {
	yield all([watchGetBalance()])
}
