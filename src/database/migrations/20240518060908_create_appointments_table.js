const tableName = 'appointments';

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments('id').primary();

    table.integer('maatwerker_id').unsigned().notNullable();
    table.foreign('maatwerker_id').references('users.id');

    table.integer('maatwerkcoach_id').unsigned().notNullable();
    table.foreign('maatwerkcoach_id').references('users.id');

    table.integer('appointment_type_id').unsigned().notNullable();
    table.foreign('appointment_type_id').references('appointment_types.id');

    table.datetime('date').defaultTo(knex.fn.now()).notNullable();
    table.string('location', 255).notNullable();
    table.text('comment').nullable();
    table.boolean('is_pinned').defaultTo(false);
    table.timestamps(true, true);
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
