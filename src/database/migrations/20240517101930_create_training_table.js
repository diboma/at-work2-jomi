const tableName = 'trainings';

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments('id').primary();

    table.integer('maatwerker_id').unsigned().notNullable();
    table.foreign('maatwerker_id').references('users.id');

    table.integer('maatwerkcoach_id').unsigned().notNullable();
    table.foreign('maatwerkcoach_id').references('users.id');

    table.integer('training_type_id').unsigned().notNullable();
    table.foreign('training_type_id').references('training_types.id');

    table.boolean('indicated_by_coach').defaultTo(false);
    table.datetime('date').defaultTo(knex.fn.now()).notNullable();
    table.string('location', 255).notNullable();
    table.string('title', 255).notNullable();
    table.text('content', 255);
    table.text('comment', 255);
    table.boolean('is_completed').defaultTo(false);
    table.boolean('is_pinned').defaultTo(false);
    table.timestamps(true, true);
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
