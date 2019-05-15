import db from './connection'
import { SMSModel } from './models'

const { MYSQL_DATABASE_TESTING } = process.env

const migrate = async () => {
	// ensure testing db exists
	const sRaw: string = `CREATE DATABASE IF NOT EXISTS \`${MYSQL_DATABASE_TESTING}\``
	await db.query(sRaw)

	// create tables
	await SMSModel.sync()
}

migrate()
