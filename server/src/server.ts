import * as express from 'express'
import * as cors from 'cors'
import * as expressGraphQL from 'express-graphql'
import * as bodyParser from 'body-parser'
import schema from './schema'

import { _handleSMSAuth } from './auth'

import { Application, Response } from 'express'
import { SMS } from './declarations'

import * as Joi from '@hapi/joi'

const app: Application = express()

// enable cors
var corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true, // <-- REQUIRED backend setting
}
app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', ({}, response: Response) => {
	response.send('root')
})

app.post('/handlesms', _handleSMSAuth, ({}, res: Response) => {
	/*
	{"id": 1000001, "msisdn": 4587654321, "receiver": 451204, "message": "test message", "senttime": 1557335005, "webhook_label": "Fepeyor", "country_code": null, "country_prefix": null}
	*/
	let oSMS: SMS = <SMS>res.locals.decodedToken

	// try {
	// 	oSMS = res.locals.decodedToken
	// } catch {
	// 	// params invalid
	// 	return res.status(425).send()validate.js
	// }
	// console.log('sms received?')
	// console.log(oSMS)

	const vNumber = Joi.number()
		.min(0)
		.required()

	const schema = Joi.object().keys({
		id: vNumber,
		msisdn: vNumber,
		receiver: vNumber,
		senttime: vNumber,
		message: Joi.string().required(),
		webhook_label: Joi.string().required(),
		iat: vNumber,
	})

	const { error } = Joi.validate(oSMS, schema)

	if (error) {
		// console.log('failed joi validation, return 422')
		return res.status(422).send('failed joi validation')
	} /* else {
		console.log('\nvalid\n')
	}
*/
	// does it have the correct params
	const nRequiredParams: number = 6 + 1 // x params, plus jwt ait prop
	// console.log('sms has x params', Object.keys(oSMS).length)
	if (Object.keys(oSMS).length !== nRequiredParams) {
		// console.log('not enough keys, return 422')
		return res.status(422).send('not enough keys')
	}

	res.status(200).send('Ok')
})

// set up graphql
app.use(
	'/graphql',
	expressGraphQL({
		schema,
		graphiql: true,
	}),
)

app.listen(3100)

export default app
