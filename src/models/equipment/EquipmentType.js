import knex from '../../lib/knex.js';
import { Model } from 'objection';

// Instantiate the model
Model.knex(knex);

// Related models
import Equipment from './Equipment.js';

// Define the model
class EquipmentType extends Model {
  static get tableName() {
    return 'equipment_types';
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
      equipments: {
        relation: Model.HasManyRelation,
        modelClass: Equipment,
        join: {
          from: 'equipment_types.id',
          to: 'equipments.equipment_type_id',
        },
      },
    };
  }
}

export default EquipmentType;
