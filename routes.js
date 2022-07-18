const router = require('express').Router();
const expensesController = require('./controllers/expenses.controller');

module.exports = (app) => {
  router.route('/').get(expensesController.get).post(expensesController.add);
  router
    .route('/:id')
    .delete(expensesController.remove)
    .patch(expensesController.update);

  app.use('/api/expenses', router);
};
