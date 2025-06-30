const tableName = 'user_meta';

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments('id').primary();

    table.integer('user_id').notNullable();
    table.foreign('user_id').references('users.id');

    table.string('avatar_url', 255);
    table.string('RRN', 11).notNullable().unique();
    table.string('address', 255);
    table.string('phone', 20);
    table.string('communication_preference', 255);
    table.string('health_insurance_fund', 255);

    table.integer('emergency_contact_id').nullable().defaultTo(null);
    table.foreign('emergency_contact_id').references('emergency_contacts.id');

    table.integer('workplace_id').nullable().defaultTo(null);
    table.foreign('workplace_id').references('workplaces.id');

    table.integer('maatwerkcoach_id').nullable().defaultTo(null);
    table.foreign('maatwerkcoach_id').references('users.id');

    table.timestamps(true, true);
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
