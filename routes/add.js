const {
  Router
} = require('express');
const Product = require('../models/product');
const auth = require('../middleware/auth');

const router = Router();

router.get('/', auth, (req, res) => {
  res.render('add', {
    title: 'Add products',
    isAdd: true,
  });
});

router.post('/', auth, async (req, res) => {
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