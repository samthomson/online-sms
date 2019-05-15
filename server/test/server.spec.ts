import 'mocha'
import * as chai from 'chai'
import { expect, request } from 'chai'
import * as jwt from 'jsonwebtoken'
import chaiHttp = require('chai-http')
import server from './../src/server'
import { sSMSAuthTokenHeader } from './../src/declarations'

chai.use(chaiHttp)

const sJWTAuthSecret: string | null = process.env.GAPI_AUTH_TOKEN || null

describe('server', async () => {
	describe('handle sms', async () => {
		const oSMS: object = {
			id: 1000001,
			msisdn: 4587654321,
			receiver: 451204,
			message: 'test message',
			senttime: 1557335005,
			webhook_label: 'Fepeyor',
		}
		const oSMSMissingParameters: object = {
			id: 1000001,
			receiver: 451204,
			message: 'test message',
			senttime: 1557335005,
			webhook_label: 'Fepeyor',
		}
		const oSMSInvalidParameters: object = {
			id: 1000001,
			msisdn: 'girafe', // invalid, should be a number
			receiver: 451204,
			message: 'test',
			senttime: '1557335005', // invalid as it should be a number
			webhook_label: 'Fepeyor',
		}
		const oSMSExtremeParams: object = {
			id: -12,
			msisdn: 4587654321,
			receiver: 451204,
			message: 'test message',
			senttime: 1557335005,
			webhook_label: 'Fepeyor',
		}
		const oSMSOptionalParams: object = {
			...oSMS,
			country_code: 'DK',
			country_prefix: 45,
		}

		const sSignedSMS: string = jwt.sign(oSMS, sJWTAuthSecret || '')
		const sSignedSMSMissingParameters: string = jwt.sign(
			oSMSMissingParameters,
			sJWTAuthSecret || '',
		)
		const sSignedSMSInvalidParameters: string = jwt.sign(
			oSMSInvalidParameters,
			sJWTAuthSecret || '',
		)
		const sSignedSMSExtremeParameters: string = jwt.sign(
			oSMSExtremeParams,
			sJWTAuthSecret || '',
		)

		const sSignedSMSOptionalParams: string = jwt.sign(
			oSMSOptionalParams,
			sJWTAuthSecret || '',
		)

		it('fail without auth token', async () => {
			// post message without auth token
			const oUnauthenticatedResponse = await request(server).post(
				'/handlesms',
			)
			chai.expect(oUnauthenticatedResponse.status).to.eql(401)
		})

		it('fail with invalid auth token', async () => {
			// post message without auth token
			const oUnAuthorizedResponse = await request(server)
				.post('/handlesms')
				.set(sSMSAuthTokenHeader, 'gfdgfdgfd')
			chai.expect(oUnAuthorizedResponse.status).to.eql(401)
		})

		it('fail with missing parameters', async () => {
			// post message to api with not enough parameters
			const oMissingParametersResponse = await request(server)
				.post('/handlesms')
				.set(sSMSAuthTokenHeader, sSignedSMSMissingParameters)
			chai.expect(oMissingParametersResponse.status).to.eql(422)
		})

		it('fail with invalid parameters', async () => {
			// post message to api with wrong parameters
			const oInvalidParametersResponse = await request(server)
				.post('/handlesms')
				.set(sSMSAuthTokenHeader, sSignedSMSInvalidParameters)
			chai.expect(oInvalidParametersResponse.status).to.eql(422)
		})

		it('fail with extreme parameters', async () => {
			// post message with correct parameters but bad values
			const oExtremeParametersResponse = await request(server)
				.post('/handlesms')
				.set(sSMSAuthTokenHeader, sSignedSMSExtremeParameters)
			expect(oExtremeParametersResponse.status).to.eql(422)
		})

		it('succeed under normal conditions', async () => {
			// post message with correct paramameters and reasonable values
			const oMissingParametersResponse = await request(server)
				.post('/handlesms')
				.set(sSMSAuthTokenHeader, sSignedSMS)
			chai.expect(oMissingParametersResponse.status).to.eql(200)
		})

		it('succeeds when optional parameters are sent too', async () => {
			// post message with correct/expected paramameters and optional params like country code
			const oOptionalParametersResponse = await request(server)
				.post('/handlesms')
				.set(sSMSAuthTokenHeader, sSignedSMSOptionalParams)
			chai.expect(oOptionalParametersResponse.status).to.eql(200)
		})

		it('stores a received message in the database', async () => {
			chai.expect(true).to.equal(false)
		})
	})
})
