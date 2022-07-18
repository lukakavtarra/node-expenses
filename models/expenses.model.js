module.exports = (sequelize, Sequelize) => {
  const expenses = sequelize.define('expenses', {
    shop: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.FLOAT,
    },
  });
  return expenses;
};
