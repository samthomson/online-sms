export type Action = {
	type: 'GET_NUMBER'
}

export const getNumber = (): Action => {
	return {
		type: 'GET_NUMBER',
	}
}
