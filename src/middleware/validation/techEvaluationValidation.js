import Joi from 'joi';

const techEvaluationSchema = Joi.object({
  evaluation_stage_id: Joi.string().required().messages({
    'string.empty': 'Dit veld is verplicht',
    'any.required': 'Dit veld is verplicht',
  }),
  machine_id: Joi.string().required().messages({
    'string.empty': 'Dit veld is verplicht',
    'any.required': 'Dit veld is verplicht',
  }),
  technical_level_id: Joi.string().required().messages({
    'string.empty': 'Dit veld is verplicht',
    'any.required': 'Dit veld is verplicht',
  }),
  comment: Joi.string().empty(''),
  fase: Joi.string().empty(''),
});

export default techEvaluationSchema;
