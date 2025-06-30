import Joi from 'joi';

const inflowEvaluationSchema = Joi.object({
  inflow_evaluation_subject_id: Joi.string().required().messages({
    'string.empty': 'Dit veld is verplicht',
    'any.required': 'Dit veld is verplicht',
  }),
  content: Joi.string().required().messages({
    'string.empty': 'Dit veld is verplicht',
    'any.required': 'Dit veld is verplicht',
  }),
  comment: Joi.string().empty(''),
});

export default inflowEvaluationSchema;
