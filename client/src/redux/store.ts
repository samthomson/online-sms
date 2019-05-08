import { Balance } from 'src/declarations'

export namespace Store {
	export type App = {
		nAccountBalance: Balance
		nPhoneNumber: number | null
	}
}
