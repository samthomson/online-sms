import { Balance } from 'src/declarations'

export type Action =
	| {
			type: 'GET_BALANCE'
	  }
	| {
			type: 'GET_BALANCE_SUCCEEDED'
			nBalance: Balance
	  }
	| {
			type: 'GET_BALANCE_FAILED'
			nBalance: Balance
	  }

export const getBalance = (): Action => {
	return {
		type: 'GET_BALANCE',
	}
}

export const getBalanceSucceded = (nBalance: number): Action => {
	return {
		type: 'GET_BALANCE_SUCCEEDED',
		nBalance,
	}
}

export const getBalanceFailed = (): Action => {
	return {
		type: 'GET_BALANCE_FAILED',
		nBalance: null,
	}
}
