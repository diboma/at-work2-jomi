const tableName = 'icf_ratings';

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments('id').primary();
    table.string('title', 255).notNullable();
    table.string('rating', 255).notNullable();
    table.string('description', 255).notNullable();

    table.integer('icf_category_id').unsigned().notNullable();
    table.foreign('icf_category_id').references('icf_categories.id');
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
