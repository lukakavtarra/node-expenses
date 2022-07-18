module.exports = {
  HOST: 'localhost',
  USER: 'postgres',
  PASSWORD: 'luka2001',
  DB: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
