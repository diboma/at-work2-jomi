const tableName = 'technical_levels';

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table.string('slug', 255).notNullable();
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
