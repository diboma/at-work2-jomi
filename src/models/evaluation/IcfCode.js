import knex from '../../lib/knex.js';
import { Model } from 'objection';

// Instantiate the model
Model.knex(knex);

// Related models
import IcfCategory from './IcfCategory.js';
import IcfEvaluation from './IcfEvaluation.js';

// Define the model
class IcfCode extends Model {
  static get tableName() {
    return 'icf_codes';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'slug', 'icf_category_id'],
      properties: {
        id: { type: 'string' },
        name: { type: 'string', maxLength: 255 },
        slug: { type: 'string', maxLength: 255 },
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
          from: 'icf_codes.icf_category_id',
          to: 'icf_categories.id',
        },
      },
      evaluations: {
        relation: Model.HasManyRelation,
        modelClass: IcfEvaluation,
        join: {
          from: 'icf_codes.id',
          to: 'icf_ratings.icf_code_id',
        },
      },
    };
  }
}

export default IcfCode;
