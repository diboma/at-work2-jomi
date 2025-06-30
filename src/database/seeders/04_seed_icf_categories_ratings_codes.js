import categories from './seeder-data/icf-categories.js';
import ratings from './seeder-data/icf-ratings.js';
import codes from './seeder-data/icf-codes.js';

const tableNameCategories = 'icf_categories';
const tableNameRatings = 'icf_ratings';
const tableNameCodes = 'icf_codes';

const seed = async function (knex) {
  // Categories
  await knex(tableNameCategories).truncate();

  for (const category of categories) {
    await knex(tableNameCategories).insert(category);
  }

  // Ratings
  await knex(tableNameRatings).truncate();

  for (const rating of ratings) {
    await knex(tableNameRatings).insert(rating);
  }

  // Codes
  await knex(tableNameCodes).truncate();

  for (const code of codes) {
    await knex(tableNameCodes).insert(code);
  }
};

export { seed };
