import knex from '../../lib/knex.js';
import { Model } from 'objection';

// Instantiate the model
Model.knex(knex);

// Related models
import TechnicalEvaluation from './TechnicalEvaluation.js';

// Define the model
class TechnicalLevel extends Model {
  static get tableName() {
    return 'technical_levels';
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
      evaluations: {
        relation: Model.HasManyRelation,
        modelClass: TechnicalEvaluation,
        join: {
          from: 'technical_levels.id',
          to: 'technical_evaluations.technical_level_id',
        },
      },
    };
  }
}

export default TechnicalLevel;
