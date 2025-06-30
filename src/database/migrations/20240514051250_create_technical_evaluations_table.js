const tableName = 'technical_evaluations';

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments('id').primary();

    table.integer('maatwerker_id').unsigned().notNullable();
    table.foreign('maatwerker_id').references('users.id');

    table.integer('maatwerkcoach_id').unsigned().notNullable();
    table.foreign('maatwerkcoach_id').references('users.id');

    table.integer('evaluation_stage_id').unsigned().notNullable();
    table.foreign('evaluation_stage_id').references('evaluation_stages.id');

    table.integer('machine_id').unsigned().notNullable();
    table.foreign('machine_id').references('machines.id');

    table.integer('technical_level_id').unsigned().notNullable();
    table.foreign('technical_level_id').references('technical_levels.id');

    table.text('comment').nullable();
    table.timestamps(true, true);
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
