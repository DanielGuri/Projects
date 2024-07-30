import Joi from "joi";
import DTO from '../../models/task/dto'

export const addTaskValidator = Joi.object<DTO> ({
    clientId: Joi.number().positive().required(),
    description: Joi.string().min(2).required(),
    date: Joi.date().required(),
    completed: Joi.boolean()
}); 