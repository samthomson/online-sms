import { Action } from './actions'
import { Store } from './store'

const initialState: Store.App = {
	nAccountBalance: null,
	nPhoneNumber: null,
}

export function appReducers(
	state: Store.App = initialState,
	action: Action,
): Store.App {
	switch (action.type) {
		case 'GET_BALANCE_SUCCEEDED' || 'GET_BALANCE_FAILED':
			return {
				...state,
				nAccountBalance: action.nBalance,
			}
	}

	return state
}
