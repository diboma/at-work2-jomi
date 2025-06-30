import { fakerNL_BE as faker } from '@faker-js/faker';
import { getRandomNum } from '../../lib/utils.js';
import AppointmentType from '../../models/AppointmentType.js';

const tableName = 'appointments';

const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tableName).truncate();

  // Get appointment types
  const appointmentTypes = await AppointmentType.query();

  // Insert three appointments
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
      appointment_type_id: getRandomNum(1, appointmentTypes.length),
      date: faker.date.between({
        from: '2024-01-01T00:00:00.000Z',
        to: '2024-12-31T00:00:00.000Z',
      }),
      location: address,
      is_pinned: faker.datatype.boolean(),
      created_at: date,
      updated_at: date,
    });
  }

  // Insert random appointments
  for (let i = 0; i < 150; i++) {
    const date = new Date(faker.date.past());

    const street = faker.location.streetAddress();
    const zipcode = faker.location.zipCode('####');
    const city = faker.location.city();
    const address = `${street}, ${zipcode} ${city}`;

    await knex(tableName).insert({
      maatwerker_id: getRandomNum(16, 35),
      maatwerkcoach_id: getRandomNum(1, 10),
      appointment_type_id: getRandomNum(1, appointmentTypes.length),
      date: faker.date.between({
        from: '2024-01-01T00:00:00.000Z',
        to: '2024-12-31T00:00:00.000Z',
      }),
      location: address,
      is_pinned: faker.datatype.boolean(),
      created_at: date,
      updated_at: date,
    });
  }
};

export { seed };
