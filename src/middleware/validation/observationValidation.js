import Joi from 'joi';

const observationSchema = Joi.object({
  observation_type_id: Joi.string().required().messages({
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

export default observationSchema;
