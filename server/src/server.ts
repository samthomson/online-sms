import * as express from 'express'
import * as cors from 'cors'
import * as expressGraphQL from 'express-graphql'
import * as bodyParser from 'body-parser'
import schema from './schema'

import { Application, Request, Response } from 'express'
import { SMS } from './declarations'

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

app.post('/handlesms', (req: Request, res: Response) => {
	/*
	{"id": 1000001, "msisdn": 4587654321, "receiver": 451204, "message": "test message", "senttime": 1557335005, "webhook_label": "Fepeyor", "country_code": null, "country_prefix": null}
	*/
	const oSMS: SMS = req.body
	console.log('sms received?')
	console.log(oSMS)

	// does it have the correct params
	const nRequiredParams: number = 6
	if (Object.keys(oSMS).length !== nRequiredParams) {
		return res.status(422).send()
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
