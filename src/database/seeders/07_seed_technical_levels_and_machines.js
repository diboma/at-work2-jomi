import machines from './seeder-data/machines.js';
import technicalLevels from './seeder-data/technical-levels.js';

const tableNameMachines = 'machines';
const tableNameLevels = 'technical_levels';

const seed = async function (knex) {
  // Machines
  await knex(tableNameMachines).truncate();

  for (const machine of machines) {
    await knex(tableNameMachines).insert(machine);
  }

  // Levels
  await knex(tableNameLevels).truncate();

  for (const level of technicalLevels) {
    await knex(tableNameLevels).insert(level);
  }
};

export { seed };
