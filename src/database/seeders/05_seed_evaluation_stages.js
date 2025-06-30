import stages from './seeder-data/evaluation-stages.js';

const tableName = 'evaluation_stages';

const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tableName).truncate();

  for (const stage of stages) {
    await knex(tableName).insert(stage);
  }
};

export { seed };
