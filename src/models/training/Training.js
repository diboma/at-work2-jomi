import knex from '../../lib/knex.js';
import { Model } from 'objection';

// Instantiate the model
Model.knex(knex);

// Related models
import User from '../User.js';
import TrainingType from './TrainingType.js';

// Define the model
class Training extends Model {
  static get tableName() {
    return 'trainings';
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
        'training_type_id',
        'title',
        'date',
        'location',
      ],
      properties: {
        id: { type: 'integer' },
        maatwerker_id: { type: 'integer' },
        maatwerkcoach_id: { type: 'integer' },
        training_type_id: { type: 'integer' },
        indicated_by_coach: { type: 'boolean' },
        // date: { type: 'string' }, // string (date time)
        date: { type: 'number' }, // number (timestamp)
        location: { type: 'string' },
        title: { type: 'string' },
        content: { type: 'string' },
        comment: { type: 'string' },
        is_completed: { type: 'boolean' },
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
          from: 'trainings.maatwerker_id',
          to: 'users.id',
        },
      },
      maatwerkcoach: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'trainings.maatwerkcoach_id',
          to: 'users.id',
        },
      },
      type: {
        relation: Model.BelongsToOneRelation,
        modelClass: TrainingType,
        join: {
          from: 'trainings.training_type_id',
          to: 'training_types.id',
        },
      },
    };
  }
}

export default Training;
