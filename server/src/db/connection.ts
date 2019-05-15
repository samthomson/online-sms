import * as Sequelize from 'sequelize'

const {
	MYSQL_HOST,
	MYSQL_USER,
	MYSQL_PASSWORD,
	MYSQL_DATABASE,
	MYSQL_DATABASE_TESTING,
	NODE_ENV,
} = process.env

let oConnectionConfig = {
	host: MYSQL_HOST,
	port: 3306,
	username: MYSQL_USER,
	password: MYSQL_PASSWORD,
	database: NODE_ENV === 'testing' ? MYSQL_DATABASE_TESTING : MYSQL_DATABASE,
	dialect: 'mysql',
	dialectOptions: {
		charset: 'utf8',
		decimalNumbers: true,
	},
}
//@ts-ignore
const db = new Sequelize(oConnectionConfig)

db.authenticate().catch(() => {
	console.log('Could not connect to database!')
})

export default db
