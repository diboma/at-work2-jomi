import knex from '../../lib/knex.js';
import { Model } from 'objection';

// Instantiate the model
Model.knex(knex);

// Related models
import User from '../User.js';
import EvaluationStage from './EvaluationStage.js';
import IcfCode from './IcfCode.js';
import IcfRating from './IcfRating.js';
import IcfCategory from './IcfCategory.js';

// Define the model
class IcfEvaluation extends Model {
  static get tableName() {
    return 'icf_evaluations';
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
        'icf_code_id',
        'icf_rating_id',
      ],
      properties: {
        id: { type: 'integer' },
        maatwerker_id: { type: 'integer' },
        maatwerkcoach_id: { type: 'integer' },
        evaluation_stage_id: { type: 'integer' },
        icf_code_id: { type: 'string' },
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
          from: 'icf_evaluations.maatwerker_id',
          to: 'users.id',
        },
      },
      maatwerkcoach: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'icf_evaluations.maatwerkcoach_id',
          to: 'users.id',
        },
      },
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: IcfCategory,
        join: {
          from: 'icf_evaluations.icf_category_id',
          to: 'icf_categories.id',
        },
      },
      stage: {
        relation: Model.BelongsToOneRelation,
        modelClass: EvaluationStage,
        join: {
          from: 'icf_evaluations.evaluation_stage_id',
          to: 'evaluation_stages.id',
        },
      },
      code: {
        relation: Model.BelongsToOneRelation,
        modelClass: IcfCode,
        join: {
          from: 'icf_evaluations.icf_code_id',
          to: 'icf_codes.id',
        },
      },
      rating: {
        relation: Model.BelongsToOneRelation,
        modelClass: IcfRating,
        join: {
          from: 'icf_evaluations.icf_rating_id',
          to: 'icf_ratings.id',
        },
      },
    };
  }
}

export default IcfEvaluation;
