import knex from '../../lib/knex.js';
import { Model } from 'objection';

// Instantiate the model
Model.knex(knex);

// Related models
import User from '../User.js';
import InflowEvaluationSubject from './InflowEvaluationSubject.js';

// Define the model
class InflowEvaluation extends Model {
  static get tableName() {
    return 'inflow_evaluations';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'maatwerker_id',
        'maatwerkcoach_id',
        'inflow_evaluation_subject_id',
        'content',
      ],
      properties: {
        id: { type: 'integer' },
        maatwerker_id: { type: 'integer', nullable: true },
        maatwerkcoach_id: { type: 'integer', nullable: true },
        evaluation_stage_id: { type: 'integer' },
        content: { type: 'string' },
        comment: { type: 'string' },
      },
    };
  }

  static get relationMappings() {
    return {
      maatwerker: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'inflow_evaluations.maatwerker_id',
          to: 'users.id',
        },
      },
      maatwerkcoach: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'inflow_evaluations.maatwerkcoach_id',
          to: 'users.id',
        },
      },
      subject: {
        relation: Model.BelongsToOneRelation,
        modelClass: InflowEvaluationSubject,
        join: {
          from: 'inflow_evaluations.inflow_evaluation_subject_id',
          to: 'inflow_evaluation_subjects.id',
        },
      },
    };
  }
}

export default InflowEvaluation;
