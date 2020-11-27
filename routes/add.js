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
    },
    user
  } = req;

  const product = new Product({
    title,
    price,
    img,
    userId: user,
  });

  try {
    await product.save();
    res.redirect('/products');
  } catch (err) {
    console.log("Error of adding", err)
  }
});

module.exports = router;