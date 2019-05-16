import 'mocha'
import * as chai from 'chai'
import { expect, request } from 'chai'
import * as jwt from 'jsonwebtoken'
import chaiHttp = require('chai-http')
import server from './../src/server'
import { sSMSAuthTokenHeader } from './../src/declarations'
import { SMSModel } from './../src/db/models'

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
			// should store a message in the database
			// get count
			const nMessages = await SMSModel.count()

			// submit request
			const oMissingParametersResponse = await request(server)
				.post('/handlesms')
				.set(sSMSAuthTokenHeader, sSignedSMS)
			chai.expect(oMissingParametersResponse.status).to.eql(200)

			// get count again
			const nMessagesPlusOne = await SMSModel.count()

			// count should be one more
			chai.expect(nMessagesPlusOne).to.equal(nMessages + 1)
		})

		it('succeeds when optional parameters are sent too', async () => {
			// post message with correct/expected paramameters and optional params like country code
			const oOptionalParametersResponse = await request(server)
				.post('/handlesms')
				.set(sSMSAuthTokenHeader, sSignedSMSOptionalParams)
			chai.expect(oOptionalParametersResponse.status).to.eql(200)
		})
	})

	describe('graphQL', async () => {
		it('get messages', async () => {
			// seed message
			const sMessageContent: string = 'message content'
			SMSModel.build({
				message: sMessageContent,
				from: 4512345678,
				time: 1557335005,
			}).save()

			// post message with correct paramameters and reasonable values
			const oMessagesResponse = await chai
				.request(server)
				.post('/graphql')
				.send({
					query: `
			  {
				messages{
					body,
					from,
					time
				}
			  }`,
				})

			chai.expect(oMessagesResponse.body.data.messages).to.be.an('array')
			chai.expect(oMessagesResponse.body.data.messages[0].body).to.equal(
				sMessageContent,
			)
		})
	})
})
