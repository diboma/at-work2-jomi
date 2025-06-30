import subjects from './seeder-data/inflow-evaluation-subjects.js';

const tableName = 'inflow_evaluation_subjects';

const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tableName).truncate();

  for (const subject of subjects) {
    await knex(tableName).insert(subject);
  }
};

export { seed };
