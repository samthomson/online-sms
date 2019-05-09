import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { sSMSAuthTokenHeader } from '../src/declarations'
const sJWTAuthSecret: string | null = process.env.GAPI_AUTH_TOKEN || null

export const _handleSMSAuth = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// X-Gwapi-Signature header
	const sAuthTokenFromHeader: string | null =
		req.get(sSMSAuthTokenHeader) || null

	if (
		sJWTAuthSecret && // token auth is mandatory
		sAuthTokenFromHeader
	) {
		// header is set, and contains value we expected
		// console.log('sAuthToken', sAuthTokenFromHeader)
		// console.log('sAuthTsExpectedAuthTokenValueoken', sJWTAuthSecret)
		try {
			const oVerifiedToken = jwt.verify(
				sAuthTokenFromHeader,
				sJWTAuthSecret,
			)
			// console.log('verified: ', oVerifiedToken)
			res.locals.decodedToken = oVerifiedToken
			next()
		} catch (err) {
			// console.log('\nauth token not verifiable\n')
			// console.log(err)
			// next(err)
			return res.status(401).send('auth token not verifiable')
		}
	} else {
		// console.log('SMS handler was hit without auth token')
		// error decoding auth token - will now proceed to return 401
		return res.status(401).send('SMS handler was hit without auth token')
	}
}
