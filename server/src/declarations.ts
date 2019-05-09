// constants
export const sSMSAuthTokenHeader: string = 'x-gwapi-signature'

// types
export type SMS = {
	id: number
	msisdn: number
	receiver: number
	message: string
	senttime: number
	webhook_label: string
}
