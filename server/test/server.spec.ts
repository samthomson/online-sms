import 'mocha'
import * as chai from 'chai'
import { expect, request } from 'chai'
import chaiHttp = require('chai-http')
import server from './../src/server'

chai.use(chaiHttp)

describe('server', async () => {
	it('should handle sms', async () => {
		// post message without auth token
		const oUnauthenticatedResponse = await request(server).post(
			'/handlesms',
		)
		chai.expect(oUnauthenticatedResponse.status).to.eql(401)

		// post message to api with not enough parameters
		const oMissingParametersResponse = await request(server).post(
			'/handlesms',
		)
		chai.expect(oMissingParametersResponse.status).to.eql(422)

		// post message to api with wrong parameters
		expect(false).to.eql(true)

		// post message with correct parameters but bad values
		expect(false).to.eql(true)

		// post message with correct paramameters and reasonable values
		expect(false).to.eql(true)
	})
})
