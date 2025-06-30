import { fakerNL_BE as faker } from '@faker-js/faker';
import { getRandomNum } from '../../lib/utils.js';

const tableName = 'observations';

const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tableName).truncate();

  // Insert three evaluations
  // - for maatwerker with id: 11 (Piet Pieters)
  // - for maatwerkcoach with id: 1 (Tim Timmers)
  for (let i = 0; i < 3; i++) {
    const date = new Date(faker.date.past());
    await knex(tableName).insert({
      maatwerker_id: 11,
      maatwerkcoach_id: 1,
      observation_type_id: getRandomNum(1, 4),
      content: faker.lorem.paragraphs(3),
      is_pinned: faker.datatype.boolean(),
      created_at: date,
      updated_at: date,
    });
  }

  // Insert random evaluations
  for (let i = 0; i < 150; i++) {
    const date = new Date(faker.date.past());
    await knex(tableName).insert({
      maatwerker_id: getRandomNum(16, 35),
      maatwerkcoach_id: getRandomNum(1, 10),
      observation_type_id: getRandomNum(1, 4),
      content: faker.lorem.paragraphs(3),
      is_pinned: faker.datatype.boolean(),
      created_at: date,
      updated_at: date,
    });
  }
};

export { seed };
