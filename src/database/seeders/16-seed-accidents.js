import { fakerNL_BE as faker } from '@faker-js/faker';
import { getRandomNum } from '../../lib/utils.js';

const tableName = 'accidents';

const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tableName).truncate();

  // Insert two accidents
  // - for maatwerker with id: 11 (Piet Pieters)
  // - for maatwerkcoach with id: 1 (Tim Timmers)
  for (let i = 0; i < 2; i++) {
    const date = new Date(faker.date.past());

    const street = faker.location.streetAddress();
    const zipcode = faker.location.zipCode('####');
    const city = faker.location.city();
    const address = `${street}, ${zipcode} ${city}`;

    await knex(tableName).insert({
      maatwerker_id: 11,
      reported_by_id: 1,
      date: date,
      location: address,
      cause: faker.lorem.words({ min: 3, max: 6 }),
      injury: faker.lorem.words({ min: 5, max: 10 }),
      care: faker.lorem.words({ min: 4, max: 8 }),
      is_pinned: faker.datatype.boolean(),
      created_at: date,
      updated_at: date,
    });
  }

  // Insert random accidents
  for (let i = 0; i < 25; i++) {
    const date = new Date(faker.date.past());

    const street = faker.location.streetAddress();
    const zipcode = faker.location.zipCode('####');
    const city = faker.location.city();
    const address = `${street}, ${zipcode} ${city}`;

    await knex(tableName).insert({
      maatwerker_id: getRandomNum(16, 35),
      reported_by_id: getRandomNum(1, 10),
      date: date,
      location: address,
      cause: faker.lorem.words({ min: 3, max: 6 }),
      injury: faker.lorem.words({ min: 5, max: 10 }),
      care: faker.lorem.words({ min: 4, max: 8 }),
      is_pinned: faker.datatype.boolean(),
      created_at: date,
      updated_at: date,
    });
  }
};

export { seed };
