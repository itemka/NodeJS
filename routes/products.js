const {
  Router
} = require('express');
const Product = require('../models/product');

const router = Router();

router.get('/', async (req, res) => {
  const products = await Product.find();

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

  const product = await Product.findById(id);

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

  const product = await Product.findById(id);

  res.render('product-edit', {
    title: `Edit ${product.title}`,
    product,
  })
})

router.post('/edit', async (req, res) => {
  const { id } = req.body;
  delete req.body.id;

  await Product.findByIdAndUpdate(id, req.body);

  res.redirect('/products');
})

module.exports = router;