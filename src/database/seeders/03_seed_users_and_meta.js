import bcrypt from 'bcrypt';
import { fakerNL_BE as faker } from '@faker-js/faker';
import { getRandomNum } from '../../lib/utils.js';

// Import models
import User from '../../models/User.js';

// Define the table names
const tableNameUsers = 'users';
const tableNameMeta = 'user_meta';

const seed = async function (knex) {
  // Delete ALL existing entries
  await knex(tableNameUsers).truncate();
  await knex(tableNameMeta).truncate();

  // Password is "artevelde"
  const password = 'artevelde';
  const hashedPassword = await bcrypt.hash(password, 10);

  /**
   * INSERT MAATWERKCOACHES - role_id: 1
   */
  const street = faker.location.streetAddress({ useFullAddress: true });
  const zipCode = faker.location.zipCode();
  const city = faker.location.city();

  const firstCoach = await User.query().insertGraph({
    role_id: 1,
    firstname: 'Tim',
    lastname: 'Timmers',
    email: 'tim@example.com',
    password: hashedPassword,
    meta: {
      RRN: getRandomNum(10000000000, 99999999999).toString(),
      address: `${street}, ${zipCode} ${city}`,
      avatar_url: `https://ui-avatars.com/api/?name=Tim+Timmers&background=random`,
    },
  });

  // Insert 9 more 'maatwerkcoaches'
  for (let i = 0; i < 9; i++) {
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const email = `${firstname.toLowerCase()}.${lastname.toLowerCase()}@example.com`;
    const street = faker.location.streetAddress({ useFullAddress: true });
    const zipCode = faker.location.zipCode();
    const city = faker.location.city();

    // Insert user
    const user = await User.query().insertGraph({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role_id: 1,
      meta: {
        RRN: getRandomNum(10000000000, 99999999999).toString(),
        address: `${street}, ${zipCode} ${city}`,
        avatar_url: `https://ui-avatars.com/api/?name=${firstname}+${lastname}&background=random`,
      },
    });
  }

  /**
   * INSERT ONE USER FOR EACH OF THE OTHER ROLES
   */
  const usersPerRole = [
    {
      // Maatwerker
      role_id: 2,
      firstname: 'Piet',
      lastname: 'Pieters',
      email: 'maatwerker@example.com',
      password: hashedPassword,
    },
    {
      // Trajectbegeleider
      role_id: 3,
      firstname: 'Jan',
      lastname: 'Janssens',
      email: 'trajectbegeleider@example.com',
      password: hashedPassword,
    },
    {
      // Coordinator
      role_id: 4,
      firstname: 'Carine',
      lastname: 'Cools',
      email: 'coordinator@example.com',
      password: hashedPassword,
    },
    {
      // Personeelsmedewerker
      role_id: 5,
      firstname: 'Annie',
      lastname: 'Van Houten',
      email: 'personeelsmedewerker@example.com',
      password: hashedPassword,
    },
    {
      // Commercieel medewerker
      role_id: 6,
      firstname: 'Patricia',
      lastname: 'Peters',
      email: 'commercieel-medewerker@example.com',
      password: hashedPassword,
    },
  ];

  for (const user of usersPerRole) {
    const street = faker.location.streetAddress({ useFullAddress: true });
    const zipCode = faker.location.zipCode();
    const city = faker.location.city();

    // Insert user
    await User.query().insertGraph({
      role_id: user.role_id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      meta: {
        RRN: getRandomNum(10000000000, 99999999999).toString(),
        address: `${street}, ${zipCode} ${city}`,
        emergency_contact_id: getRandomNum(1, 10),
        maatwerkcoach_id: getRandomNum(1, 10),
        avatar_url: `https://ui-avatars.com/api/?name=${user.firstname}+${user.lastname}&background=random`,
      },
    });
  }

  /**
   * INSERT MAATWERKERS - role_id: 2
   */
  for (let i = 0; i < 35; i++) {
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const email = `${firstname.toLowerCase()}.${lastname.toLowerCase()}@example.com`;
    const street = faker.location.streetAddress({ useFullAddress: true });
    const zipCode = faker.location.zipCode();
    const city = faker.location.city();

    // Insert user
    const user = await User.query().insertGraph({
      role_id: 2,
      firstname,
      lastname,
      email,
      password: hashedPassword,
      meta: {
        RRN: getRandomNum(10000000000, 99999999999).toString(),
        address: `${street}, ${zipCode} ${city}`,
        emergency_contact_id: getRandomNum(1, 10),
        maatwerkcoach_id: getRandomNum(1, 10),
        workplace_id: getRandomNum(1, 16),
        avatar_url: `https://ui-avatars.com/api/?name=${firstname}+${lastname}&background=random`,
      },
    });
  }
};

export { seed };
