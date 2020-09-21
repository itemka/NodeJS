const {
  Router
} = require('express');
const Product = require('../models/product');

const router = Router();

router.get('/', (req, res) => {
  res.render('add', {
    title: 'Add products',
    isAdd: true,
  });
});

router.post('/', async (req, res) => {
  const {
    body: {
      title = '',
      price = '',
      img = '',
    }
  } = req;

  const product = new Product(title, price, img);

  await product.save();

  res.redirect('/products');
});

module.exports = router;