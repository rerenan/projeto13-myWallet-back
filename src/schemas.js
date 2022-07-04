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