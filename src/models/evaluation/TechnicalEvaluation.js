import knex from '../../lib/knex.js';
import { Model } from 'objection';

// Instantiate the model
Model.knex(knex);

// Related models
import User from '../User.js';
import EvaluationStage from './EvaluationStage.js';
import Machine from './Machine.js';
import TechnicalLevel from './TechnicalLevel.js';

// Define the model
class TechnicalEvaluation extends Model {
  static get tableName() {
    return 'technical_evaluations';
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
        'evaluation_stage_id',
        'machine_id',
        'technical_level_id',
      ],
      properties: {
        id: { type: 'integer' },
        maatwerker_id: { type: 'integer' },
        maatwerkcoach_id: { type: 'integer' },
        evaluation_stage_id: { type: 'integer' },
        icf_code_id: { type: 'integer' },
        icf_rating_id: { type: 'integer' },
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
          from: 'technical_evaluations.maatwerker_id',
          to: 'users.id',
        },
      },
      maatwerkcoach: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'technical_evaluations.maatwerkcoach_id',
          to: 'users.id',
        },
      },
      stage: {
        relation: Model.BelongsToOneRelation,
        modelClass: EvaluationStage,
        join: {
          from: 'technical_evaluations.evaluation_stage_id',
          to: 'evaluation_stages.id',
        },
      },
      machine: {
        relation: Model.BelongsToOneRelation,
        modelClass: Machine,
        join: {
          from: 'technical_evaluations.machine_id',
          to: 'machines.id',
        },
      },
      level: {
        relation: Model.BelongsToOneRelation,
        modelClass: TechnicalLevel,
        join: {
          from: 'technical_evaluations.technical_level_id',
          to: 'technical_levels.id',
        },
      },
    };
  }
}

export default TechnicalEvaluation;
