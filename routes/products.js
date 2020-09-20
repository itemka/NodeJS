const {
  Router
} = require('express');
const Product = require('../models/product');

const router = Router();

router.get('/', async (req, res) => {
  const products = await Product.getAll();

  res.render('products', {
    title: 'Products',
    isProducts: true,
    products,
  });
});

router.get('/:id', async (req, res) => {
  const {
    params: {
      id = ''
    }
  } = req;

  const product = await Product.getById(id);

  res.render('product', {
    layout: 'empty',
    title: `Product ${product.title}`,
    isProduct: true,
    product,
  })
});

module.exports = router;