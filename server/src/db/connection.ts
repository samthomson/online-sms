import * as Sequelize from 'sequelize'

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env

let oConnectionConfig = {
	host: MYSQL_HOST,
	port: 3306,
	username: MYSQL_USER,
	password: MYSQL_PASSWORD,
	database: MYSQL_DATABASE,
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
