import knex from '../../lib/knex.js';
import { Model } from 'objection';

// Instantiate the model
Model.knex(knex);

// Related models
import InflowEvaluation from './InflowEvaluation.js';

// Define the model
class InflowEvaluationSubject extends Model {
  static get tableName() {
    return 'inflow_evaluation_subjects';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'slug'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', maxLength: 255 },
        slug: { type: 'string', maxLength: 255 },
      },
    };
  }

  static get relationMappings() {
    return {
      inflowEvaluations: {
        relation: Model.HasManyRelation,
        modelClass: InflowEvaluation,
        join: {
          from: 'inflow_evaluation_subjects.id',
          to: 'inflow_evaluations.inflow_evaluation_subject_id',
        },
      },
    };
  }
}

export default InflowEvaluationSubject;
