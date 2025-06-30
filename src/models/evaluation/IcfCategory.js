import knex from '../../lib/knex.js';
import { Model } from 'objection';

// Instantiate the model
Model.knex(knex);

// Related models
import IcfRating from './IcfRating.js';
import IcfCode from './IcfCode.js';

// Define the model
class IcfCategory extends Model {
  static get tableName() {
    return 'icf_categories';
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
      evaluations: {
        relation: Model.HasManyRelation,
        modelClass: IcfRating,
        join: {
          from: 'icf_categories.id',
          to: 'icf_evaluations.icf_category_id',
        },
      },
      ratings: {
        relation: Model.HasManyRelation,
        modelClass: IcfRating,
        join: {
          from: 'icf_categories.id',
          to: 'icf_ratings.icf_category_id',
        },
      },
      codes: {
        relation: Model.HasManyRelation,
        modelClass: IcfCode,
        join: {
          from: 'icf_categories.id',
          to: 'icf_codes.icf_category_id',
        },
      },
    };
  }
}

export default IcfCategory;
