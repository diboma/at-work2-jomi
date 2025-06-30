import { faker } from '@faker-js/faker';
import equipmentTypes from './seeder-data/equipment-types.js';
import { getRandomNum } from '../../lib/utils.js';

const tableNameTypes = 'equipment_types';
const tableNameEquipments = 'equipments';

const seed = async function (knex) {
  /**
   * Equipment types
   */

  // Deletes ALL existing entries
  await knex(tableNameTypes).truncate();

  for (const equipmentType of equipmentTypes) {
    await knex(tableNameTypes).insert(equipmentType);
  }

  /**
   * Equipments
   */

  // Deletes ALL existing entries
  await knex(tableNameEquipments).truncate();

  // Insert two equipments
  // - for maatwerker with id: 11 (Piet Pieters)
  for (let i = 0; i < 2; i++) {
    const date = faker.date.past();
    await knex(tableNameEquipments).insert({
      equipment_type_id: getRandomNum(1, equipmentTypes.length),
      maatwerker_id: 11,
      created_at: date,
      updated_at: date,
    });
  }

  // Insert random equipments
  for (let i = 0; i < 50; i++) {
    const date = faker.date.past();
    await knex(tableNameEquipments).insert({
      equipment_type_id: getRandomNum(1, equipmentTypes.length),
      maatwerker_id: getRandomNum(16, 35),
      created_at: date,
      updated_at: date,
    });
  }
};

export { seed };
