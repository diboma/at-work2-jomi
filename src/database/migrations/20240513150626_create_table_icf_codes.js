const tableName = 'icf_codes';

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.string('id').primary();
    table.string('name', 255).notNullable();
    table.string('slug', 255).notNullable();

    table.integer('icf_category_id').unsigned().notNullable();
    table.foreign('icf_category_id').references('icf_categories.id');
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
