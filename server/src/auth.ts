import { NextFunction, Request, Response } from 'express'

const sSMSAuthTokenHeader: string = 'x-gwapi-signature'
const sExpectedAuthTokenValue: string | null =
	process.env.GAPI_AUTH_TOKEN || null

export const _handleSMSAuth = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// X-Gwapi-Signature header
	console.log(req.headers)
	if (
		sExpectedAuthTokenValue && // token auth is mandatory
		req.headers[sSMSAuthTokenHeader] &&
		req.headers[sSMSAuthTokenHeader] === sExpectedAuthTokenValue
	) {
		// header is set, and contains value we expected
		next()
	} else {
		console.log('SMS handler was hit without appropriate auth token')
		return res.status(401).send()
	}
}
