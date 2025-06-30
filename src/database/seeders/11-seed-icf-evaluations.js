import { fakerNL_BE as faker } from '@faker-js/faker';
import { getRandomNum } from '../../lib/utils.js';
import icfCodes from './seeder-data/icf-codes.js';

const tableName = 'icf_evaluations';

const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tableName).truncate();

  // Insert random evaluations for icf category id:1 'Functies'
  for (let i = 0; i < 150; i++) {
    const date = new Date(faker.date.past());
    await knex(tableName).insert({
      maatwerker_id: getRandomNum(16, 35),
      maatwerkcoach_id: getRandomNum(1, 10),
      evaluation_stage_id: getRandomNum(1, 4),
      icf_category_id: 1,
      icf_code_id: icfCodes[getRandomNum(1, 14)].id,
      icf_rating_id: getRandomNum(1, 7),
      created_at: date,
      updated_at: date,
    });
  }

  // Insert random evaluations for icf category id:2 'Activiteiten en participatie'
  for (let i = 0; i < 150; i++) {
    const date = new Date(faker.date.past());
    await knex(tableName).insert({
      maatwerker_id: getRandomNum(16, 35),
      maatwerkcoach_id: getRandomNum(1, 10),
      evaluation_stage_id: getRandomNum(1, 4),
      icf_category_id: 2,
      icf_code_id: icfCodes[getRandomNum(15, 27)].id,
      icf_rating_id: getRandomNum(8, 14),
      created_at: date,
      updated_at: date,
    });
  }

  // Insert random evaluations for icf category id:3 'Omgevingsfactoren en externe factoren'
  for (let i = 0; i < 150; i++) {
    const date = new Date(faker.date.past());
    await knex(tableName).insert({
      maatwerker_id: getRandomNum(16, 35),
      maatwerkcoach_id: getRandomNum(1, 10),
      evaluation_stage_id: getRandomNum(1, 4),
      icf_category_id: 3,
      icf_code_id: icfCodes[getRandomNum(28, 34)].id,
      icf_rating_id: getRandomNum(15, 27),
      created_at: date,
      updated_at: date,
    });
  }

  // Insert random evaluations for icf category id:4 'Persoonlijke factoren'
  for (let i = 0; i < 150; i++) {
    const date = new Date(faker.date.past());
    await knex(tableName).insert({
      maatwerker_id: getRandomNum(16, 35),
      maatwerkcoach_id: getRandomNum(1, 10),
      evaluation_stage_id: getRandomNum(1, 4),
      icf_category_id: 4,
      icf_code_id: icfCodes[getRandomNum(35, 40)].id,
      icf_rating_id: getRandomNum(28, 40),
      created_at: date,
      updated_at: date,
    });
  }

  // Insert random evaluations for icf category id:5 'Andere werkvaardigheden'
  for (let i = 0; i < 150; i++) {
    const date = new Date(faker.date.past());
    await knex(tableName).insert({
      maatwerker_id: getRandomNum(16, 35),
      maatwerkcoach_id: getRandomNum(1, 10),
      evaluation_stage_id: getRandomNum(1, 4),
      icf_category_id: 5,
      icf_code_id: icfCodes[getRandomNum(41, 43)].id,
      icf_rating_id: getRandomNum(41, 47),
      created_at: date,
      updated_at: date,
    });
  }
};

export { seed };
