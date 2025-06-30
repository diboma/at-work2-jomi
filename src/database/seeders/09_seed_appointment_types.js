const tableName = 'appointment_types';

const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tableName).truncate();

  await knex(tableName).insert([
    {
      name: 'Directie',
      slug: 'directie',
    },
    {
      name: 'Medisch onderzoek',
      slug: 'medisch-onderzoek',
    },
    {
      name: 'Opleiding',
      slug: 'opleiding',
    },
    {
      name: 'Personeelsdienst',
      slug: 'personeelsdienst',
    },
    {
      name: 'Sociale dienst',
      slug: 'sociale-dienst',
    },
  ]);
};

export { seed };
