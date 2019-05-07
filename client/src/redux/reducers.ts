import { Action } from './actions'
import { Store } from './store'

const initialState: Store.App = {
	nPhoneNumber: null,
}

export function appReducers(
	state: Store.App = initialState,
	action: Action,
): Store.App {
	switch (action.type) {
		case 'GET_NUMBER':
			return {
				...state,
				nPhoneNumber: 5522079,
			}
	}

	return state
}
