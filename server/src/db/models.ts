import * as Sequelize from 'sequelize'
import db from './connection'

export const SMSModel = db.define('smss', {
	local_id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	msisdn: {
		type: Sequelize.BIGINT,
	},
	receiver: {
		type: Sequelize.INTEGER,
	},
	message: {
		type: Sequelize.TEXT,
	},
	senttime: {
		type: Sequelize.INTEGER,
	},
	webhook_label: {
		type: Sequelize.TEXT,
	},
})
