const {
  Router
} = require('express');
const { validationResult } = require('express-validator');
const Product = require('../models/product');
const auth = require('../middleware/auth');
const { productValidators } = require('../utils/validators');

const router = Router();

router.get('/', auth, (req, res) => {
  res.render('add', {
    title: 'Add products',
    isAdd: true,
  });
});

router.post('/', auth, productValidators, async (req, res) => {
  const {
    body: {
      title = '',
      price = '',
      img = '',
    },
    user
  } = req;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('add', {
      title: 'Add products',
      isAdd: true,
      error: errors.array()[0].msg,
      data: {
        title,
        price,
        img,
      }
    });
  }

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