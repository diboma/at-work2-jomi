const tableName = 'observations';

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments('id').primary();

    table.integer('maatwerker_id').unsigned().notNullable();
    table.foreign('maatwerker_id').references('users.id');

    table.integer('maatwerkcoach_id').unsigned().notNullable();
    table.foreign('maatwerkcoach_id').references('users.id');

    table.integer('observation_type_id').unsigned().notNullable();
    table.foreign('observation_type_id').references('observation_types.id');

    table.text('content').notNullable();
    table.text('comment').nullable();
    table.boolean('is_pinned').defaultTo(false);
    table.timestamps(true, true);
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
