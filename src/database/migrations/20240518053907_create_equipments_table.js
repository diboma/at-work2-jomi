const tableName = 'equipments';

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments('id').primary();

    table.integer('maatwerker_id').unsigned().notNullable();
    table.foreign('maatwerker_id').references('users.id');

    table.integer('equipment_type_id').unsigned().notNullable();
    table.foreign('equipment_type_id').references('equipment_types.id');

    table.timestamps(true, true);
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
