import knex from '../../lib/knex.js';
import { Model } from 'objection';

// Instantiate the model
Model.knex(knex);

// Related models
import IcfCategory from './IcfCategory.js';
import IcfEvaluation from './IcfEvaluation.js';

// Define the model
class IcfRating extends Model {
  static get tableName() {
    return 'icf_ratings';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'rating', 'description', 'icf_category_id'],
      properties: {
        id: { type: 'integer' },
        title: { type: 'string', maxLength: 255 },
        rating: { type: 'string', maxLength: 255 },
        description: { type: 'string', maxLength: 255 },
        icf_category_id: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: IcfCategory,
        join: {
          from: 'icf_ratings.icf_category_id',
          to: 'icf_categories.id',
        },
      },
      evaluations: {
        relation: Model.HasManyRelation,
        modelClass: IcfEvaluation,
        join: {
          from: 'icf_ratings.id',
          to: 'icf_evaluations.icf_rating_id',
        },
      },
    };
  }
}

export default IcfRating;
