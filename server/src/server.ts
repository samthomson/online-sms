import * as express from 'express'

const app: express.Application = express()

app.get('/', ({}, response: express.Response) => {
	response.send('root')
})

app.listen(3100)
