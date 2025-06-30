import knex from '../../lib/knex.js';
import { Model } from 'objection';

// Instantiate the model
Model.knex(knex);

// Related models
import IcfEvaluation from './IcfEvaluation.js';
import TechnicalEvaluation from './TechnicalEvaluation.js';

// Define the model
class EvaluationStage extends Model {
  static get tableName() {
    return 'evaluation_stages';
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
        iconSmall: { type: 'string', maxLength: 255 },
        iconLarge: { type: 'string', maxLength: 255 },
      },
    };
  }

  static get relationMappings() {
    return {
      icfEvaluations: {
        relation: Model.HasManyRelation,
        modelClass: IcfEvaluation,
        join: {
          from: 'evaluation_stages.id',
          to: 'icf_evaluations.evaluation_stage_id',
        },
      },
      technicalEvaluations: {
        relation: Model.HasManyRelation,
        modelClass: TechnicalEvaluation,
        join: {
          from: 'evaluation_stages.id',
          to: 'technical_evaluations.evaluation_stage_id',
        },
      },
    };
  }
}

export default EvaluationStage;
