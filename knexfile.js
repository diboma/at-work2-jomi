import dotenv from 'dotenv';
dotenv.config();

const dbName = process.env.DATABASE_NAME || 'database.sqlite3';

const config = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: `./${dbName}`, // the file that will store the database
    },
    useNullAsDefault: true,
    migrations: {
      tableName: 'knex_migrations', // table that will store the migration history
      directory: './src/database/migrations', // location of the migration files
      stub: './stubs/migration.stub', // this is the file that will be copied when creating a new migration
    },
    seeds: {
      directory: './src/database/seeders', // location of the seed files (seeds = initial data for the database)
      stub: './stubs/seed.stub', // this is the file that will be copied when creating a new seed
    },
  },
};

export default config;
