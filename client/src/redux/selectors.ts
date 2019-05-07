import { Store } from 'src/redux/store'

export const selectPhoneNumber = (state: Store.App): number | null =>
	state.nPhoneNumber
