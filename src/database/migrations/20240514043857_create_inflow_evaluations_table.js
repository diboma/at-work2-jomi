const tableName = 'inflow_evaluations';

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments('id').primary();

    table.integer('maatwerker_id').unsigned().notNullable();
    table.foreign('maatwerker_id').references('users.id');

    table.integer('maatwerkcoach_id').unsigned().notNullable();
    table.foreign('maatwerkcoach_id').references('users.id');

    table.integer('inflow_evaluation_subject_id').unsigned().notNullable();
    table
      .foreign('inflow_evaluation_subject_id')
      .references('inflow_evaluation_subjects.id');

    table.text('content').notNullable();
    table.text('comment').nullable();
    table.timestamps(true, true);
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
