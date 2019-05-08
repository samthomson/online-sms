import 'mocha'
import * as chai from 'chai'
// import { expect, request } from 'chai'
import chaiHttp = require('chai-http')
import server from './../src/server'

chai.use(chaiHttp)

describe('server', async () => {
	describe('handle sms', async () => {
		it('should handle sms as expected', async () => {
			// post message to api with wrong parameters

			// post message with correct parameters but bad values

			// post message with correct paramameters and reasonable values

			return chai
				.request(server)
				.post('/handlesms')
				.then(res => {
					chai.expect(res.status).to.eql(200)
					chai.expect(res.text).to.eql('O k')
				})
		})
	})
})
