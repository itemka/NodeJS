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

router.get('/:id/edit', async (req, res) => {
  const {
    params: {
      id = '',
    },
    query
  } = req;

  if (!query.allow) return res.redirect('/');

  const product = await Product.getById(id);

  res.render('product-edit', {
    title: `Edit ${product.title}`,
    product,
  })
})

router.post('/edit', async (req, res) => {
  const {
    body
  } = req;

  await Product.update(body);

  res.redirect('/products');
})

module.exports = router;