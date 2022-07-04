import joi from 'joi'

export const createUserSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required()
})

export const loginUserSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})

export const postWalletSchema = joi.object({
    value: joi.number().required(),
    description: joi.string().required(),
    type: joi.string().valid('debit','credit').required()
})