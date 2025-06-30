import knex from '../lib/knex.js';
import { Model } from 'objection';

// Instantiate the model
Model.knex(knex);

// Related models
import UserMeta from './UserMeta.js';

// Define the model
class EmergencyContact extends Model {
  static get tableName() {
    return 'emergency_contacts';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['firstname', 'lastname', 'phone'],
      properties: {
        id: { type: 'integer' },
        firstname: { type: 'string', minLength: 1, maxLength: 255 },
        lastname: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', minLength: 4, maxLength: 255 },
        phone: { type: 'string', minLength: 8, maxLength: 20 },
      },
    };
  }

  static get relationMappings() {
    return {
      meta: {
        relation: Model.HasManyRelation,
        modelClass: UserMeta,
        join: {
          from: 'emergency_contacts.id',
          to: 'user_meta.emergency_contact_id',
        },
      },
    };
  }
}

export default EmergencyContact;
