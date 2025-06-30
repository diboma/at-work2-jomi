const tableName = 'icf_evaluations';

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments('id').primary();

    table.integer('maatwerker_id').unsigned().notNullable();
    table.foreign('maatwerker_id').references('users.id');

    table.integer('maatwerkcoach_id').unsigned().notNullable();
    table.foreign('maatwerkcoach_id').references('users.id');

    table.integer('icf_category_id').unsigned().notNullable();
    table.foreign('icf_category_id').references('icf_categories.id');

    table.integer('evaluation_stage_id').unsigned().notNullable();
    table.foreign('evaluation_stage_id').references('evaluation_stages.id');

    table.string('icf_code_id', 255).notNullable();
    table.foreign('icf_code_id').references('icf_codes.id');

    table.integer('icf_rating_id').unsigned().notNullable();
    table.foreign('icf_rating_id').references('icf_ratings.id');

    table.text('comment').nullable();
    table.timestamps(true, true);
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
