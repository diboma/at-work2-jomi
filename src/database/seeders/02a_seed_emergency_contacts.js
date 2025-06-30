import { fakerNL_BE as faker } from '@faker-js/faker';
import EmergencyContact from '../../models/EmergencyContact.js';

const tableName = 'emergency_contacts';

const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tableName).truncate();

  for (let i = 0; i < 10; i++) {
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const email = `${firstname.toLowerCase()}.${lastname.toLowerCase()}@example.com`;
    // const phone = faker.phone.number('04## ## ## ##'); // deprecated
    const phone = faker.string.numeric(10);

    // Insert user
    const newContact = await EmergencyContact.query().insertGraph({
      firstname,
      lastname,
      email,
      phone,
    });
  }
};

export { seed };
