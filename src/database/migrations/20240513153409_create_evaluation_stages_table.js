const tableName = 'evaluation_stages';

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table.string('slug', 255).notNullable();
    table.string('iconSmall', 255).notNullable();
    table.string('iconLarge', 255).notNullable();
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
