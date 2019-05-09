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
		try {
			const oVerifiedToken = jwt.verify(
				sAuthTokenFromHeader,
				sJWTAuthSecret,
			)
			res.locals.decodedToken = oVerifiedToken
			next()
		} catch (err) {
			return res.status(401).send('auth token not verifiable')
		}
	} else {
		// error decoding auth token - will now proceed to return 401
		return res.status(401).send('SMS handler was hit without auth token')
	}
}
