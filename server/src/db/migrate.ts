import db from './connection'
import { SMSModel } from './models'

const { MYSQL_DATABASE, MYSQL_DATABASE_TESTING, NODE_ENV } = process.env

const migrate = async () => {
	// ensure testing db exists
	const sDBToCreate =
		NODE_ENV === 'testing' ? MYSQL_DATABASE_TESTING : MYSQL_DATABASE
	const sRaw: string = `CREATE DATABASE IF NOT EXISTS \`${sDBToCreate}\`;`
	await db.query(sRaw)

	// create tables
	await SMSModel.sync()
}

migrate()
