const Sequelize = require('sequelize');
const dbConfig = require('../config/db');

const {
  DB, USER, PASSWORD, HOST, pool,
} = dbConfig;
const sequelize = new Sequelize(DB, USER, PASSWORD, {
  HOST,
  dialect: 'postgres',
  pool: {
    max: pool.max,
    min: pool.min,
    acquire: pool.acquire,
    idle: pool.idle,
  },
});

const expenses = require('./expenses.model')(sequelize, Sequelize);

module.exports = expenses;
