import Joi from 'joi';

const trainingSchema = Joi.object({
  training_type_id: Joi.string().required().messages({
    'string.empty': 'Dit veld is verplicht',
    'any.required': 'Dit veld is verplicht',
  }),
  indicated_by_coach: Joi.string().required().messages({
    'string.empty': 'Dit veld is verplicht',
    'any.required': 'Dit veld is verplicht',
  }),
  title: Joi.string().required().messages({
    'string.empty': 'Dit veld is verplicht',
    'any.required': 'Dit veld is verplicht',
  }),
  date: Joi.string().required().messages({
    'string.empty': 'Dit veld is verplicht',
    'any.required': 'Dit veld is verplicht',
  }),
  location: Joi.string().required().messages({
    'string.empty': 'Dit veld is verplicht',
    'any.required': 'Dit veld is verplicht',
  }),
  time: Joi.string().required().messages({
    'string.empty': 'Dit veld is verplicht',
    'any.required': 'Dit veld is verplicht',
  }),
  content: Joi.string().required().messages({
    'string.empty': 'Dit veld is verplicht',
    'any.required': 'Dit veld is verplicht',
  }),
  comment: Joi.string().empty(''),
  is_pinned: Joi.string().empty(''),
});

export default trainingSchema;
