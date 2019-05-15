import * as Joi from '@hapi/joi'

const vNumber = Joi.number()
	.min(0)
	.required()
const vString = Joi.string().required()

const oJOISchema = Joi.object().keys({
	id: vNumber,
	msisdn: vNumber,
	receiver: vNumber,
	senttime: vNumber,
	message: vString,
	webhook_label: vString,
	// iat: vNumber,
})

const oJOIOptions = {
	allowUnknown: true,
}

export const bValidSMS = (oPossibleSMS: object): boolean => {
	const { error } = Joi.validate(oPossibleSMS, oJOISchema, oJOIOptions)

	// console.log(error)

	return error ? false : true
}
