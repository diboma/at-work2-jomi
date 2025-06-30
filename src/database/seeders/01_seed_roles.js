const tableName = 'roles';

const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tableName).truncate();
  await knex(tableName).insert([
    {
      name: 'Maatwerkcoach',
      slug: 'maatwerkcoach',
    },
    {
      name: 'Maatwerker',
      slug: 'maatwerker',
    },
    {
      name: 'Trajectbegeleider',
      slug: 'trajectbegeleider',
    },
    {
      name: 'Coördinator',
      slug: 'coordinator',
    },
    {
      name: 'Personeelsmedewerker',
      slug: 'personeelsmedewerker',
    },
    {
      name: 'Commercieel medewerker',
      slug: 'commercieel-medewerker',
    },
  ]);
};

export { seed };
