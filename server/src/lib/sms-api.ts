import axios from 'axios'

const makeGatewayRequest = async (
	sRelativeUrl: string,
	oParams: object = {},
) => {
	try {
		const { API_TOKEN } = process.env
		const oAllParams = {
			token: API_TOKEN,
			...oParams,
		}
		const { data } = await axios.get(
			'https://gatewayapi.com/' + sRelativeUrl,
			{
				params: oAllParams,
			},
		)

		return data
	} catch (error) {
		console.log(error)
		return {}
	}
}

export const oGetBalance = async () => {
	return makeGatewayRequest('rest/me')
}
