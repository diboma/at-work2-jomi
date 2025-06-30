import { fakerNL_BE as faker } from '@faker-js/faker';
import { getRandomNum } from '../../lib/utils.js';
import TrainingType from '../../models/training/TrainingType.js';

const tableName = 'trainings';

const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tableName).truncate();

  // Get training types
  const trainingTypes = await TrainingType.query();

  // Insert three trainings
  // - for maatwerker with id: 11 (Piet Pieters)
  // - for maatwerkcoach with id: 1 (Tim Timmers)
  for (let i = 0; i < 3; i++) {
    const date = new Date(faker.date.past());

    const street = faker.location.streetAddress();
    const zipcode = faker.location.zipCode('####');
    const city = faker.location.city();
    const address = `${street}, ${zipcode} ${city}`;

    await knex(tableName).insert({
      maatwerker_id: 11,
      maatwerkcoach_id: 1,
      training_type_id: getRandomNum(1, trainingTypes.length),
      indicated_by_coach: faker.datatype.boolean(),
      date: faker.date.between({
        from: '2024-01-01T00:00:00.000Z',
        to: '2024-12-31T00:00:00.000Z',
      }),
      location: address,
      title: faker.lorem.words({ min: 1, max: 3 }),
      content: faker.lorem.paragraphs(3),
      is_completed: faker.datatype.boolean(),
      is_pinned: faker.datatype.boolean(),
      created_at: date,
      updated_at: date,
    });
  }

  // Insert random trainings
  for (let i = 0; i < 150; i++) {
    const date = new Date(faker.date.past());

    const street = faker.location.streetAddress();
    const zipcode = faker.location.zipCode('####');
    const city = faker.location.city();
    const address = `${street}, ${zipcode} ${city}`;

    await knex(tableName).insert({
      maatwerker_id: getRandomNum(16, 35),
      maatwerkcoach_id: getRandomNum(1, 10),
      training_type_id: getRandomNum(1, trainingTypes.length),
      indicated_by_coach: faker.datatype.boolean(),
      date: faker.date.between({
        from: '2024-01-01T00:00:00.000Z',
        to: '2024-12-31T00:00:00.000Z',
      }),
      location: address,
      title: faker.lorem.words({ min: 1, max: 3 }),
      content: faker.lorem.paragraphs(3),
      is_completed: faker.datatype.boolean(),
      is_pinned: faker.datatype.boolean(),
      created_at: date,
      updated_at: date,
    });
  }
};

export { seed };
