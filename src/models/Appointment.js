import knex from '../lib/knex.js';
import { Model } from 'objection';

// Instantiate the model
Model.knex(knex);

// Related models
import User from './User.js';
import AppointmentType from './AppointmentType.js';

// Define the model
class Appointment extends Model {
  static get tableName() {
    return 'appointments';
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
        'appointment_type_id',
        'date',
        'location',
      ],
      properties: {
        id: { type: 'integer' },
        maatwerker_id: { type: 'integer' },
        maatwerkcoach_id: { type: 'integer' },
        appointment_type_id: { type: 'integer' },
        // date: { type: 'string' }, // string (date time)
        date: { type: 'number' }, // number (timestamp)
        location: { type: 'string' },
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
          from: 'appointments.maatwerker_id',
          to: 'users.id',
        },
      },
      maatwerkcoach: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'appointments.maatwerkcoach_id',
          to: 'users.id',
        },
      },
      type: {
        relation: Model.BelongsToOneRelation,
        modelClass: AppointmentType,
        join: {
          from: 'appointments.appointment_type_id ',
          to: 'appointment_types.id',
        },
      },
    };
  }
}

export default Appointment;
