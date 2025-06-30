import knex from '../../lib/knex.js';
import { Model } from 'objection';

// Instantiate the model
Model.knex(knex);

// Related models
import EquipmentType from './EquipmentType.js';
import User from '../User.js';

// Define the model
class Equipment extends Model {
  static get tableName() {
    return 'equipments';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['maatwerker_id', 'equipment_type_id'],
      properties: {
        id: { type: 'integer' },
        equipment_type_id: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    return {
      maatwerker: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'equipments.maatwerker_id',
          to: 'users.id',
        },
      },
      type: {
        relation: Model.BelongsToOneRelation,
        modelClass: EquipmentType,
        join: {
          from: 'equipments.equipment_type_id',
          to: 'equipment_types.id',
        },
      },
    };
  }
}

export default Equipment;
