const tableName = 'emergency_contacts';

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments('id').primary();
    table.string('firstname', 255).notNullable();
    table.string('lastname', 255).notNullable();
    table.string('email', 255);
    table.string('phone', 20).notNullable();
    table.timestamps(true, true);
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
