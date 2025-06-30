const tableNameObservationTypes = 'observation_types';
const tableNameTrainingTypes = 'training_types';

const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tableNameObservationTypes).truncate();
  await knex(tableNameTrainingTypes).truncate();

  // Insert observation types
  await knex(tableNameObservationTypes).insert([
    {
      name: 'Afwezigheid',
      slug: 'afwezigheid',
    },
    {
      name: 'Medicatie',
      slug: 'medicatie',
    },
    {
      name: 'Vaststelling',
      slug: 'vaststelling',
    },
    {
      name: 'Verslag van gesprek',
      slug: 'verslag-van-gesprek',
    },
  ]);

  // Insert training types
  await knex(tableNameTrainingTypes).insert([
    {
      name: 'Externe opleiding',
      slug: 'externe-opleiding',
    },
    {
      name: 'Interne opleiding',
      slug: 'interne-opleiding',
    },
    {
      name: 'Opleiding op de werkvloer',
      slug: 'opleiding-op-de-werkvloer',
    },
  ]);
};

export { seed };
