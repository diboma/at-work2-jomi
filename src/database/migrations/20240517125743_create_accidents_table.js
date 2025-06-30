const tableName = 'accidents';

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments('id').primary();

    table.integer('maatwerker_id').unsigned().notNullable();
    table.foreign('maatwerker_id').references('users.id');

    table.integer('reported_by_id').unsigned().notNullable();
    table.foreign('reported_by_id').references('users.id');

    table.datetime('date').defaultTo(knex.fn.now()).notNullable();
    table.string('location', 255).notNullable();
    table.text('cause').notNullable();
    table.text('injury').notNullable();
    table.text('care').notNullable();
    table.boolean('is_pinned').defaultTo(false);
    table.timestamps(true, true);
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
