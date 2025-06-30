const tableName = 'users';

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments('id').primary();
    table.string('firstname').notNullable();
    table.string('lastname').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();

    table.integer('role_id').unsigned().notNullable();
    table.foreign('role_id').references('roles.id');

    table.timestamps(true, true);
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
