import knex from '../../lib/knex.js';
import { Model } from 'objection';

// Instantiate the model
Model.knex(knex);

// Related models
import Observation from './Observation.js';

// Define the model
class ObservationType extends Model {
  static get tableName() {
    return 'observation_types';
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
      observations: {
        relation: Model.HasManyRelation,
        modelClass: Observation,
        join: {
          from: 'observation_types.id',
          to: 'observations.observation_type_id',
        },
      },
    };
  }
}

export default ObservationType;
