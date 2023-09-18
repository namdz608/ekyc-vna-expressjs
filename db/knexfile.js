// Update with your config settings.
require('dotenv').config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  // PostGres local connection
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.HOST,
      port: process.env.PORT,
      user:  process.env.USER_FOR_DATABASE,
      password: process.env.PASSWORD_FOR_DATABASE,
      database: process.env.DATABASE_NAME
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },


  //Docker Postgres
  // development: {
  //   client: 'postgresql',
  //   connection: {
  //     host:'localhost',
  //     port:'5432',
  //     user: 'bruce',
  //     password: 'riven123',
  //     database: 'postgres'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  //AWS connection
  // development: {
  //   client: 'postgresql',
  //   connection: {
  //     host: 'vknam.cpxpjprl82wn.ap-southeast-1.rds.amazonaws.com',
  //     port: '5432',
  //     database: 'postgres',
  //     user: 'namdz',
  //     password: 'riven123'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },
};
