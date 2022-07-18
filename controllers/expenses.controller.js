const expenses = require('../models');

exports.get = async (req, res) => {
  try {
    const all = await expenses.findAll();
    res.json(all);
  } catch (err) {
    res.status(422).send({ answer: err });
  }
};

// add
exports.add = async (req, res) => {
  const { shop, price } = req.body;
  const errorMessage = [];
  if (!shop || !shop.trim()) {
    errorMessage.push('Shop name should be defined');
  }
  if (price <= 0 || Number.isNaN(price)) {
    errorMessage.push('Price is not valid');
  }
  if (errorMessage.length) {
    return res.status(422).send({ answer: errorMessage });
  }
  try {
    return (await expenses.create(req.body)) && (await this.get(req, res));
  } catch (err) {
    return res.status(422).send({ answer: err });
  }
};

// remove
exports.remove = async (req, res) => {
  const { id } = req.params;
  if (!id || !id.trim()) {
    res.status(422).send({ answer: 'Id is not valid' });
  }
  try {
    const remove = await expenses.destroy({ where: { id } });
    if (remove) return await exports.get(req, res);
    return res.status(404).send({ answer: 'Expense does not exist' });
  } catch (error) {
    return res.status(422).send({ answer: error });
  }
};

// patch
exports.update = async (req, res) => {
  const { id } = req.params;
  const { shop, price } = req.body;
  const errorMessage = [];
  const expensesChange = {};

  if (!shop && !price) {
    return res.status(422).send({ answer: 'Inputs should not be empty' });
  }
  if (price) {
    if (price < 0 || Number.isNaN(price) || typeof price !== 'number') {
      errorMessage.push('Price is not valid');
    } else {
      expensesChange.price = price;
    }
  }
  if (shop) {
    if (!shop.trim()) {
      errorMessage.push('Shop name should not be empty');
    } else {
      expensesChange.shop = shop;
    }
  }

  if (errorMessage.length) return res.status(422).send({ answer: errorMessage });

  try {
    const [change] = await expenses.update(expensesChange, {
      where: { id },
    });
    if (change === 1) {
      return await this.get(req, res);
    }
    return res.status(404).send({ answer: 'Instance not found.' });
  } catch (error) {
    return res.status(422).send({ answer: error });
  }
};
