import workplaces from './seeder-data/workplaces.js';

const tableName = 'workplaces';

const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tableName).truncate();

  for (const workplace of workplaces) {
    await knex(tableName).insert(workplace);
  }
};

export { seed };
