import knex from '../lib/knex.js';
import { Model } from 'objection';

// Instantiate the model
Model.knex(knex);

// Related models
import UserMeta from './UserMeta.js';

// Define the model
class Workplace extends Model {
  static get tableName() {
    return 'workplaces';
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
        name: { type: 'string', minLength: 1, maxLength: 255 },
        slug: { type: 'string', minLength: 1, maxLength: 255 },
      },
    };
  }

  static get relationMappings() {
    return {
      meta: {
        relation: Model.HasManyRelation,
        modelClass: UserMeta,
        join: {
          from: 'workplaces.id',
          to: 'user_meta.workplace_id',
        },
      },
    };
  }
}

export default Workplace;
