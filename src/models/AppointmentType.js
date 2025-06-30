import knex from '../lib/knex.js';
import { Model } from 'objection';

// Instantiate the model
Model.knex(knex);

// Related models
import Appointment from './Appointment.js';

// Define the model
class AppointmentType extends Model {
  static get tableName() {
    return 'appointment_types';
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
        name: { type: 'string' },
        slug: { type: 'string' },
      },
    };
  }

  static get relationMappings() {
    return {
      appointments: {
        relation: Model.HasManyRelation,
        modelClass: Appointment,
        join: {
          from: 'appointment_types.id',
          to: 'appointments.appointment_type_id',
        },
      },
    };
  }
}

export default AppointmentType;
