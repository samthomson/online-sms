import 'mocha'
import * as chai from 'chai'
import { expect, request } from 'chai'
import chaiHttp = require('chai-http')
import server from './../src/server'

chai.use(chaiHttp)

describe('server', async () => {
	describe('handle sms', async () => {
		it('should handle sms as expected', async () => {
			// post message without auth token
			expect(false).to.eql(true)

			// post message to api with not enough parameters
			const oResponse = await request(server).post('/handlesms')
			chai.expect(oResponse.status).to.eql(422)

			// post message to api with wrong parameters
			expect(false).to.eql(true)

			// post message with correct parameters but bad values
			expect(false).to.eql(true)

			// post message with correct paramameters and reasonable values
			expect(false).to.eql(true)
		})
	})
})
