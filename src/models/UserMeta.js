import knex from '../lib/knex.js';
import { Model } from 'objection';

// Instantiate the model
Model.knex(knex);

// Related models
import User from './User.js';
import EmergencyContact from './EmergencyContact.js';
import Workplace from './Workplace.js';

// Define the model
class UserMeta extends Model {
  static get tableName() {
    return 'user_meta';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id', 'RRN'],
      properties: {
        id: { type: 'integer' },
        user_id: { type: 'integer' },
        avatar_url: { type: 'string', maxLength: 255 },
        RRN: { type: 'string', maxLength: 11 },
        address: { type: 'string', maxLength: 255 },
        phone: { type: 'string', maxLength: 20 },
        communication_preference: { type: 'string', maxLength: 255 },
        health_insurance_fund: { type: 'string', maxLength: 255 },
        // emergency_contact_id: { type: 'integer' },
        // workplace_id: { type: 'integer' },
        // maatwerkcoach_id: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'user_meta.user_id',
          to: 'users.id',
        },
      },
      emergency_contact: {
        relation: Model.BelongsToOneRelation,
        modelClass: EmergencyContact,
        join: {
          from: 'user_meta.emergency_contact_id',
          to: 'emergency_contacts.id',
        },
      },
      maatwerkcoach: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'user_meta.maatwerkcoach_id',
          to: 'users.id',
        },
      },
      workplace: {
        relation: Model.BelongsToOneRelation,
        modelClass: Workplace,
        join: {
          from: 'user_meta.workplace_id',
          to: 'workplaces.id',
        },
      },
    };
  }
}

export default UserMeta;
