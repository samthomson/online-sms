import * as express from 'express'
import * as cors from 'cors'
import * as expressGraphQL from 'express-graphql'
import * as bodyParser from 'body-parser'
import schema from './schema'

import { _handleSMSAuth } from './lib/auth'

import { Application, Response } from 'express'
import { SMS } from './declarations'

import { bValidSMS } from './lib/validate'
import { SMSModel } from './db/models'

const app: Application = express()

// enable cors
var corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true, // <-- REQUIRED backend setting
}
app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', ({}, response: Response) => {
	response.send('root')
})

app.post('/handlesms', _handleSMSAuth, ({}, res: Response) => {
	/*
	{"id": 1000001, "msisdn": 4587654321, "receiver": 451204, "message": "test message", "senttime": 1557335005, "webhook_label": "Fepeyor", "country_code": null, "country_prefix": null, "iat": 451204}
	*/
	let oSMS: SMS = <SMS>res.locals.decodedToken

	if (!bValidSMS(oSMS)) {
		return res.status(422).send('failed joi validation')
	}

	// does it have the correct params
	const nRequiredParams: number = 6 + 1 // x params, plus jwt ait prop
	if (Object.keys(oSMS).length < nRequiredParams) {
		return res.status(422).send('not enough keys')
	}

	// now store it in the db and send an email out
	const oSaveSMS = SMSModel.build(oSMS)
	oSaveSMS.save()

	// send 200 Ok
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
