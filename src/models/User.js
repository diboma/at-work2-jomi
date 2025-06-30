import knex from '../lib/knex.js';
import { Model } from 'objection';

// Instantiate the model
Model.knex(knex);

// Related models
import Role from './Role.js';
import UserMeta from './UserMeta.js';
import InflowEvaluation from './evaluation/InflowEvaluation.js';
import IcfEvaluation from './evaluation/IcfEvaluation.js';
import TechnicalEvaluation from './evaluation/TechnicalEvaluation.js';
import Observation from './observation/Observation.js';
import Training from './training/Training.js';
import Accident from './Accident.js';
import Appointment from './Appointment.js';
import Equipment from './equipment/Equipment.js';

// Define the model
class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['firstname', 'lastname', 'email', 'password', 'role_id'],
      properties: {
        id: { type: 'integer' },
        firstname: { type: 'string', minLength: 1, maxLength: 255 },
        lastname: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', minLength: 4, maxLength: 255 },
        password: { type: 'string', minLength: 8, maxLength: 255 },
        role_id: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    return {
      meta: {
        relation: Model.HasOneRelation,
        modelClass: UserMeta,
        join: {
          from: 'users.id',
          to: 'user_meta.user_id',
        },
      },
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: Role,
        join: {
          from: 'users.role_id',
          to: 'roles.id',
        },
      },
      equipment: {
        relation: Model.HasManyRelation,
        modelClass: Equipment,
        join: {
          from: 'users.id',
          to: 'equipments.maatwerker_id',
        },
      },
      hasInflowEvaluations: {
        relation: Model.HasManyRelation,
        modelClass: InflowEvaluation,
        join: {
          from: 'users.id',
          to: 'inflow_evaluations.maatwerker_id',
        },
      },
      didInflowEvaluations: {
        relation: Model.HasManyRelation,
        modelClass: InflowEvaluation,
        join: {
          from: 'users.id',
          to: 'inflow_evaluations.maatwerkcoach_id',
        },
      },
      hasIcfEvaluations: {
        relation: Model.HasManyRelation,
        modelClass: IcfEvaluation,
        join: {
          from: 'users.id',
          to: 'icf_evaluations.maatwerker_id',
        },
      },
      didIcfEvaluations: {
        relation: Model.HasManyRelation,
        modelClass: IcfEvaluation,
        join: {
          from: 'users.id',
          to: 'icf_evaluations.maatwerkcoach_id',
        },
      },
      hasTechnicalEvaluations: {
        relation: Model.HasManyRelation,
        modelClass: TechnicalEvaluation,
        join: {
          from: 'users.id',
          to: 'technical_evaluations.maatwerker_id',
        },
      },
      didTechnicalEvaluations: {
        relation: Model.HasManyRelation,
        modelClass: TechnicalEvaluation,
        join: {
          from: 'users.id',
          to: 'technical_evaluations.maatwerkcoach_id',
        },
      },
      hasObservations: {
        relation: Model.HasManyRelation,
        modelClass: Observation,
        join: {
          from: 'users.id',
          to: 'observations.maatwerker_id',
        },
      },
      reportedObservations: {
        relation: Model.HasManyRelation,
        modelClass: Observation,
        join: {
          from: 'users.id',
          to: 'observations.reported_by_id',
        },
      },
      hasTrainings: {
        relation: Model.HasManyRelation,
        modelClass: Training,
        join: {
          from: 'users.id',
          to: 'trainings.maatwerker_id',
        },
      },
      reportedTrainings: {
        relation: Model.HasManyRelation,
        modelClass: Training,
        join: {
          from: 'users.id',
          to: 'trainings.reported_by_id',
        },
      },
      hasAccidents: {
        relation: Model.HasManyRelation,
        modelClass: Accident,
        join: {
          from: 'users.id',
          to: 'accidents.maatwerker_id',
        },
      },
      reportedAccidents: {
        relation: Model.HasManyRelation,
        modelClass: Accident,
        join: {
          from: 'users.id',
          to: 'accidents.reported_by_id',
        },
      },
      hasAppointments: {
        relation: Model.HasManyRelation,
        modelClass: Appointment,
        join: {
          from: 'users.id',
          to: 'appointments.maatwerker_id',
        },
      },
      madeAppointments: {
        relation: Model.HasManyRelation,
        modelClass: Appointment,
        join: {
          from: 'users.id',
          to: 'appointments.maatwerkcoach_id',
        },
      },
    };
  }
}

export default User;
