import logger from "./logger.js";
import Joi from "joi"

export const validateRegistration = (data: any)=>{
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().required()
    })    

    return schema.validate(data)
}

export const validateLogin = (data:any)=>{
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    })

    return schema.validate(data)
}