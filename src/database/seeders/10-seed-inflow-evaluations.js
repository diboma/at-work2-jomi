import { fakerNL_BE as faker } from '@faker-js/faker';
import { getRandomNum } from '../../lib/utils.js';

const tableName = 'inflow_evaluations';

const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tableName).truncate();

  // Insert one evaluation for each subject
  // for maatwerker id:11 and maatwerkcoach id:1
  const date = new Date(faker.date.past());
  await knex(tableName).insert([
    {
      maatwerker_id: 11,
      maatwerkcoach_id: 1,
      inflow_evaluation_subject_id: 1,
      content: faker.lorem.paragraphs(3),
      created_at: date,
      updated_at: date,
    },
    {
      maatwerker_id: 11,
      maatwerkcoach_id: 1,
      inflow_evaluation_subject_id: 2,
      content: faker.lorem.paragraphs(3),
      created_at: date,
      updated_at: date,
    },
    {
      maatwerker_id: 11,
      maatwerkcoach_id: 1,
      inflow_evaluation_subject_id: 3,
      content: faker.lorem.paragraphs(3),
      created_at: date,
      updated_at: date,
    },
    {
      maatwerker_id: 11,
      maatwerkcoach_id: 1,
      inflow_evaluation_subject_id: 4,
      content: faker.lorem.paragraphs(3),
      created_at: date,
      updated_at: date,
    },
  ]);

  // Insert random evaluations
  for (let i = 0; i < 50; i++) {
    const date = new Date(faker.date.past());
    await knex(tableName).insert({
      maatwerker_id: getRandomNum(16, 35),
      maatwerkcoach_id: getRandomNum(1, 10),
      inflow_evaluation_subject_id: getRandomNum(1, 4),
      content: faker.lorem.paragraphs(3),
      created_at: date,
      updated_at: date,
    });
  }
};

export { seed };
