import knex from '../../lib/knex.js';
import { Model } from 'objection';

// Instantiate the model
Model.knex(knex);

// Related models
import User from '../User.js';
import ObservationType from './ObservationType.js';

// Define the model
class Observation extends Model {
  static get tableName() {
    return 'observations';
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
        'observation_type_id',
        'content',
      ],
      properties: {
        id: { type: 'integer' },
        maatwerker_id: { type: 'integer' },
        maatwerkcoach_id: { type: 'integer' },
        observation_type_id: { type: 'integer' },
        content: { type: 'string' },
        comment: { type: 'string' },
        is_pinned: { type: 'boolean' },
      },
    };
  }

  static get relationMappings() {
    return {
      maatwerker: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'observations.maatwerker_id',
          to: 'users.id',
        },
      },
      maatwerkcoach: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'observations.maatwerkcoach_id',
          to: 'users.id',
        },
      },
      type: {
        relation: Model.BelongsToOneRelation,
        modelClass: ObservationType,
        join: {
          from: 'observations.observation_type_id',
          to: 'observation_types.id',
        },
      },
    };
  }
}

export default Observation;
