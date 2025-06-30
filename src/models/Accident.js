import knex from '../lib/knex.js';
import { Model } from 'objection';

// Instantiate the model
Model.knex(knex);

// Related models
import User from './User.js';

// Define the model
class Accident extends Model {
  static get tableName() {
    return 'accidents';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'maatwerker_id',
        'reported_by_id',
        'date',
        'location',
        'cause',
        'injury',
        'care',
      ],
      properties: {
        id: { type: 'integer' },
        maatwerker_id: { type: 'integer' },
        reported_by_id: { type: 'integer' },
        // date: { type: 'string' }, // string (date time)
        date: { type: 'number' }, // number (timestamp)
        location: { type: 'string' },
        cause: { type: 'string' },
        injury: { type: 'string' },
        care: { type: 'string' },
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
          from: 'accidents.maatwerker_id',
          to: 'users.id',
        },
      },
      reportedBy: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'accidents.reported_by_id',
          to: 'users.id',
        },
      },
    };
  }
}

export default Accident;
